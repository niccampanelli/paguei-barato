import { useState } from "react";
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
import authServices from "../../../services/authServices";
import CarregandoOverlay from "../../CarregandoOverlay";
import { useAuthContext } from "../../../util/context/providers/authProvider";
import Formatador from "../../../util/Formatador";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { NavegacaoAppRoutesParams } from "../NavegacaoApp";

type MenuProps = BottomTabScreenProps<NavegacaoAppRoutesParams, "menu">;

export default function Menu({ navigation, route }: MenuProps) {

    const { estilos } = useEstilos();
    const { estiloGlobal } = useEstiloGlobal();
    const { usuarioLogado, fazerLogout } = useAuthContext();

    const modalRef = useRef<RBSheet>(null);

    const [carregando, setCarregando] = useState<boolean>(false);

    const { alterarTema, temaAtivo } = useTemaContext();

    const sair = async () => {
        modalRef.current?.close();

        setCarregando(true);
        fazerLogout();

        setCarregando(false);

        navigation.getParent()?.navigate("login");
        navigation.getParent()?.reset({
            index: 0,
            routes: [{ name: "login" }],
        });
    };

    return (
        <View style={estilos.container}>
            {carregando && <CarregandoOverlay />}
            {usuarioLogado &&
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
            }
            <View style={estilos.cabecalho}>
                <Texto peso="800ExtraBold" style={estiloGlobal.titulo}>Menu</Texto>
                <TouchableOpacity
                    style={estilos.usuario}
                    onPress={
                        usuarioLogado ?
                            () => navigation.getParent()?.navigate("menuUsuario", { usuario: usuarioLogado })
                            :
                            () => {
                                fazerLogout();
                                navigation.getParent()?.navigate("login");
                            }
                    }
                >
                    <Texto peso="900Black" style={[estiloGlobal.subtitulo, estilos.usuarioIcone]}>
                        {usuarioLogado ?
                            Formatador.obterIniciaisNome(usuarioLogado.nome)
                            :
                            "?"
                        }
                    </Texto>
                    <View>
                        <Texto peso="700Bold" style={estiloGlobal.subtitulo}>
                            {usuarioLogado ? usuarioLogado.nome : "Fazer login"}
                        </Texto>
                        <Texto style={estiloGlobal.observacao}>
                            {usuarioLogado ? usuarioLogado.email : "Faça login para usar todas as funções do app."}
                        </Texto>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={estilos.opcoes}>
                {usuarioLogado &&
                    <TouchableOpacity onPress={() => navigation.getParent()?.navigate("menuUsuario", { usuario: usuarioLogado })} style={estilos.opcao}>
                        <Feather name="user" style={estilos.opcaoIcone} />
                        <Texto peso="700Bold" style={estilos.opcaoTexto}>Conta</Texto>
                    </TouchableOpacity>
                }
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
                {usuarioLogado &&
                    <TouchableOpacity style={estilos.opcao} onPress={() => modalRef.current?.open()}>
                        <Feather name="log-out" style={estilos.opcaoIconeVermelho} />
                        <Texto peso="700Bold" style={estilos.opcaoTextoVermelho}>Sair</Texto>
                    </TouchableOpacity>
                }
            </View>
        </View>
    );
}