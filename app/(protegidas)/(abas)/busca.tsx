import { ItemBusca } from "@/components/busca";
import { Botao, Caixa, CaixaScroll, Campo, Texto } from "@/components/shared";
import { tema } from "@/constants/tema";
import useDebounce from "@/hooks/useDebounce";
import buscaService from "@/services/buscaService";
import { BuscaItemResponse } from "@/types/services/busca/BuscaResponse";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

export default function Busca() {

    const [termosBusca, setTermosBusca] = useState("");
    const [resultados, setResultados] = useState<BuscaItemResponse[]>([]);
    const [totalResultados, setTotalResultados] = useState(0);

    useDebounce(() =>
        buscaService.buscar(termosBusca).then((resposta) => {
            setResultados(resposta.itens);
            setTotalResultados(resposta.total);
        }),
        1000,
        [termosBusca]
    );

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
                    value={termosBusca}
                    onChangeText={setTermosBusca}
                />
                <View style={estilos.subtitulo}>
                    <Texto variante="subtitulo">
                        {totalResultados} - Resultados
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
                contentContainerStyle={estilos.lista}
            >
                {resultados.map((item) => (
                    <ItemBusca
                        key={item.id}
                        titulo={item.nome}
                        subtitulo={"marca" in item ? item.marca : item.categoria}
                        imagemUrl={item.imagemUrl}
                    />
                ))}
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
    },
    lista: {
        paddingTop: 0,
        rowGap: tema.layout.espacamentos.grande,
    },
});