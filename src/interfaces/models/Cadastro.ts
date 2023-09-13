import Usuario from "./Usuario";

export default interface Cadastro extends Usuario {
    senhaConfirma: string;
}