export default interface ParametrosOrdem<T> {
    ordenarPor: keyof T,
    ordem: "asc" | "desc"
}