interface BuscaFiltroOpcao {
    valor: string;
    selecionada: boolean;
}

export interface BuscaFiltros {
    tipo: string;
    opcoes: BuscaFiltroOpcao[];
}

export type BuscaFiltrosSelecionados = Record<string, string[]>;