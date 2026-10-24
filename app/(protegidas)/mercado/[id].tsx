import { Botao, CaixaScroll, Pilula, Texto } from "@/components/shared";
import { tema } from "@/constants/tema";
import lojaService from "@/services/lojaService";
import { LojaDetalhesResponse } from "@/types/services";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

export default function Mercado() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const [loja, setLoja] = useState<LojaDetalhesResponse | null>(null);

    useEffect(() => {
        const lojaId = Array.isArray(id) ? id[0] : id;
        if (!lojaId) {
            return;
        }

        lojaService.obterPorId(Number(lojaId)).then(setLoja);
    }, [id]);

    return (
        <View style={estilos.container}>
            <Botao
                variante="info"
                tamanho="botaoPequeno"
                iconeLado="esquerda"
                iconeNome="arrow-left"
                style={estilos.botaoVoltar}
                onPress={() => router.back()}
            >
                Voltar
            </Botao>
            <CaixaScroll tamanho="grande">
                <Image
                    source={{ uri: loja?.imagemUrl }}
                    contentFit="contain"
                    style={estilos.imagem}
                />
                <View style={estilos.conteudo}>
                    <View style={estilos.ramos}>
                        {loja?.ramos.map((ramo) => (
                            <Pilula key={ramo.id} titulo={ramo.nome} />
                        ))}
                    </View>
                    <Texto variante="titulo">{loja?.nome}</Texto>
                    <View style={estilos.detalhes}>
                        <Texto variante="subtitulo">Detalhes da loja</Texto>
                        <Texto>{obterEndereco(loja)}</Texto>
                    </View>
                </View>
            </CaixaScroll>
        </View>
    );
}

function obterEndereco(loja: LojaDetalhesResponse | null): string {
    if (!loja) {
        return "Carregando...";
    }

    return `${loja.logradouro}, ${loja.numero} - ${loja.bairro}, ${loja.cidade} - ${loja.estado}, ${loja.cep}`;
}

const estilos = StyleSheet.create({
    container: {
        flex: 1,
    },
    botaoVoltar: {
        marginRight: "auto",
    },
    imagem: {
        width: "100%",
        height: 200,
    },
    conteudo: {
        flexDirection: "column",
        gap: tema.layout.espacamentos.medio,
    },
    ramos: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: tema.layout.espacamentos.pequeno,
    },
    detalhes: {
        flexDirection: "column",
        gap: tema.layout.espacamentos.pequeno,
    },
});
