import { Image, ListRenderItemInfo, TouchableOpacity, View, ViewProps, FlatList } from "react-native";
import { useEstiloGlobal } from "../../estiloGlobal";
import Formatador from "../../util/Formatador";
import Texto from "../Texto";
import { useEstilos } from "./styles";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import CarregandoSkeleton from "../CarregandoSkeleton";
import { useTemaContext } from "../../util/context/providers/temaProvider";

interface CarrosselProps<TipoItem> extends ViewProps {
    titulo: string,
    dados: TipoItem[],
    onItemPress?: (item: TipoItem) => void,
    tituloItem: (item: TipoItem) => string,
    subtituloItem: (item: TipoItem) => string,
    imagemItem: (item: TipoItem) => any,
    precoItem: (item: TipoItem) => number,
    descontoItem?: (item: TipoItem) => number,
    carregando?: boolean
}

export default function Carrossel<TipoItem>({
    titulo,
    dados,
    onItemPress,
    tituloItem,
    subtituloItem,
    imagemItem,
    precoItem,
    descontoItem,
    carregando,
    ...props
}: CarrosselProps<TipoItem>) {

    const { estilos } = useEstilos();
    const { estiloGlobal } = useEstiloGlobal();

    const ItemCarrossel = (props: ListRenderItemInfo<TipoItem>) => {

        return (
            <TouchableOpacity onPress={() => onItemPress?.(props.item)} style={estilos.item}>
                {descontoItem?.(props.item) ?
                    <View style={[estilos.itemBadge, estiloGlobal.tagPequenaDestaque]}>
                        <Texto peso="800ExtraBold" style={estiloGlobal.tagPequenaDestaqueTexto}>- {descontoItem?.(props.item)}%</Texto>
                    </View>
                    :
                    null
                }
                <Image style={estilos.itemImagem} source={imagemItem?.(props.item) || { uri: "https://apoioentrega.vteximg.com.br/arquivos/ids/464205/2149.jpg?v=637685996252730000" }} />
                <Texto peso="800ExtraBold" style={estilos.itemNome} numberOfLines={3}>{tituloItem?.(props.item)}</Texto>
                <Texto style={estilos.itemMercado} numberOfLines={2}>{subtituloItem?.(props.item)}</Texto>
                {descontoItem?.(props.item) &&
                    <Texto style={estilos.itemPrecoAnterior}>era {Formatador.formatarMoeda((precoItem?.(props.item)) / (1 - (descontoItem?.(props.item) / 100)))}</Texto>
                }
                <Texto peso="900Black" style={estilos.itemPreco}>{Formatador.formatarMoeda(precoItem?.(props.item))}</Texto>
            </TouchableOpacity>
        );
    };

    return (
        <View style={estilos.corpo} {...props}>
            <Texto peso="800ExtraBold" style={[estiloGlobal.subtitulo, estilos.titulo]}>{titulo}</Texto>
            <MotiView>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    data={dados}
                    contentContainerStyle={estilos.container}
                    renderItem={(props) =>
                        <ItemCarrossel {...props} />
                    }
                />
            </MotiView>
        </View>
    );
}

export function CarrosselPlaceholder({
    ...props
}: ViewProps) {

    const { estilos } = useEstilos();

    const ItemCarrosselCarregando = () => {

        return (
            <View style={estilos.item}>
                <Skeleton.Group show>
                    <CarregandoSkeleton>
                        <View style={estilos.itemImagem} />
                    </CarregandoSkeleton>
                    <View style={{ height: 20 }}></View>
                    <CarregandoSkeleton width={"100%"} height={26}></CarregandoSkeleton>
                    <View style={{ height: 8 }}></View>
                    <CarregandoSkeleton width={"80%"} height={16}></CarregandoSkeleton>
                    <View style={{ height: 16 }}></View>
                    <CarregandoSkeleton width={"50%"} height={26}></CarregandoSkeleton>
                </Skeleton.Group>
            </View>
        );
    };

    return (
        <View style={estilos.corpo} {...props}>
            <View style={estilos.titulo}>
                <CarregandoSkeleton width={200} height={26} />
            </View>
            <MotiView>
                <View style={estilos.container}>
                    <Skeleton.Group show>
                        <ItemCarrosselCarregando />
                        <ItemCarrosselCarregando />
                        <ItemCarrosselCarregando />
                    </Skeleton.Group>
                </View>
            </MotiView>
        </View>
    );
}