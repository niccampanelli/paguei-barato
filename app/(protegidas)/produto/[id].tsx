import { Botao, CaixaScroll, Pilula, Texto } from "@/components/shared";
import { tema } from "@/constants/tema";
import produtoService from "@/services/produtoService";
import { ProdutoDetalhesResponse } from "@/types/services";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Produto() {

    const router = useRouter();
    const insets = useSafeAreaInsets();
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

    function Detalhe({ titulo, valor }: { titulo: string; valor: string }) {
        return (
            <View style={estilos.detalhe}>
                <Texto peso="link">
                    {titulo}:
                </Texto>
                <Texto>
                    {valor}
                </Texto>
            </View>
        );
    }

    if (!produto)
        return null;

    return (
        <View style={{ flex: 1 }}>
            <Botao
                variante="info"
                tamanho="botaoPequeno"
                iconeLado="esquerda"
                iconeNome="arrow-left"
                style={[estilos.botao, {
                    top: insets.top + tema.layout.paddings.grande.vertical,
                    left: tema.layout.paddings.grande.horizontal
                }]}
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
                    <View style={estilos.categorias}>
                        {produto.categorias.map((categoria) => (
                            <Pilula
                                key={categoria.id}
                                titulo={categoria.nome}
                            />
                        ))}
                    </View>
                    <Texto variante="titulo">
                        {produto.nome}
                    </Texto>
                    <View style={estilos.detalhes}>
                        <Texto variante="subtitulo">Detalhes do produto</Texto>
                        {Object.entries(produto.atributos ?? {}).map(([titulo, valor]) => (
                            <Detalhe
                                key={titulo}
                                titulo={titulo}
                                valor={valor}
                            />
                        ))}
                        <Detalhe
                            titulo="Marca"
                            valor={produto.marca.nome}
                        />
                    </View>
                </View>
            </CaixaScroll>
        </View>
    )
}

const estilos = StyleSheet.create({
    botao: {
        position: "absolute",
        zIndex: 1,
    },
    imagem: {
        width: "100%",
        height: 200,
    },
    conteudo: {
        display: "flex",
        flexDirection: "column",
        gap: tema.layout.espacamentos.medio,
    },
    categorias: {
        display: "flex",
        flexDirection: "row",
        gap: tema.layout.espacamentos.pequeno,
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