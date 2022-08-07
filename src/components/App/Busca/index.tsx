import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { FlatList, Image, ListRenderItem, ListRenderItemInfo, ListView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import estiloGlobal from "../../../estiloGlobal";
import estilos from "./styles";

export default function Busca() {

    const navigation = useNavigation();

    const sair = () => {
        navigation.getParent()?.navigate("login");
    };

    const dummydata = [
        {
            imagem: require("../../../../assets/favicon.png"),
            nome: "Sabão Em Pó Lavanda Ipê 500g"
        },
        {
            imagem: require("../../../../assets/favicon.png"),
            nome: "Sabão Em Pó Coco ÉBomMesmo 1kg"
        },
        {
            imagem: require("../../../../assets/favicon.png"),
            nome: "Detergente Neutro Clear LavaMais 250ml"
        },
        {
            imagem: require("../../../../assets/favicon.png"),
            nome: "Sabão Em Pó Lavanda ÉBomMesmo 250g"
        },
        {
            imagem: require("../../../../assets/favicon.png"),
            nome: "Sabão Em Pó Lavanda Ipê"
        },
        {
            imagem: require("../../../../assets/favicon.png"),
            nome: "Sabão Em Pó Lavanda Ipê"
        },
        {
            imagem: require("../../../../assets/favicon.png"),
            nome: "Sabão Em Pó Lavanda Ipê"
        },
        {
            imagem: require("../../../../assets/favicon.png"),
            nome: "Sabão Em Pó Lavanda Ipê"
        },
        {
            imagem: require("../../../../assets/favicon.png"),
            nome: "Sabão Em Pó Lavanda Ipê"
        },
        {
            imagem: require("../../../../assets/favicon.png"),
            nome: "Sabão Em Pó Lavanda Ipê"
        },
        {
            imagem: require("../../../../assets/favicon.png"),
            nome: "Sabão Em Pó Lavanda Ipê aa aa aa aa aa aa aa aa aa aa aa aa aa aa aa aa aa aa aa"
        },
        {
            imagem: require("../../../../assets/favicon.png"),
            nome: "Sabão Em Pó Lavanda Ipê"
        },
        {
            imagem: require("../../../../assets/favicon.png"),
            nome: "Sabão Em Pó Lavanda Ipê"
        },
        {
            imagem: require("../../../../assets/favicon.png"),
            nome: "Sabão Em Pó Lavanda Ipê"
        },
        {
            imagem: require("../../../../assets/favicon.png"),
            nome: "Sabão Em Pó Lavanda Ipê"
        },
        {
            imagem: require("../../../../assets/favicon.png"),
            nome: "Sabão Em Pó Lavanda Ipê"
        },
    ];

    const ItemLista = ({item}: ListRenderItemInfo<any>) => {

        return (
            <TouchableOpacity style={estilos.listaItem}>
                <Image style={estilos.listaItemImagem} source={item.imagem}/>
                <Text style={estilos.listaItemTexto} numberOfLines={1}>{item.nome}</Text>
            </TouchableOpacity>
        );
    };
    
    return (
        <View style={estilos.container}>
            <View style={estilos.cabecalho}>
                <Text style={estiloGlobal.titulo}>Buscar</Text>
                <View style={estilos.barraBusca}>
                    <TextInput style={estilos.barraBuscaCampo} placeholder="Escreva aqui sua pesquisa..."/>
                    <Feather style={estilos.barraBuscaIcone} name="search"/>
                </View>
                <ScrollView showsHorizontalScrollIndicator={false} horizontal style={estilos.listaFiltros}>
                    <View style={[estiloGlobal.tagPequenaDestaque, estilos.filtro]}>
                        <Text style={estiloGlobal.tagPequenaDestaqueTexto}>Filtros</Text>
                        <Text style={estilos.filtroContador}>2</Text>
                    </View>
                    <View style={[estiloGlobal.tagPequenaSecundaria, estilos.filtro]}>
                        <Text style={estiloGlobal.tagPequenaSecundariaTexto}>Opção</Text>
                    </View>
                    <View style={[estiloGlobal.tagPequenaSecundaria, estilos.filtro]}>
                        <Text style={estiloGlobal.tagPequenaSecundariaTexto}>Opção</Text>
                    </View>
                    <View style={[estiloGlobal.tagPequenaSecundaria, estilos.filtro]}>
                        <Text style={estiloGlobal.tagPequenaSecundariaTexto}>Opção</Text>
                    </View>
                    <View style={[estiloGlobal.tagPequenaSecundaria, estilos.filtro]}>
                        <Text style={estiloGlobal.tagPequenaSecundariaTexto}>Opção</Text>
                    </View>
                    <View style={[estiloGlobal.tagPequenaSecundaria, estilos.filtro]}>
                        <Text style={estiloGlobal.tagPequenaSecundariaTexto}>Opção</Text>
                    </View>
                    <View style={[estiloGlobal.tagPequenaSecundaria, estilos.filtro]}>
                        <Text style={estiloGlobal.tagPequenaSecundariaTexto}>Opção</Text>
                    </View>
                    <View style={[estiloGlobal.tagPequenaSecundaria, estilos.filtro]}>
                        <Text style={estiloGlobal.tagPequenaSecundariaTexto}>Opção</Text>
                    </View>
                </ScrollView>
            </View>
            <View style={estilos.listaCabecalho}>
                <Text style={estiloGlobal.subtitulo}>Resultados - 3</Text>
                <View style={estiloGlobal.tagPequenaNormal}>
                    <Text style={estiloGlobal.tagPequenaNormalTexto}>Ordenar</Text>
                    <Feather name="bar-chart"/>
                </View>
            </View>
            <FlatList style={estilos.lista} data={dummydata} renderItem={ItemLista}/>
        </View>
    );
}