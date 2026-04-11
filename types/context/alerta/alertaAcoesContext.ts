export type AlertaAcao = () => unknown | Promise<unknown>;

export interface IAlertaAcoesContext {
    registrarAlertaAcao: (id: string, callback: AlertaAcao) => void,
    removerAlertaAcao: (id: string) => void,
    executarAlertaAcao: (id: string) => void,
}