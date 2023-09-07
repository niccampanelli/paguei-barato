import Mercado from "../interfaces/models/Mercado";
import Produto from "../interfaces/models/Produto";

export default class Formatador {

    static formatarMoeda(valor: number): string {

        if (typeof valor !== "number" || valor === null || valor === undefined)
            valor = 0;

        let valorFormatado = Intl.NumberFormat(
            'pt-BR',
            {
                style: "currency",
                currency: "BRL",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        ).format(valor);
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

    static formatarDataHora(data: Date, incluirHora: boolean = true): string {
        if (!data)
            return "Data inválida";

        const dataFormatada = Intl.DateTimeFormat('pt-BR', { dateStyle: "short" }).format(data);

        if (incluirHora) {
            const horas = data.getHours() < 10 ? "0" + data.getHours() : data.getHours();
            const minutos = data.getMinutes() < 10 ? "0" + data.getMinutes() : data.getMinutes();
            const horaFormatada = `${horas}:${minutos}`;
            return dataFormatada + " às " + horaFormatada;
        }

        return dataFormatada;
    }

    static formatarPeriodoData(data: Date, porExtenso: boolean = false, agora: Date = new Date()): string {
        
        if (!data)
            return "Data inválida";

        const diferenca = agora.getTime() - data.getTime();

        const msAno = 1000 * 60 * 60 * 24 * 365;
        const msMes = 1000 * 60 * 60 * 24 * 30;
        const msDia = 1000 * 60 * 60 * 24;
        const msHora = 1000 * 60 * 60;
        const msMinutos = 1000 * 60;

        const anos = Math.floor(diferenca / msAno);
        const meses = Math.floor((diferenca % msAno) / msMes);
        const dias = Math.floor((diferenca % msMes) / msDia);
        const horas = Math.floor((diferenca % msDia) / msHora);
        const minutos = Math.floor((diferenca % msHora) / msMinutos);

        if (anos > 0) {
            if (meses > 0)
                return `${anos}${porExtenso ? anos > 1 ? " anos" : " ano" : "a"} e ${meses}${porExtenso ? meses > 1 ? " meses" : " mês" : "m"}`;
            else
                return `${anos}${porExtenso ? anos > 1 ? " anos" : " ano" : "a"}`;
        }
        else if (meses > 0) {
            if (dias > 0)
                return `${meses}${porExtenso ? meses > 1 ? " meses" : " mês" : "m"} e ${dias}${porExtenso ? dias > 1 ? " dias" : " dia" : "d"}`;
            else
                return `${meses}${porExtenso ? meses > 1 ? " meses" : " mês" : "m"}`;
        }
        else if (dias > 0) {
            if (horas > 0)
                return `${dias}${porExtenso ? dias > 1 ? " dias" : " dia" : "d"} e ${horas}${porExtenso ? horas > 1 ? " horas" : " hora" : "h"}`;
            else
                return `${dias}${porExtenso ? dias > 1 ? " dias" : " dia" : "d"}`;
        }
        else if (horas > 0) {
            if (minutos > 0)
                return `${horas}${porExtenso ? horas > 1 ? " horas" : " hora" : "h"} e ${minutos}${porExtenso ? minutos > 1 ? " minutos" : " minuto" : "min"}`;
            else
                return `${horas}${porExtenso ? horas > 1 ? " horas" : " hora" : "h"}`;
        }
        else if (minutos > 0)
            return `${minutos}${porExtenso ? minutos > 1 ? " minutos" : " minuto" : "min"}`;

        return "alguns segundos";
    }
}