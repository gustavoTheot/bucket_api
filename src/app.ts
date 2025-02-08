import fastify, { FastifyReply, FastifyRequest } from "fastify";
import cors from "@fastify/cors";
import fastifyMultipart from "@fastify/multipart";
import { env } from "./env";
import mongoose from "mongoose";
import { Servicos } from "./servico";
import { request } from "http";
import { parse } from "path";
import { listarArquivosBucket, salvarArquivo } from "./s3";

const app = fastify()

app.register(cors)
app.register(fastifyMultipart, {
    limits: {
        fileSize: 30 * 1024 * 1024 // 50MB
    }
})

app.post("/arquivos", async (request: FastifyRequest, reply: FastifyReply) => {
    const arquivoServico = new Servicos()

    try {
        const arquivos = await request.files()

        for await (const arquivo of arquivos) {
            if (!arquivo || !arquivo.filename) {
                continue
            }

            const buffer = await arquivo?.toBuffer()
            const fileName = parse(arquivo?.filename)
            const referencia = `${fileName.name}-${Date.now()}${fileName.ext}`

            await salvarArquivo({
                key: referencia,
                buffer: buffer,
                type: arquivo.mimetype
            })

            await arquivoServico.salvarArquivo(referencia)
        }

        return reply.code(201).send({ message: "Arquivo salvo" })
    } catch (err) {
        return reply.code(500).send({ message: "Arquivo não foi salvo" })
    }
})

app.get("/arquivos", async (request: FastifyRequest, reply: FastifyReply) => {
    const arquivoServico = new Servicos()

    try {
        const arquivos = await arquivoServico.listarArquivos()

        for (const arquivo of arquivos) {
            arquivo.referencia = await listarArquivosBucket(arquivo.referencia) || ""
        }

        return reply.status(200).send(arquivos)

    } catch (err) {
        return reply.code(500).send({ message: "Arquivo não foi listado" })
    }
})

mongoose.connect(env.MONGO_URI).then(() => {
    console.log("Connected to MongoDB")
}).catch(err => {
    console.error("Failed to connect to MongoDB", err)
});


app.listen({
    port: env.PORT,
    host: "0.0.0.0"
}).then(() => { console.log(`Server listening on port ${env.PORT}`) })
    .catch(err => { console.error("Failed to start server", err) })