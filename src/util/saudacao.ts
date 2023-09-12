const saudacoesComuns = [
    "Olá, {nome}!",
    "Que bom te ver de novo, {nome}!",
];
const saudacoesDia = [
    "Bom dia, {nome}!",
    "Tenha um bom dia, {nome}.",
    ...saudacoesComuns,    
]
const saudacoesTarde = [
    "Boa tarde, {nome}!",
    "Tenha uma boa tarde, {nome}.",
    ...saudacoesComuns,    
]
const saudacoesNoite = [
    "Boa noite, {nome}!",
    "Tenha uma boa noite, {nome}.",
    ...saudacoesComuns,
]
const saudacoesMadrugada = [
    "Boa madrugada, {nome}!",
    "Tenha uma boa madrugada, {nome}.",
    ...saudacoesComuns,
]

const nomesVisitante = [
    "visitante",
    "usuário",
]

export default function obterSaudacao(nome?: string) {
    const data = new Date();
    const hora = data.getHours();

    if (!nome)
        nome = nomesVisitante[Math.floor(Math.random() * nomesVisitante.length)];

    if (hora >= 6 && hora < 12) {
        const saudacao = saudacoesDia[Math.floor(Math.random() * saudacoesDia.length)];
        if (saudacao)
            return saudacao.replace("{nome}", nome);
    }
    else if (hora >= 12 && hora < 18) {
        const saudacao = saudacoesTarde[Math.floor(Math.random() * saudacoesTarde.length)];
        if (saudacao)
            return saudacao.replace("{nome}", nome);
    }
    else if (hora >= 18 && hora < 23) {
        const saudacao = saudacoesNoite[Math.floor(Math.random() * saudacoesNoite.length)];
        if (saudacao)
            return saudacao.replace("{nome}", nome);
    }
    else {
        const saudacao = saudacoesMadrugada[Math.floor(Math.random() * saudacoesMadrugada.length)];
        if (saudacao)
            return saudacao.replace("{nome}", nome);
    }
}