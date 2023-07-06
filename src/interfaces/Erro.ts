export default interface Erro<T> {
    mensagem: string;
    statusHttp: number;
    codigoHttp: string;
    corpo: T;
}