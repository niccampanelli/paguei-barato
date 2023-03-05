import NotificacaoToast from "./NotificacaoToast";

export type ContextNotificacaoToast = {
    notificacoes: NotificacaoToast[] | [],
    notificar: (notificacao: NotificacaoToast) => void
}