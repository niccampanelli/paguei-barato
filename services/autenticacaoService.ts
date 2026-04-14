import { CadastroSchema } from "@/schemas/cadastro";
import CadastrarResponse from "@/types/services/autenticacao/CadastrarResponse";
import LoginRequest from "@/types/services/autenticacao/LoginRequest";
import LoginResponse from "@/types/services/autenticacao/LoginResponse";
import RetificarRequest from "@/types/services/autenticacao/RetificarRequest";

async function fazerLogin(dados: LoginRequest): Promise<LoginResponse> {
    return {
        id: "a432b1c4-5678-90ab-cdef-1234567890ab",
        nome: "Lorem",
        sobrenome: "Ipsum",
        email: "loremipsum@email.com",
        cep: "08220010",
        token: "U98H873y2aIJJI20qwrm1s4mL894",
    };
}

async function cadastrar(dados: CadastroSchema): Promise<CadastrarResponse> {
    await new Promise(resolve => setTimeout(resolve, 10000));
    return {
        id: "a432b1c4-5678-90ab-cdef-1234567890ab",
        nome: dados.passo2Nome.nome,
        sobrenome: dados.passo2Nome.sobrenome,
        email: dados.passo1Email.email,
        cep: dados.passo4Endereco.cep,
        token: "U98H873y2aIJJI20qwrm1s4mL894",
    };
}

async function retificar(dados: RetificarRequest): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 3000));
}

export default {
    fazerLogin,
    cadastrar,
    retificar,
}