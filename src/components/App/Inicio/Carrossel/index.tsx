import { Image, ListRenderItemInfo, Text, TouchableOpacity, View, ViewProps } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import estiloGlobal from "../../../../estiloGlobal";
import estilos from "./styles";

interface CarrosselProps extends ViewProps {
    titulo: string,
    dados: ReadonlyArray<any>
}

export default function Carrossel({titulo, dados, ...props}: CarrosselProps) {

    const ItemCarrossel = (props: ListRenderItemInfo<any>) => {

        return (
            <TouchableOpacity style={[estilos.item, (props.index === dados.length-1) ? { marginRight: 0 } : { marginRight: 40 }]}>
                { props.item.desconto ?
                    <View style={[estilos.itemBadge, estiloGlobal.tagPequenaDestaque]}>
                        <Text style={estiloGlobal.tagPequenaDestaqueTexto}>- {props.item.desconto}%</Text>
                    </View>
                    :
                    null
                }
                <Image style={estilos.itemImagem} source={props.item.imagem}/>
                <Text style={estilos.itemPreco}>R$ {props.item.preco}</Text>
                <Text style={estilos.itemNome} numberOfLines={3}>{props.item.nome}</Text>
                <Text style={estilos.itemMercado} numberOfLines={2}>{props.item.mercado}</Text>
            </TouchableOpacity>
        );
    }

    return (
        <View style={estilos.corpo} {...props}>
            <Text style={[estiloGlobal.subtitulo, estilos.titulo]}>{titulo}</Text>
            <FlatList showsHorizontalScrollIndicator={false} horizontal data={dados} contentContainerStyle={estilos.container} renderItem={(props) => <ItemCarrossel {...props}/>}/>
        </View>
    );
}