import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { env } from "./env";
import { Upload } from "@aws-sdk/lib-storage";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const clienteS3 = new S3Client({
    region: env.S3_BUCKET_REGION,
    credentials: {
        accessKeyId: 'minio_dev_root_user',
        secretAccessKey: 'minio_dev_root_password'
    },
    endpoint: env.S3_ENDPOINT,
    forcePathStyle: true
})

export async function salvarArquivo({ key, buffer, type }) {
    try {
        const envio = new Upload({
            client: clienteS3,
            params: {
                Bucket: env.S3_BUCKET_NAME,
                Key: key,
                Body: buffer,
                ContentType: type
            }
        })

        await envio.done()
    } catch (err) {
        console.error("Failed to save file", err)
    }
}

export async function listarArquivosBucket(key: string) {
    try {
        const params = {
            Bucket: env.S3_BUCKET_NAME,
            Key: key
        }

        const command = new GetObjectCommand(params)
        const second = 60
        const url = await getSignedUrl(clienteS3, command, { expiresIn: second })

        return url

    } catch (err) {
        console.error("Failed to list files", err)
    }
}