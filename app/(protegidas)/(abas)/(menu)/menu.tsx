import Avatar from "@/components/Avatar";
import Caixa from "@/components/Caixa";
import CaixaScroll from "@/components/Caixa/CaixaScroll";
import Texto from "@/components/Texto";
import { tema } from "@/constants/tema";
import { obterIniciais } from "@/helpers/usuario";
import { useAppSelector } from "@/hooks/store";
import { selectUsuario } from "@/store/slices/usuario";
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface ItemMenu {
    icone: keyof typeof Feather.glyphMap;
    nome: string;
    aoPressionar: () => void;
}

export default function Menu() {

    const router = useRouter();

    const usuario = useAppSelector(selectUsuario);

    const menus: ItemMenu[] = [
        {
            icone: "user",
            nome: "Conta",
            aoPressionar: () => router.navigate("/usuario")
        },
        {
            icone: "info",
            nome: "Sobre",
            aoPressionar: () => router.navigate("/sobre")
        },
        {
            icone: "moon",
            nome: "Tema escuro",
            aoPressionar: () => router.navigate("/sobre")
        },
        {
            icone: "log-out",
            nome: "Sair",
            aoPressionar: () => router.navigate("/login")
        },
    ];

    return (
        <View>
            <Caixa tamanho="grande">
                <Texto variante="titulo">
                    Menu
                </Texto>
            </Caixa>
            <CaixaScroll
                tamanho="grande"
                contentContainerStyle={estilos.conteudo}
            >
                <View style={estilos.identificacao}>
                    <Avatar>
                        {obterIniciais(usuario.nome, usuario.sobrenome)}
                    </Avatar>
                    <View>
                        <Texto variante="subtitulo">
                            {usuario.nomeCompleto}
                        </Texto>
                        <Texto variante="legenda">
                            {usuario.email}
                        </Texto>
                    </View>
                </View>
                <View style={estilos.lista}>
                    {
                        menus.map((menu, i) => (
                            <TouchableOpacity
                                key={i}
                                style={estilos.item}
                                onPress={menu.aoPressionar}
                            >
                                <Feather
                                    name={menu.icone}
                                    size={tema.texto.tamanhos.subtitulo}
                                />
                                <Texto variante="subtitulo">
                                    {menu.nome}
                                </Texto>
                            </TouchableOpacity>
                        ))
                    }
                </View>
            </CaixaScroll>
        </View>
    )
}

const estilos = StyleSheet.create({
    conteudo: {
        paddingTop: 0,
        rowGap: tema.layout.espacamentos.grande,
    },
    identificacao: {
        flexDirection: "row",
        columnGap: tema.layout.espacamentos.medio,
        alignItems: "center",
    },
    lista: {
        rowGap: tema.layout.espacamentos.grande,
    },
    item: {
        flexDirection: "row",
        columnGap: tema.layout.espacamentos.medio,
        alignItems: "center",
    }
});