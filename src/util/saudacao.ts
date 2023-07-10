const saudacoesDia = [
    "Bom dia, {nome}!",
    "Tenha um bom dia, {nome}.",
]
const saudacoesTarde = [
    "Boa tarde, {nome}!",
    "Tenha uma boa tarde, {nome}.",
]
const saudacoesNoite = [
    "Boa noite, {nome}!",
    "Tenha uma boa noite, {nome}.",
]

export default function obterSaudacao(nome: string) {
    const data = new Date();
    const hora = data.getHours();

    if (hora >= 0 && hora < 12) {
        const saudacao = saudacoesDia[Math.floor(Math.random() * saudacoesDia.length)];
        if (saudacao)
            return saudacao.replace("{nome}", nome);
    }
    else if (hora >= 12 && hora < 18) {
        const saudacao = saudacoesTarde[Math.floor(Math.random() * saudacoesTarde.length)];
        if (saudacao)
            return saudacao.replace("{nome}", nome);
    }
    else {
        const saudacao = saudacoesNoite[Math.floor(Math.random() * saudacoesNoite.length)];
        if (saudacao)
            return saudacao.replace("{nome}", nome);
    }
}