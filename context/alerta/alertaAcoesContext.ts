import { IAlertaAcoesContext } from "@/types/context/alerta/alertaAcoesContext";
import { createContext, useContext } from "react";

export const AlertaAcoesContext = createContext<IAlertaAcoesContext>({
    registrarAlertaAcao: () => { },
    removerAlertaAcao: () => { },
    executarAlertaAcao: () => { }
});

export const useAlertaAcoesContext = () => useContext(AlertaAcoesContext);