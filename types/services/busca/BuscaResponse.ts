export interface BuscaItemResponse {
    itemId: number;
    tipo: string;
    nome: string;
    imagemUrl?: string;
}

export interface BuscaFacetaResponse {
    faceta: string;
    valor: string;
    total: number;
}

export interface BuscaResponse {
    itens: BuscaItemResponse[];
    facetas: BuscaFacetaResponse[];
    pagina: number;
    tamanhoPagina: number;
    totalItens: number;
}
