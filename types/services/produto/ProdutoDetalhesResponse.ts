export type ProdutoAtributosResponse = Record<string, string>;

export interface ProdutoDetalhesResponse {
    id: number;
    nome: string;
    marcaId: number;
    atributos: ProdutoAtributosResponse;
    imagemUrl: string;
    criadoEm: Date;
    criadoPorId: string;
}