import Botao from "@/components/Botao";
import CaixaScroll from "@/components/Caixa/CaixaScroll";
import Texto from "@/components/Texto";
import { tema } from "@/constants/tema";
import { useRouter } from "expo-router";

export default function Passo2Nome() {

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
                Vamos nos conhecer melhor!
            </Texto>
            <Botao onPress={() => router.push("/(desprotegidas)/cadastro/passo3Senha")}>
                Próxima etapa
            </Botao>
        </CaixaScroll>
    )
}