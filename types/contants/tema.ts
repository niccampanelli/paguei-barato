export interface TemaCor {
    escuro: string;
    normal: string;
    claro: string;
}

export interface TemaCorFundo {
    principal: string;
    secundario: string;
    terciario: string;
    quaternario: string;
}

export interface TemaCores {
    destaque: TemaCor;
    secundaria: TemaCor;
    vermelho: TemaCor;
    fundo: TemaCorFundo;
    texto: TemaCor;
}

export interface TemaTextoTamanhos {
    titulo: number;
    subtitulo: number;
    texto: number;
    legenda: number;
}

export interface TemaTextoPesos {
    titulo: number;
    subtitulo: number;
    link: number;
    texto: number;
}

export interface TemaTexto {
    tamanhos: TemaTextoTamanhos;
    pesos: TemaTextoPesos;
}

export interface TemaLayoutPadding {
    vertical: number;
    horizontal: number;
}

export interface TemaLayoutPaddings {
    grande: TemaLayoutPadding;
    medio: TemaLayoutPadding;
    pequeno: TemaLayoutPadding;
}

export interface TemaLayoutEspacamentos {
    grande: number;
    medio: number;
    pequeno: number;
}

export interface TemaLayout {
    raioBorda: number;
    paddings: TemaLayoutPaddings;
    espacamentos: TemaLayoutEspacamentos;
}

export interface Tema {
    cores: TemaCores;
    texto: TemaTexto;
    layout: TemaLayout;
}