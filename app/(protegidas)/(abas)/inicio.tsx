import CaixaScroll from "@/components/Caixa/CaixaScroll";
import Logo from "@/components/Logo";
import Texto from "@/components/Texto";
import { tema } from "@/constants/tema";
import { StyleSheet } from "react-native";

export default function Inicio() {

    return (
        <CaixaScroll
            tamanho="grande"
            contentContainerStyle={estilos.container}
        >
            <Logo />
            <Texto variante="titulo">
                Boa noite, Nicholas!
            </Texto>
        </CaixaScroll>
    )
}

const estilos = StyleSheet.create({
    container: {
        flex: 1,
        rowGap: tema.layout.espacamentos.grande,
    }
});