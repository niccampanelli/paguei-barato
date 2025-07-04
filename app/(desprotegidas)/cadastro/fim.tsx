import Botao from "@/components/Botao";
import CaixaScroll from "@/components/Caixa/CaixaScroll";
import Texto from "@/components/Texto";
import { tema } from "@/constants/tema";
import { useRouter } from "expo-router";

export default function Fim() {

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
                Prazer em te conhecer, João!
            </Texto>
            <Botao onPress={() => router.push("/(protegidas)/(abas)/inicio")}>
                Comece a economizar!
            </Botao>
        </CaixaScroll>
    )
}