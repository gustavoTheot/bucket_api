import { Arquivo } from "./repositorio";

export class Servicos {

    async salvarArquivo(referencia: string) {
        const arquivo = new Arquivo({ referencia })
        return await arquivo.save()
    }

    async listarArquivos() {
        return await Arquivo.find()
    }
}