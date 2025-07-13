export function obterIniciais(nome: string, sobrenome?: string) {
    const nomes = nome.trim().split(/\s+/);
    let iniciais = '';

    if (sobrenome)
        iniciais = nomes[0][0] + sobrenome.trim()[0];
    else if (nomes.length > 1)
        iniciais = nomes[0][0] + nomes[nomes.length - 1][0];
    else
        iniciais = nomes[0][0] + nomes[0][nomes[0].length - 1];

    return iniciais.toUpperCase();
}