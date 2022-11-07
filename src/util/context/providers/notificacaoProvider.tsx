import { createContext, useContext, useState } from "react";
import { ContextNotificacaoToast } from "../../../interfaces/ContextNotificacaoToast";
import NotificacaoToast from "../../../interfaces/NotificacaoToast";

const NotificacaoContext = createContext<ContextNotificacaoToast>({ notificacoes: [], notificar: () => { } });

export default function NotificacaoProvider(props: any) {

    const [notificacoes, setNotificacoes] = useState<NotificacaoToast[]>([]);

    const notificar = (notificacao: NotificacaoToast) => {
        notificacao.notificacao = true;
        notificacao.aoDispensar = () => {
            setNotificacoes((oldNotificacoes) => {
                return oldNotificacoes.filter((oldNotificacao) => oldNotificacao !== notificacao);
            });
        };
        let notificacoesTemp = notificacoes as NotificacaoToast[];
        setNotificacoes([...notificacoesTemp, notificacao]);
    };

    return (
        <NotificacaoContext.Provider value={{ notificacoes, notificar }}>
            {props.children}
        </NotificacaoContext.Provider>
    );
}

export const useNotificacaoToast = () => useContext(NotificacaoContext);