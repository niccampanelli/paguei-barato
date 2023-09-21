import { createContext, useContext, useState } from "react";
import { ContextNotificacaoToast } from "../../../interfaces/context/ContextNotificacaoToast";
import { GestureResponderEvent } from "react-native";
import NotificacaoToast from "../../../interfaces/context/NotificacaoToast";
import NotificacaoProviderProps from "../../../interfaces/components/NotificacaoProviderProps";

const NotificacaoContext = createContext<ContextNotificacaoToast>({ notificacoes: [], notificar: () => { } });

export default function NotificacaoProvider(props: NotificacaoProviderProps) {

    const [notificacoes, setNotificacoes] = useState<NotificacaoToast[]>([]);

    const removerNotificacao = (notificacao: NotificacaoToast) => {
        setNotificacoes((oldNotificacoes) => {
            return oldNotificacoes.filter((oldNotificacao) => oldNotificacao !== notificacao);
        });
    };

    const notificar = (notificacao: NotificacaoToast) => {
        notificacao.notificacao = true;
        notificacao.aoDispensar = () => {
            setNotificacoes((oldNotificacoes) => {
                return oldNotificacoes.filter((oldNotificacao) => oldNotificacao !== notificacao);
            });
        };

        if (notificacao.autoDispensar && props.tempoDispensar) {
            notificacao.tempoDispensar = props.tempoDispensar;
        }

        const aoPressionar = notificacao.aoPressionarBotao;
        notificacao.aoPressionarBotao = (evento: GestureResponderEvent) => {
            removerNotificacao(notificacao);
            aoPressionar?.(evento);
        };

        let notificacoesTemp = notificacoes as NotificacaoToast[];
        setNotificacoes([...notificacoesTemp, notificacao]);

        if(notificacao.autoDispensar)
            setTimeout(() => {
                removerNotificacao(notificacao);
            }, notificacao.tempoDispensar || props?.tempoDispensar || 5000);
    };

    return (
        <NotificacaoContext.Provider value={{ notificacoes, notificar }}>
            {props.children}
        </NotificacaoContext.Provider>
    );
}

export const useNotificacaoToast = () => useContext(NotificacaoContext);