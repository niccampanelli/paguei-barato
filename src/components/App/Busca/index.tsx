import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import estiloGlobal from "../../../estiloGlobal";
import estilos from "./styles";

export default function Busca() {

    const navigation = useNavigation();

    const sair = () => {
        navigation.getParent()?.navigate("login");
    };

    return (
        <View style={estilos.container}>
            <View style={estilos.cabecalho}>
                <Text style={estiloGlobal.titulo}>Buscar</Text>
                <View style={estilos.barraBusca}>
                    <TextInput style={estilos.barraBuscaCampo} placeholder="Escreva aqui sua pesquisa..."/>
                    <Feather style={estilos.barraBuscaIcone} name="search"/>
                </View>
                <ScrollView horizontal style={estilos.listaFiltros}>
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
                    <View style={[estiloGlobal.tagPequenaSecundaria, estilos.filtro]}>
                        <Text style={estiloGlobal.tagPequenaSecundariaTexto}>Opção</Text>
                    </View>
                </ScrollView>
                <View style={estilos.listaCabecalho}>
                    <Text style={estiloGlobal.subtitulo}>Resultados</Text>
                    <View style={estiloGlobal.tagPequenaNormal}>
                        <Text style={estiloGlobal.tagPequenaNormalTexto}>Ordenar</Text>
                        <Feather name="bar-chart"/>
                    </View>
                </View>
                <ScrollView>

                </ScrollView>
            </View>
        </View>
    );
}