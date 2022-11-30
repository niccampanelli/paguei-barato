import TemaPropriedades from "../../../interfaces/TemaPropriedades";

const valoresTemaClaro: TemaPropriedades = {
    cores: {
        destaque: "#27fb6b",
        destaqueClaro: "#d4ffe1",
        destaqueEscuro: "#187a36",
        secundaria: "#3772ff",
        secundariaClaro: "#d1deff",
        secundariaEscuro: "#002e99",
        vermelho: "#ff6a85",
        vermelhoClaro: "#ffdbe2",
        vermelhoEscuro: "#8c0000",
        fundoPrincipal: "#ffffff",
        fundoSecundario: "#f5f5f5",
        fundoTerciario: "#dfdfdf",
        fundoQuaternario: "#dddddd",
        textoClaro: "#a3a3a3",
        textoEscuro: "#000000"
    },
    tamanhoTextos: {
        titulo: 30,
        subtitulo: 20,
        texto: 14,
        observacao: 12
    },
    layout: {
        raioBorda: 16,
        paddingVertical: 34,
        paddingHorizontal: 24,
    },
    modal: {
        paddingVerticalHandle: 20,
        larguraHandle: "30%",
        alturaHandle: 5,
        paddingTop: 10,
        paddingBottom: 40,
        paddingHorizontal: 32
    },
    botoesGrandes: {
        texto: 18,
        paddingVertical: 10,
        paddingHorizontal: 15,
        espacamento: 10
    },
    botoes: {
        texto: 14,
        paddingVertical: 5,
        paddingHorizontal: 10,
        espacamento: 5
    }
};

const valoresTemaEscuro: TemaPropriedades = {
    cores: {
        destaque: "#55d97f",
        destaqueClaro: "#1e3b27",
        destaqueEscuro: "#47ba6a",
        secundaria: "#355fc4",
        secundariaClaro: "#1a253d",
        secundariaEscuro: "#456dcc",
        vermelho: "#ff6a85",
        vermelhoClaro: "#361d21",
        vermelhoEscuro: "#ad5e6c",
        fundoPrincipal: "#222",
        fundoSecundario: "#292929",
        fundoTerciario: "#353535",
        fundoQuaternario: "#555",
        textoClaro: "#888888",
        textoEscuro: "#dddddd"
    },
    tamanhoTextos: {
        titulo: 30,
        subtitulo: 20,
        texto: 14,
        observacao: 12
    },
    layout: {
        raioBorda: 16,
        paddingVertical: 34,
        paddingHorizontal: 24
    },
    modal: {
        paddingVerticalHandle: 20,
        larguraHandle: "30%",
        alturaHandle: 5,
        paddingTop: 10,
        paddingBottom: 40,
        paddingHorizontal: 32
    },
    botoesGrandes: {
        texto: 18,
        paddingVertical: 10,
        paddingHorizontal: 15,
        espacamento: 10
    },
    botoes: {
        texto: 14,
        paddingVertical: 5,
        paddingHorizontal: 10,
        espacamento: 5
    }
};

const valoresTema = {
    claro: valoresTemaClaro,
    escuro: valoresTemaEscuro
}

export default valoresTema;