export default class Formatador {

    static formatarMoeda(valor: number): string {

        if(typeof valor !== "number" || valor === null || valor === undefined)
            valor = 0;

        let valorFormatado = Intl.NumberFormat('pt-BR', { style: "currency", currency: "BRL", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(valor);
        valorFormatado = valorFormatado.replace(',', '.');
        let expSubstituiCent = new RegExp(/([.](?=\d{2}$))/);
        valorFormatado = valorFormatado.replace(expSubstituiCent, ',');
        valorFormatado = valorFormatado.replace("\$", '$ ');
        return valorFormatado;
    }
}