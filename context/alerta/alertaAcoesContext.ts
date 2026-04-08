import { IAlertaAcoesContext } from "@/types/context/alerta/alertaAcoesContext";
import { createContext, useContext } from "react";

export const AlertaAcoesContext = createContext<IAlertaAcoesContext>({
    registrar: () => { },
    remover: () => { },
    executar: () => { }
});

export const useAlertaAcoesContext = () => useContext(AlertaAcoesContext);