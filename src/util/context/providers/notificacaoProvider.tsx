import { createContext, useContext, useState } from "react";
import { ContextNotificacaoToast } from "../../../interfaces/context/ContextNotificacaoToast";
import { GestureResponderEvent } from "react-native";
import NotificacaoToast from "../../../interfaces/context/NotificacaoToast";

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

        const aoPressionar = notificacao.aoPressionarBotao;
        notificacao.aoPressionarBotao = (evento: GestureResponderEvent) => {
            setNotificacoes((oldNotificacoes) => {
                return oldNotificacoes.filter((oldNotificacao) => oldNotificacao !== notificacao);
            });
            aoPressionar?.(evento);
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