import { CadastroSchema } from "@/schemas/cadastro";
import CadastrarResponse from "@/types/services/autenticacao/CadastrarResponse";
import LoginRequest from "@/types/services/autenticacao/LoginRequest";
import LoginResponse from "@/types/services/autenticacao/LoginResponse";
import RetificarRequest from "@/types/services/autenticacao/RetificarRequest";

async function fazerLogin(dados: LoginRequest) {
    await new Promise(resolve => setTimeout(resolve, 4000));
    return {
        nome: "Lorem",
        sobrenome: "Ipsum",
        email: "loremipsum@email.com",
        token: "U98H873y2aIJJI20qwrm1s4mL894",
        cep: "08220010",
    } as LoginResponse;
}

async function cadastrar(dados: CadastroSchema) {
    await new Promise(resolve => setTimeout(resolve, 10000));
    return {} as CadastrarResponse;
}

async function retificar(dados: RetificarRequest) {
    await new Promise(resolve => setTimeout(resolve, 3000));
}

export default {
    fazerLogin,
    cadastrar,
    retificar,
}