import { ItemBusca } from "@/components/busca";
import { Botao, Caixa, CaixaScroll, Campo, Pilula, Texto } from "@/components/shared";
import { tema } from "@/constants/tema";
import useDebounce from "@/hooks/useDebounce";
import buscaService from "@/services/buscaService";
import { BuscaFiltrosSelecionados } from "@/types/app/protegidas/abas/busca";
import { BuscaParametros } from "@/types/services/busca/BuscaRequest";
import { BuscaFacetaResponse, BuscaItemResponse } from "@/types/services/busca/BuscaResponse";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

export default function Busca() {

    const router = useRouter();

    const [termosBusca, setTermosBusca] = useState("");
    const [resultados, setResultados] = useState<BuscaItemResponse[]>([]);
    const [filtrosDisponiveis, setFiltrosDisponiveis] = useState<BuscaFacetaResponse[]>([]);
    const [filtrosSelecionados, setFiltrosSelecionados] = useState<BuscaFiltrosSelecionados>({});
    const [totalResultados, setTotalResultados] = useState(0);

    function obterTextoResultados() {
        if (!termosBusca.trim())
            return "Buscas recentes";
        if (totalResultados === 0)
            return "Nenhum resultado encontrado";
        return `${totalResultados} ${totalResultados === 1 ? "resultado" : "resultados"}`;
    }

    function adicionarFiltro(tipo: string, valor: string) {
        setFiltrosSelecionados((filtrosAtuais) => {
            const filtrosAtualizados = { ...filtrosAtuais };

            if (!filtrosAtualizados[tipo]) {
                filtrosAtualizados[tipo] = [];
            }

            const index = filtrosAtualizados[tipo].indexOf(valor);
            if (index > -1) {
                filtrosAtualizados[tipo].splice(index, 1);
                if (filtrosAtualizados[tipo].length === 0) {
                    delete filtrosAtualizados[tipo];
                }
            } else {
                filtrosAtualizados[tipo].push(valor);
            }

            return filtrosAtualizados;
        });
    }

    function obterParametrosBusca(): BuscaParametros {
        return {
            termo: termosBusca.trim() || undefined,
            tipo: filtrosSelecionados.Tipo?.[0],
            categoria: filtrosSelecionados.Categoria?.[0],
            ramo: filtrosSelecionados.Ramo?.[0],
            cidade: filtrosSelecionados.Cidade?.[0],
            estado: filtrosSelecionados.Estado?.[0],
            bairro: filtrosSelecionados.Bairro?.[0],
            marca: filtrosSelecionados.Marca?.[0],
            pagina: 1,
            tamanhoPagina: 20,
        };
    }

    useDebounce(() => {
        if (!termosBusca.trim()) {
            setResultados([]);
            setTotalResultados(0);
            setFiltrosDisponiveis([]);
            setFiltrosSelecionados({});
            return;
        }

        buscaService.buscar(obterParametrosBusca()).then((resposta) => {
            setResultados(resposta.itens);
            setTotalResultados(resposta.totalItens);
            setFiltrosDisponiveis(resposta.facetas);
        })
    },
        750,
        [termosBusca, filtrosSelecionados]
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
                    <Texto variante="texto">
                        {obterTextoResultados()}
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
                contentContainerStyle={estilos.listaFiltros}
                showsHorizontalScrollIndicator={false}
                horizontal
            >
                {filtrosDisponiveis.map((filtro) =>
                    <Pilula
                        key={`${filtro.faceta}-${filtro.valor}`}
                        titulo={filtro.valor}
                        selecionada={filtrosSelecionados[filtro.faceta]?.includes(filtro.valor) ?? false}
                        onPress={() => adicionarFiltro(filtro.faceta, filtro.valor)}
                    />
                )}
            </CaixaScroll>
            <CaixaScroll
                tamanho="grande"
                contentContainerStyle={estilos.lista}
            >
                {resultados.map((item) => (
                    <ItemBusca
                        key={item.itemId}
                        titulo={item.nome}
                        subtitulo={item.tipo}
                        imagemUrl={item.imagemUrl}
                        aoPressionar={() => router.push(
                            item.tipo === "produto"
                                ? `/(protegidas)/produto/${item.itemId}`
                                : `/(protegidas)/mercado/${item.itemId}`
                        )}
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
        alignItems: "center",
    },
    listaFiltros: {
        flexDirection: "row",
        columnGap: tema.layout.espacamentos.medio,
        paddingVertical: 0,
    },
    lista: {
        rowGap: tema.layout.espacamentos.grande,
    },
});