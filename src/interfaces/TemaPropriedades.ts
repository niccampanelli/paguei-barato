interface TemaPropriedadesCores {
    destaque: string,
    destaqueClaro: string,
    destaqueEscuro: string,
    secundaria: string,
    secundariaClaro: string,
    secundariaEscuro: string,
    vermelho: string,
    vermelhoClaro: string,
    vermelhoEscuro: string,
    fundoPrincipal: string,
    fundoSecundario: string,
    fundoTerciario: string,
    fundoQuaternario: string,
    textoClaro: string,
    textoEscuro: string
}

interface TemaPropriedadesTamanhoTextos {
    titulo: number,
    subtitulo: number,
    texto: number,
    observacao: number
}

interface TemaPropriedadesLayout {
    raioBorda: number,
    paddingVertical: number,
    paddingHorizontal: number,
}

interface TemaPropriedadesModal {
    paddingVerticalHandle: number,
    larguraHandle: string | number,
    alturaHandle: number,
    paddingTop: number,
    paddingBottom: number,
    paddingHorizontal: number
}

interface TemaPropriedadesBotoesGrandes {
    texto: number,
    paddingVertical: number,
    paddingHorizontal: number,
    espacamento: number
}

interface TemaPropriedadesBotoes {
    texto: number,
    paddingVertical: number,
    paddingHorizontal: number,
    espacamento: number
}

export default interface TemaPropriedades {
    cores: TemaPropriedadesCores,
    tamanhoTextos: TemaPropriedadesTamanhoTextos,
    layout: TemaPropriedadesLayout,
    modal: TemaPropriedadesModal,
    botoesGrandes: TemaPropriedadesBotoesGrandes,
    botoes: TemaPropriedadesBotoes
}