import { CadastroSchema } from "@/schemas/cadastro";
import CadastrarResponse from "@/types/services/autenticacao/CadastrarResponse";

async function cadastrar(dados: CadastroSchema) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {} as CadastrarResponse;
}

export default {
    cadastrar
}