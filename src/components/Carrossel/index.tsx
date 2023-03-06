import { Image, ListRenderItemInfo, TouchableOpacity, View, ViewProps } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useEstiloGlobal } from "../../estiloGlobal";
import Formatador from "../../util/Formatador";
import Texto from "../Texto";
import { useEstilos } from "./styles";

interface CarrosselProps extends ViewProps {
    titulo: string,
    dados: any[],
    onItemPress?: (item: any) => void
}

export default function Carrossel({ titulo, dados, onItemPress, ...props }: CarrosselProps) {

    const { estilos } = useEstilos();
    const { estiloGlobal } = useEstiloGlobal();

    const ItemCarrossel = (props: ListRenderItemInfo<any>) => {

        return (
            <TouchableOpacity onPress={() => onItemPress?.(props.item)} style={[estilos.item, (props.index === dados.length - 1) ? { marginRight: 0 } : { marginRight: 10 }]}>
                {props.item.desconto ?
                    <View style={[estilos.itemBadge, estiloGlobal.tagPequenaDestaque]}>
                        <Texto peso="800ExtraBold" style={estiloGlobal.tagPequenaDestaqueTexto}>- {props.item.desconto}%</Texto>
                    </View>
                    :
                    null
                }
                <Image style={estilos.itemImagem} source={props.item.imagem} />
                <Texto peso="800ExtraBold" style={estilos.itemNome} numberOfLines={3}>{props.item.nome}</Texto>
                <Texto style={estilos.itemMercado} numberOfLines={2}>{props.item.mercado}</Texto>
                { props.item.desconto &&
                    <Texto style={estilos.itemPrecoAnterior}>era {Formatador.formatarMoeda((props.item.preco)/(1-(props.item.desconto/100)))}</Texto>
                }
                <Texto peso="900Black" style={estilos.itemPreco}>{Formatador.formatarMoeda(props.item.preco)}</Texto>
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