export interface LojaRamoResponse {
    id: number;
    nome: string;
    descricao: string;
}

export interface LojaDetalhesResponse {
    id: number;
    nome: string;
    ramos: LojaRamoResponse[];
    logradouro: string;
    numero: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
    imagemUrl: string;
    criadoEm: string;
}
