import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useRef } from "react";
import { TouchableOpacity, View } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { useEstiloGlobal } from "../../../estiloGlobal";
import { useTemaContext } from "../../../util/context/providers/temaProvider";
import Modal from "../../Modal";
import Texto from "../../Texto";
import { useEstilos } from "./styles";

export default function Menu() {

    const { estilos } = useEstilos();
    const { estiloGlobal } = useEstiloGlobal();

    const navigation = useNavigation();
    const modalRef = useRef<RBSheet>(null);

    const { alterarTema, temaAtivo } = useTemaContext();

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
                <Texto style={estiloGlobal.texto}>Deseja mesmo sair da sua conta?</Texto>
            </Modal>
            <View style={estilos.cabecalho}>
                <Texto peso="800ExtraBold" style={estiloGlobal.titulo}>Menu</Texto>
                <View style={estilos.usuario}>
                    <Texto peso="900Black" style={[estiloGlobal.subtitulo, estilos.usuarioIcone]}>NC</Texto>
                    <View>
                        <Texto peso="700Bold" style={estiloGlobal.subtitulo}>Nicholas Campanelli</Texto>
                        <Texto style={estiloGlobal.observacao}>nicholasoucampanelli@hotmail.com</Texto>
                    </View>
                </View>
            </View>
            <View style={estilos.opcoes}>
                <TouchableOpacity style={estilos.opcao}>
                    <Feather name="user" style={estilos.opcaoIcone} />
                    <Texto peso="700Bold" style={estilos.opcaoTexto}>Conta</Texto>
                </TouchableOpacity>
                <TouchableOpacity style={estilos.opcao}>
                    <Feather name="bell" style={estilos.opcaoIcone} />
                    <Texto peso="700Bold" style={estilos.opcaoTexto}>Notificações</Texto>
                </TouchableOpacity>
                <TouchableOpacity style={estilos.opcao}>
                    <Feather name="info" style={estilos.opcaoIcone} />
                    <Texto peso="700Bold" style={estilos.opcaoTexto}>Sobre</Texto>
                </TouchableOpacity>
                <TouchableOpacity style={estilos.opcao} onPress={() => alterarTema()}>
                    <Feather name={temaAtivo === "claro" ? "moon" : "sun"} style={estilos.opcaoIcone} />
                    <Texto peso="700Bold" style={estilos.opcaoTexto}>Alternar tema</Texto>
                </TouchableOpacity>
                <TouchableOpacity style={estilos.opcao} onPress={() => modalRef.current?.open()}>
                    <Feather name="log-out" style={estilos.opcaoIconeVermelho} />
                    <Texto peso="700Bold" style={estilos.opcaoTextoVermelho}>Sair</Texto>
                </TouchableOpacity>
            </View>
        </View>
    );
}