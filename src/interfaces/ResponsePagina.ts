export default interface ResponsePagina<T> {
    contagem: number,
    itensPorPagina: number,
    paginaAtual: number,
    totalPaginas: number,
    totalRegistros: number,
    itens: Array<T>
}