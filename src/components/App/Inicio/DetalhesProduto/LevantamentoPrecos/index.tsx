import { View, ViewProps } from "react-native";
import { useEstiloGlobal } from "../../../../../estiloGlobal";
import { useTemaContext } from "../../../../../util/context/providers/temaProvider";
import Formatador from "../../../../../util/Formatador";
import Texto from "../../../../Texto";
import { useEstilos } from "./styles";
import LevantamentoProduto from "../../../../../interfaces/models/LevantamentoProduto";
import CarregandoSkeleton from "../../../../CarregandoSkeleton";
import { Skeleton } from "moti/skeleton";

export interface DadoLevantamentoPrecos {
    quantidade: number,
    menor: number,
    medio: number,
    maior: number
}

interface LevantamentoPrecosProps extends ViewProps {
    dados: LevantamentoProduto
}

export default function LevantamentoPrecos({
    dados,
    ...props
}: LevantamentoPrecosProps) {

    const { estilos } = useEstilos();
    const { estiloGlobal } = useEstiloGlobal();
    const { propriedadesTema } = useTemaContext();

    return (
        <View style={estilos.main} {...props}>
            <View style={[estiloGlobal.tagPequenaDestaque, estilos.quantidade]}>
                <Texto peso="800ExtraBold" style={estiloGlobal.tagPequenaDestaqueTexto}>{dados.quantidadeSugestoes} {dados.quantidadeSugestoes === 1 ? "sugestão" : "sugestões"} </Texto>
            </View>
            <View style={estilos.container}>
                <View style={estilos.coluna}>
                    <Texto style={estilos.label}>Menor preco</Texto>
                    <View style={[estiloGlobal.tagPequenaDestaque, estilos.tagPreco]}>
                        <Texto peso="700Bold" style={estiloGlobal.tagPequenaDestaqueTexto}>{Formatador.formatarMoeda(dados.maiorPreco)}</Texto>
                    </View>
                    <View style={[estilos.barra, { backgroundColor: propriedadesTema.cores.destaque, flex: (dados.maiorPreco * 1) / dados.menorPreco, borderBottomLeftRadius: propriedadesTema.layout.raioBorda }]} />
                </View>
                <View style={estilos.coluna}>
                    <Texto style={estilos.label}>Preço médio</Texto>
                    <View style={[estiloGlobal.tagPequenaSecundaria, estilos.tagPreco]}>
                        <Texto peso="700Bold" style={estiloGlobal.tagPequenaSecundariaTexto}>{Formatador.formatarMoeda(dados.precoMedio)}</Texto>
                    </View>
                    <View style={[estilos.barra, { backgroundColor: propriedadesTema.cores.secundaria, flex: (dados.precoMedio * 1) / dados.menorPreco }]} />
                </View>
                <View style={estilos.coluna}>
                    <Texto style={estilos.label}>Maior preco</Texto>
                    <View style={[estiloGlobal.tagPequenaEscura, estilos.tagPreco]}>
                        <Texto peso="700Bold" style={estiloGlobal.tagPequenaEscuraTexto}>{Formatador.formatarMoeda(dados.menorPreco)}</Texto>
                    </View>
                    <View style={[estilos.barra, { backgroundColor: propriedadesTema.cores.fundoTerciario, flex: 1, borderBottomRightRadius: propriedadesTema.layout.raioBorda }]} />
                </View>
            </View>
        </View>
    );
}

export function LevantamentoPrecosPlaceholder() {

    const { estilos } = useEstilos();

    const obterAlturaAleatoria = () => {
        return (Math.random() * 0.9) + 0.1;
    };

    const Coluna = () => {
        return (
            <View style={estilos.coluna}>
                <View style={{ marginBottom: 10 }}>
                    <CarregandoSkeleton width={60} height={26} />
                </View>
                <View style={[estilos.barra, { flex: obterAlturaAleatoria() }]}>
                    <CarregandoSkeleton >
                        <View style={{ height: "100%" }} />
                    </CarregandoSkeleton>
                </View>
            </View>
        );
    };

    return (
        <View style={estilos.main}>
            <View style={estilos.quantidade}>
                <CarregandoSkeleton width={100} height={26} />
            </View>
            <View style={estilos.container}>
                <Skeleton.Group show>
                    <Coluna />
                    <Coluna />
                    <Coluna />
                </Skeleton.Group>
            </View>
        </View>
    );
}