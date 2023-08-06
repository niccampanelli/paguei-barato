import UF from "./UF";

export default interface EnderecoViaCep {
    cep: string,
    logradouro: string,
    complemento: string,
    bairro: string,
    localidade: string,
    uf: UF,
    ibge: string,
    gia: string,
    ddd: string,
    siafi: string
}