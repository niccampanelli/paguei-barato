import Botao from "@/components/Botao";
import CaixaScroll from "@/components/Caixa/CaixaScroll";
import Texto from "@/components/Texto";
import { tema } from "@/constants/tema";
import { useRouter } from "expo-router";

export default function Passo1Email() {

    const router = useRouter();

    return (
        <CaixaScroll
            tamanho="grande"
            contentContainerStyle={{
                flex: 1,
                rowGap: tema.layout.espacamentos.grande,
                paddingTop: 0,
            }}
        >
            <Texto variante="subtitulo">
                Como podemos entrar em contato com você?
            </Texto>
            <Botao
                variante="destaque"
                onPress={() => router.push("/(desprotegidas)/cadastro/passo2Nome")}>
                Próxima etapa
            </Botao>
        </CaixaScroll>
    )
}