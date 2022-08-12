import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useRef } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import estiloGlobal from "../../../estiloGlobal";
import Modal from "../../Modal";
import estilos from "./styles";

export default function Menu() {

    const navigation = useNavigation();
    const modalRef = useRef<RBSheet>(null);

    const sair = () => {
        modalRef.current?.close();
        navigation.getParent()?.navigate("login");
    };

    return (
        <View style={estilos.container}>
            <Modal 
                titulo="Tem certeza?"
                possuiBotoes 
                refSheet={modalRef} 
                labelBotaoPrincipal="Sim, sair." 
                labelBotaoSecundario="Não, permanecer conectado."
                aoPressionarBotaoPrincipal={sair}
                aoPressionarBotaoSecundario={() => modalRef.current?.close()}
            >
                <Text style={estiloGlobal.texto}>Deseja mesmo sair da sua conta?</Text>
            </Modal>
            <View style={estilos.cabecalho}>
                <Text style={estiloGlobal.titulo}>Menu</Text>
                <View style={estilos.usuario}>
                    <Text style={[estiloGlobal.subtitulo, estilos.usuarioIcone]}>NC</Text>
                    <View style={estilos.usuarioInfo}>
                        <Text style={estiloGlobal.subtitulo}>Nicholas Campanelli</Text>
                        <Text style={estiloGlobal.observacao}>nicholasoucampanelli@hotmail.com</Text>
                    </View>
                </View>
            </View>
            <View style={estilos.opcoes}>
                <TouchableOpacity style={estilos.opcao}>
                    <Feather name="user" style={estilos.opcaoIcone} />
                    <Text style={estilos.opcaoTexto}>Conta</Text>
                </TouchableOpacity>
                <TouchableOpacity style={estilos.opcao}>
                    <Feather name="bell" style={estilos.opcaoIcone} />
                    <Text style={estilos.opcaoTexto}>Notificações</Text>
                </TouchableOpacity>
                <TouchableOpacity style={estilos.opcao}>
                    <Feather name="info" style={estilos.opcaoIcone} />
                    <Text style={estilos.opcaoTexto}>Sobre</Text>
                </TouchableOpacity>
                <TouchableOpacity style={estilos.opcao} onPress={() => modalRef.current?.open()}>
                    <Feather name="log-out" style={estilos.opcaoIconeVermelho} />
                    <Text style={estilos.opcaoTextoVermelho}>Sair</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}