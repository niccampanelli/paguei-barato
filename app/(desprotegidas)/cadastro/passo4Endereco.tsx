import Botao from "@/components/Botao";
import CaixaScroll from "@/components/Caixa/CaixaScroll";
import Texto from "@/components/Texto";
import { tema } from "@/constants/tema";
import { useRouter } from "expo-router";

export default function Passo4Endereco() {

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
                Não precisa ir muito longe!
            </Texto>
            <Botao onPress={() => router.push("/(desprotegidas)/cadastro/fim")}>
                Próxima etapa
            </Botao>
        </CaixaScroll>
    )
}