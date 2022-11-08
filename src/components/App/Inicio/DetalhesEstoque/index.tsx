import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useRef } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import RBSheet from "react-native-raw-bottom-sheet";
import estiloGlobal from "../../../../estiloGlobal";
import Formatador from "../../../../util/Formatador";
import Toast from "../../../Toast";
import HistoricoPrecos, { DadoHistoricoPrecos } from "./HistoricoPrecos";
import estilos from "./styles";

export default function DetalhesEstoque() {

    const navigation = useNavigation();
    const modalRef = useRef<RBSheet>(null);

    const sair = () => {
        modalRef.current?.close();
        navigation.getParent()?.navigate("login");
    };

    const dummyLevantamento: DadoHistoricoPrecos[] = [
        {
            preco: Math.random() * 4,
            data: new Date(Math.random() * 1600000000000)
        },
        {
            preco: Math.random() * 4,
            data: new Date(Math.random() * 1600000000000)
        },
        {
            preco: Math.random() * 4,
            data: new Date(Math.random() * 1600000000000)
        },
        {
            preco: Math.random() * 4,
            data: new Date(Math.random() * 1600000000000)
        },
        {
            preco: Math.random() * 4,
            data: new Date(Math.random() * 1600000000000)
        },
        {
            preco: Math.random() * 4,
            data: new Date(Math.random() * 1600000000000)
        },
        {
            preco: Math.random() * 4,
            data: new Date(Math.random() * 1600000000000)
        },
        {
            preco: Math.random() * 4,
            data: new Date(Math.random() * 1600000000000)
        },
    ]

    return (
        <View style={estilos.main}>
            <TouchableOpacity style={[estiloGlobal.tagPequenaNormal, estilos.voltar]} onPress={() => navigation.goBack()}>
                <Feather name="arrow-left" />
                <Text style={estiloGlobal.tagPequenaNormalTexto}>Voltar</Text>
            </TouchableOpacity>
            <ScrollView>
                <View style={estilos.cabecalho}>
                    <Image style={estilos.itemImagem} source={{ uri: "https://a-static.mlcdn.com.br/800x560/molho-de-tomate-fugini-sache-300g-caixa-com-36-unidades/calcadosdmais/308d194e1d5211ecb8da4201ac185013/032bae61bf039c555f62d1ed00a2ecaa.jpeg" }} />
                </View>
                <View style={estilos.container}>
                    <View style={estilos.tags}>
                        <View style={estiloGlobal.tagPequenaDestaque}>
                            <Text style={estiloGlobal.tagPequenaDestaqueTexto}>Molhos e Condimentos</Text>
                        </View>
                        <View style={[estiloGlobal.tagPequenaNormal, { marginLeft: 10 }]}>
                            <Text style={estiloGlobal.tagPequenaNormalTexto}>Sugerido há 2h e 10min</Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate("detalhesProduto" as never)}>
                        <Text style={[estiloGlobal.titulo, estilos.titulo]}>Molho De Tomate Tradicional 450g Melhore <Feather name="arrow-right" style={estilos.tituloIcone} /></Text>
                    </TouchableOpacity>
                    <View style={estilos.secao}>
                        <Text style={[estiloGlobal.subtitulo, estilos.titulo]}>Histórico de preços</Text>
                        <HistoricoPrecos dados={dummyLevantamento} />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}