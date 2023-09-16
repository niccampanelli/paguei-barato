import TemaPropriedades from "./TemaPropriedades";
import { TemaType } from "./TemaType";

export default interface ContextTema {
    propriedadesTema: TemaPropriedades,
    temaAtivo: TemaType,
    temaMapa: any,
    alterarTema: (tema?: TemaType) => void
}