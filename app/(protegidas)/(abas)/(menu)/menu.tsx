import { Avatar, Caixa, CaixaScroll, Texto } from "@/components/shared";
import { tema } from "@/constants/tema";
import { obterIniciais } from "@/helpers/usuario";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { fazerLogout, selectUsuario } from "@/store/usuario/usuarioSlice";
import { ItemMenu } from "@/types/app/protegidas/abas/menu/menu";
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export default function Menu() {

    const router = useRouter();
    
    const dispatch = useAppDispatch();

    const usuario = useAppSelector(selectUsuario);

    function sair() {
        dispatch(fazerLogout());
        router.navigate("/(desprotegidas)/login");
    }

    const menus: ItemMenu[] = [
        {
            icone: "user",
            nome: "Informações da sua conta",
            aoPressionar: () => router.navigate("/usuario"),
            itemMenuLogado: "logado"
        },
        {
            icone: "info",
            nome: "Sobre o aplicativo",
            aoPressionar: () => router.navigate("/sobre"),
            itemMenuLogado: "ambos"
        },
        {
            icone: "moon",
            nome: "Tema escuro",
            aoPressionar: () => router.navigate("/sobre"),
            itemMenuLogado: "ambos"
        },
        {
            icone: "log-out",
            nome: "Sair",
            aoPressionar: sair,
            itemMenuLogado: "logado"
        },
        {
            icone: "log-in",
            nome: "Entrar com sua conta",
            aoPressionar: () => router.navigate("/(desprotegidas)/login"),
            itemMenuLogado: "deslogado"
        }
    ];
    
    function obterMenusFiltrados(logado: boolean) {
        return menus.filter(menu => {
            if (menu.itemMenuLogado === "ambos")
                return true;
            if (logado)
                return menu.itemMenuLogado === "logado";
            else
                return menu.itemMenuLogado === "deslogado";
        });
    }

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
                        obterMenusFiltrados(usuario.logado).map((menu, i) => (
                            <TouchableOpacity
                                key={i}
                                style={estilos.item}
                                onPress={menu.aoPressionar}
                            >
                                <Feather
                                    name={menu.icone}
                                    size={tema.texto.tamanhos.subtitulo}
                                />
                                <Texto variante="subtitulo" style={{ flex: 1 }}>
                                    {menu.nome}
                                </Texto>
                                <Feather
                                    name="chevron-right"
                                    size={tema.texto.tamanhos.subtitulo}
                                />
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