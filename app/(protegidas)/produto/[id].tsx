import { Botao, CaixaScroll, Pilula, Texto } from "@/components/shared";
import { tema } from "@/constants/tema";
import produtoService from "@/services/produtoService";
import { ProdutoDetalhesResponse } from "@/types/services";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

export default function Produto() {

    const router = useRouter();
    const { id } = useLocalSearchParams();

    const [produto, setProduto] = useState<ProdutoDetalhesResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const produtoId = Array.isArray(id) ? id[0] : id;
        if (produtoId) {
            setLoading(true);
            produtoService.obterPorId(parseInt(produtoId)).then((produto) => {
                setProduto(produto);
                setLoading(false);
            });
        }
    }, []);

    const Detalhe = function () {
        return (
            <View style={estilos.detalhe}>
                <Texto peso="link">
                    Marca:
                </Texto>
                <Texto>
                    Predilecta
                </Texto>
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <Botao
                variante="info"
                tamanho="botaoPequeno"
                iconeLado="esquerda"
                iconeNome="arrow-left"
                style={{ marginRight: "auto" }}
                onPress={() => router.back()}
            >
                Voltar
            </Botao>
            <CaixaScroll tamanho="grande">
                <Image
                    source={{
                        uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkAeMjQdfqzZazkxvAy24ax3xBrqTeMC45tQ&s",
                    }}
                    contentFit="contain"
                    style={estilos.imagem}
                />
                <View style={estilos.conteudo}>
                    <View>
                        <Pilula
                            titulo="Molhos e condimentos"
                        />
                    </View>
                    <Texto variante="titulo">
                        {produto?.nome}
                    </Texto>
                    <View style={estilos.detalhes}>
                        <Texto variante="subtitulo">Detalhes do produto</Texto>
                        <Detalhe />
                        <Detalhe />
                        <Detalhe />
                        <Detalhe />
                        <Detalhe />
                    </View>
                </View>
            </CaixaScroll>
        </View>
    )
}

const estilos = StyleSheet.create({
    imagem: {
        width: "100%",
        height: 200,
        backgroundColor: "#ff0000",
    },
    conteudo: {
        display: "flex",
        flexDirection: "column",
        gap: tema.layout.espacamentos.medio,
    },
    detalhes: {
        display: "flex",
        flexDirection: "column",
        gap: tema.layout.espacamentos.pequeno,
    },
    detalhe: {
        display: "flex",
        flexDirection: "row",
        gap: tema.layout.espacamentos.pequeno,
    }
});