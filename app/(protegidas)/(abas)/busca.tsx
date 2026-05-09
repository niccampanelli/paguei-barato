import { ItemBusca } from "@/components/busca";
import { Botao, Caixa, CaixaScroll, Campo, Pilula, Texto } from "@/components/shared";
import { tema } from "@/constants/tema";
import useDebounce from "@/hooks/useDebounce";
import buscaService from "@/services/buscaService";
import { BuscaFiltrosSelecionados } from "@/types/app/protegidas/abas/busca";
import { BuscaFiltroResponse, BuscaItemResponse } from "@/types/services/busca/BuscaResponse";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

export default function Busca() {

    const [termosBusca, setTermosBusca] = useState("");
    const [resultados, setResultados] = useState<BuscaItemResponse[]>([]);
    const [filtrosDisponiveis, setFiltrosDisponiveis] = useState<BuscaFiltroResponse[]>([]);
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

    useDebounce(() => {
        if (!termosBusca.trim()) {
            setResultados([]);
            setTotalResultados(0);
            setFiltrosDisponiveis([]);
            setFiltrosSelecionados({});
            return;
        }

        buscaService.buscar(termosBusca, filtrosSelecionados).then((resposta) => {
            setResultados(resposta.itens);
            setTotalResultados(resposta.total);
            setFiltrosDisponiveis(resposta.filtros);
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
                    filtro.opcoes.map((opcao) => (
                        <Pilula
                            key={opcao}
                            titulo={opcao}
                            selecionada={filtrosSelecionados[filtro.tipo]?.includes(opcao) ?? false}
                            onPress={() => adicionarFiltro(filtro.tipo, opcao)}
                        />
                    ))
                )}
            </CaixaScroll>
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