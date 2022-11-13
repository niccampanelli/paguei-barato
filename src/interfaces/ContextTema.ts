import TemaPropriedades from "./TemaPropriedades";

export default interface ContextTema {
    propriedadesTema: TemaPropriedades,
    temaAtivo: "claro" | "escuro",
    alterarTema: (tema?: "claro" | "escuro") => void
}