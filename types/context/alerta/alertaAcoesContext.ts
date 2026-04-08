export type AlertaAcao = () => unknown | Promise<unknown>;

export interface IAlertaAcoesContext {
    registrar: (id: string, callback: AlertaAcao) => void,
    remover: (id: string) => void,
    executar: (id: string) => void,
}