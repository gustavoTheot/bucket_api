import mongoose from "mongoose";

const ArquvioSchema = new mongoose.Schema({
    referencia: { type: String, required: true },
})

export const Arquivo = mongoose.model("Arquivo", ArquvioSchema)