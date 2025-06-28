import Botao from "@/components/Botao";
import CaixaScroll from "@/components/Caixa/CaixaScroll";
import Texto from "@/components/Texto";
import { tema } from "@/constants/tema";
import { useRouter } from "expo-router";

export default function Passo3Senha() {

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
                Proteja seu cadastro
            </Texto>
            <Botao onPress={() => router.push("/(desprotegidas)/cadastro/passo4Endereco")}>
                Próxima etapa
            </Botao>
        </CaixaScroll>
    )
}