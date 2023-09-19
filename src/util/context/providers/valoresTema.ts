import TemaPropriedades from "../../../interfaces/context/TemaPropriedades";

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

const temaMapaClaro: [] = [];

const temaMapaEscuro = [
    {
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#1d2c4d"
            }
        ]
    },
    {
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#8ec3b9"
            }
        ]
    },
    {
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#1a3646"
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#4b6878"
            }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#64779e"
            }
        ]
    },
    {
        "featureType": "administrative.province",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#4b6878"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#334e87"
            }
        ]
    },
    {
        "featureType": "landscape.natural",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#023e58"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#283d6a"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#6f9ba5"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#1d2c4d"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#023e58"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#3C7680"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#304a7d"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#98a5be"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#1d2c4d"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#2c6675"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#255763"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#b0d5ce"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#023e58"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#98a5be"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#1d2c4d"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#283d6a"
            }
        ]
    },
    {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#3a4762"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#0e1626"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#4e6d70"
            }
        ]
    }
]

const temasMapa = {
    claro: temaMapaClaro,
    escuro: temaMapaEscuro
}

export default valoresTema;
export { temasMapa };