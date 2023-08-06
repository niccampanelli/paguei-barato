import { Image, ListRenderItemInfo, TouchableOpacity, View, ViewProps, FlatList } from "react-native";
import { useEstiloGlobal } from "../../estiloGlobal";
import Formatador from "../../util/Formatador";
import Texto from "../Texto";
import { useEstilos } from "./styles";

interface CarrosselProps extends ViewProps {
    titulo: string,
    dados: any[],
    onItemPress?: (item: any) => void,
    tituloItem: (item: any) => string,
    subtituloItem: (item: any) => string,
    imagemItem: (item: any) => any,
    precoItem: (item: any) => number,
    descontoItem?: (item: any) => number,
}

export default function Carrossel({
    titulo,
    dados,
    onItemPress,
    tituloItem,
    subtituloItem,
    imagemItem,
    precoItem,
    descontoItem,
    ...props
}: CarrosselProps) {

    const { estilos } = useEstilos();
    const { estiloGlobal } = useEstiloGlobal();

    const ItemCarrossel = (props: ListRenderItemInfo<any>) => {

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
    }

    return (
        <View style={estilos.corpo} {...props}>
            <Texto peso="800ExtraBold" style={[estiloGlobal.subtitulo, estilos.titulo]}>{titulo}</Texto>
            <FlatList showsHorizontalScrollIndicator={false} horizontal data={dados} contentContainerStyle={estilos.container} renderItem={(props) => <ItemCarrossel {...props} />} />
        </View>
    );
}