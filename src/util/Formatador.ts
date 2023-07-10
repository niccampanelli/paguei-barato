import Mercado from "../interfaces/models/Mercado";
import Produto from "../interfaces/models/Produto";

export default class Formatador {

    static formatarMoeda(valor: number): string {

        if (typeof valor !== "number" || valor === null || valor === undefined)
            valor = 0;

        let valorFormatado = Intl.NumberFormat('pt-BR', { style: "currency", currency: "BRL", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(valor);
        valorFormatado = valorFormatado.replace(',', '.');
        let expSubstituiCent = new RegExp(/([.](?=\d{2}$))/);
        valorFormatado = valorFormatado.replace(expSubstituiCent, ',');
        return valorFormatado;
    }

    static removerDiacriticos(texto: string): string {
        return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    static formatarNomeProduto(produto?: Produto): string {
        if (!produto)
            return "Produto inválido";

        var nome = "";

        if (produto.nome)
            nome += produto.nome;
        if (produto.marca)
            nome += " " + produto.marca;
        if (produto.cor)
            nome += " " + produto.cor;
        if (produto.tamanho)
            nome += " " + produto.tamanho;

        return nome;
    }

    static formatarEnderecoMercado(mercado: Mercado): string {
        if (!mercado)
            return "Mercado inválido";

        var nome = "";

        if (mercado.logradouro)
            nome = mercado.logradouro;
        if (mercado.numero)
            nome += ", " + mercado.numero;
        if (mercado.complemento)
            nome += " - " + mercado.complemento;
        if (mercado.bairro)
            nome += " - " + mercado.bairro;
        if (mercado.cep)
            nome += ". " + mercado.cep;
        if (mercado.cidade)
            nome += " - " + mercado.cidade;
        if (mercado.uf)
            nome += " - " + mercado.uf;

        return nome;
    }

    static obterIniciaisNome(nome: string): string {
        const nomes = nome.split(" ");
        var iniciais = "";

        iniciais += nomes[0].charAt(0).toUpperCase();
        iniciais += nomes[nomes.length - 1].charAt(0).toUpperCase();

        return iniciais;
    }
}