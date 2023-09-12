import Usuario from "./Usuario";

export default interface RespostaLogin extends Usuario {
    token: string;
};