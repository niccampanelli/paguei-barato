import { AlertaAcoesContextType } from "@/types/context/alerta/alertaAcoesContext";
import { createContext, useContext } from "react";

export const AlertaAcoesContext = createContext<AlertaAcoesContextType>({
    registrarAlertaAcao: () => { },
    removerAlertaAcao: () => { },
    executarAlertaAcao: () => { }
});

export const useAlertaAcoesContext = () => useContext(AlertaAcoesContext);