import TemaPropriedades from "./TemaPropriedades";
import { TemaType } from "./TemaType";

export default interface ContextTema {
    propriedadesTema: TemaPropriedades,
    temaAtivo: TemaType,
    alterarTema: (tema?: TemaType) => void
}