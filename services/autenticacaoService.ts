import { CadastrarRequest, CadastrarResponse, LoginRequest, LoginResponse, RetificarRequest } from "@/types/services/autenticacao";

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

async function cadastrar(dados: CadastrarRequest): Promise<CadastrarResponse> {
    await new Promise(resolve => setTimeout(resolve, 10000));
    return {
        id: "a432b1c4-5678-90ab-cdef-1234567890ab",
        nome: dados.nome,
        sobrenome: dados.sobrenome,
        email: dados.email,
        cep: dados.cep,
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