const formatoIsoComFuso =
    /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d+)?(Z|[+-]\d{2}:\d{2})$/;

function dataIsoValida(valor: string): boolean {
    const partes = formatoIsoComFuso.exec(valor);
    if (!partes)
        return false;

    const ano = Number(partes[1]);
    const mes = Number(partes[2]);
    const dia = Number(partes[3]);
    const hora = Number(partes[4]);
    const minuto = Number(partes[5]);
    const segundo = Number(partes[6]);
    const data = new Date(valor);

    if (Number.isNaN(data.getTime()))
        return false;

    if (mes < 1 || mes > 12 || dia < 1 || dia > new Date(Date.UTC(ano, mes, 0)).getUTCDate())
        return false;

    return hora <= 23 && minuto <= 59 && segundo <= 59;
}

function converterDatas(valor: unknown): unknown {
    if (typeof valor === "string" && dataIsoValida(valor))
        return new Date(valor);

    if (Array.isArray(valor))
        return valor.map(converterDatas);

    if (valor !== null && typeof valor === "object" && !(valor instanceof Date)) {
        return Object.fromEntries(
            Object.entries(valor).map(([chave, item]) => [
                chave,
                converterDatas(item),
            ]),
        );
    }

    return valor;
}

export default converterDatas;
