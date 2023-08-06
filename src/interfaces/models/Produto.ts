import Categoria from "./Categoria";

export default interface Produto {
    id?: number,
    nome?: string,
    marca?: string,
    tamanho?: string,
    cor?: string,
    categoriaId?: number,
    categoria?: Categoria,
    criadoPor?: number
}