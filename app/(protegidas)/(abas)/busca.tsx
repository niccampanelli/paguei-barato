import Botao from "@/components/shared/Botao";
import Caixa from "@/components/shared/Caixa";
import CaixaScroll from "@/components/shared/Caixa/CaixaScroll";
import Campo from "@/components/shared/Campo";
import Texto from "@/components/shared/Texto";
import { tema } from "@/constants/tema";
import { StyleSheet, View } from "react-native";

export default function Busca() {

    return (
        <View>
            <Caixa
                tamanho="grande"
                style={estilos.cabecalho}
            >
                <Texto variante="titulo">
                    Buscar
                </Texto>
                <Campo
                    placeholder="Busque produtos e mercados..."
                    iconeNome="search"
                    iconeLado="direita"
                />
                <View style={estilos.subtitulo}>
                    <Texto variante="subtitulo">
                        Resultados
                    </Texto>
                    <Botao
                        variante="info"
                        tamanho="botaoPequeno"
                        iconeNome="filter"
                    >
                        Filtrar
                    </Botao>
                </View>
            </Caixa>
            <CaixaScroll
                tamanho="grande"
            >
            </CaixaScroll>
        </View>
    )
}

const estilos = StyleSheet.create({
    cabecalho: {
        rowGap: tema.layout.espacamentos.grande,
    },
    subtitulo: {
        flexDirection: "row",
        justifyContent: "space-between",
    }
});