interface CadastroPasso1State {
    email: string;
    emailConfirma: string;
}

interface CadastroPasso2State {
    nome: string;
    sobrenome: string;
}

interface CadastroPasso3State {
    senha: string;
    senhaConfirma: string;
}

interface CadastroPasso4State {
    cep?: string;
}

export interface CadastroState {
    passo1Email: CadastroPasso1State;
    passo2Nome: CadastroPasso2State;
    passo3Senha: CadastroPasso3State;
    passo4Endereco: CadastroPasso4State;
}