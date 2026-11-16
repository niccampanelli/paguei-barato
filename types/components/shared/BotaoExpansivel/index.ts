import { BotaoProps } from "../Botao";

export type BotaoExpansivelPropsAcao = Omit<BotaoProps, 'variante'>[];

export interface BotaoExpansivelProps extends BotaoProps {
    /**
     * Ações a serem exibidas no botão expansível
     */
    acoes: BotaoExpansivelPropsAcao;
}