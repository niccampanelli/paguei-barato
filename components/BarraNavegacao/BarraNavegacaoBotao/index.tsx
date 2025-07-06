import Botao from "@/components/Botao";
import { BarraNavegacaoBotaoProps } from "@/types/components/BarraNavegacao/BarraNavegacaoBotao";

export default function BarraNavegacaoBotao({
    ...props
}: BarraNavegacaoBotaoProps) {

    return (
        <Botao
            {...props}
        />
    );
}