export type ProdutoAtributosResponse = Record<string, string>;

export interface ProdutoMarcaResponse {
    id: number;
    nome: string;
}

export interface ProdutoCategoriaResponse {
    id: number;
    nome: string;
}

export type ProdutoCategoriasResponse = ProdutoCategoriaResponse[];

export interface ProdutoDetalhesResponse {
    id: number;
    nome: string;
    marcaId: number;
    marca: ProdutoMarcaResponse;
    categorias: ProdutoCategoriasResponse;
    atributos: ProdutoAtributosResponse;
    imagemUrl: string;
    criadoEm: Date;
}