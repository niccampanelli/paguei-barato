import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { FlatList, Image, ListRenderItemInfo, ScrollView,  TextInput, TouchableOpacity, useWindowDimensions, View } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { useEstiloGlobal } from "../../../estiloGlobal";
import Modal from "../../Modal";
import { useTemaContext } from "../../../util/context/providers/temaProvider";
import { useEstilos } from "./styles";
import Texto from "../../Texto";

export default function Busca() {

    const { estilos } = useEstilos();
    const { estiloGlobal } = useEstiloGlobal();

    const navigation = useNavigation();
    const modalRef = useRef<RBSheet>(null);
    const { propriedadesTema } = useTemaContext();

    const dimensoesTela = useWindowDimensions();
    const [alturaModal, setAlturaModal] = useState(0);

    const [modalAtual, setModalAtual] = useState<"filtrar" | "ordenar">("filtrar");

    useEffect(() => {
        setAlturaModal(dimensoesTela.height*0.65);
    }, [dimensoesTela]);

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

    const ModalFiltrar = () => {

        return (
            <ScrollView showsVerticalScrollIndicator={false} overScrollMode={"never"} style={estilos.modalScrollview} contentContainerStyle={estilos.modalScrollContent}>
                <TouchableOpacity style={[estiloGlobal.tagPequenaSecundaria, estilos.modalOpcao]}>
                    <Texto style={estiloGlobal.tagPequenaSecundariaTexto}>Sem filtros</Texto>
                </TouchableOpacity>
                <View style={estilos.modalSecao}>
                    <Texto peso="700Bold" style={[estiloGlobal.subtitulo, estilos.modalSubtitulo]}>Marca</Texto>
                    <View style={estilos.modalOpcoes}>
                        <TouchableOpacity style={[estiloGlobal.tagPequenaNormal, estilos.modalOpcao]}>
                            <Texto style={estiloGlobal.tagPequenaNormalTexto}>ÉBomMesmo</Texto>
                        </TouchableOpacity>
                        <TouchableOpacity style={[estiloGlobal.tagPequenaNormal, estilos.modalOpcao]}>
                            <Texto style={estiloGlobal.tagPequenaNormalTexto}>Ipê</Texto>
                        </TouchableOpacity>
                        <TouchableOpacity style={[estiloGlobal.tagPequenaNormal, estilos.modalOpcao]}>
                            <Texto style={estiloGlobal.tagPequenaNormalTexto}>Qualidade</Texto>
                        </TouchableOpacity>
                        <TouchableOpacity style={[estiloGlobal.tagPequenaNormal, estilos.modalOpcao]}>
                            <Texto style={estiloGlobal.tagPequenaNormalTexto}>Escute</Texto>
                        </TouchableOpacity>
                        <TouchableOpacity style={[estiloGlobal.tagPequenaNormal, estilos.modalOpcao]}>
                            <Texto style={estiloGlobal.tagPequenaNormalTexto}>Age+</Texto>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={estilos.modalSecao}>
                    <Texto peso="700Bold" style={[estiloGlobal.subtitulo, estilos.modalSubtitulo]}>Tamanho</Texto>
                    <View style={estilos.modalOpcoes}>
                        <TouchableOpacity style={[estiloGlobal.tagPequenaNormal, estilos.modalOpcao]}>
                            <Texto style={estiloGlobal.tagPequenaNormalTexto}>250g</Texto>
                        </TouchableOpacity>
                        <TouchableOpacity style={[estiloGlobal.tagPequenaNormal, estilos.modalOpcao]}>
                            <Texto style={estiloGlobal.tagPequenaNormalTexto}>500ml</Texto>
                        </TouchableOpacity>
                        <TouchableOpacity style={[estiloGlobal.tagPequenaNormal, estilos.modalOpcao]}>
                            <Texto style={estiloGlobal.tagPequenaNormalTexto}>1L</Texto>
                        </TouchableOpacity>
                        <TouchableOpacity style={[estiloGlobal.tagPequenaNormal, estilos.modalOpcao]}>
                            <Texto style={estiloGlobal.tagPequenaNormalTexto}>100g</Texto>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={estilos.modalSecao}>
                    <Texto peso="700Bold" style={[estiloGlobal.subtitulo, estilos.modalSubtitulo]}>Mercado</Texto>
                    <View style={estilos.modalOpcoes}>
                        <TouchableOpacity style={[estiloGlobal.tagPequenaNormal, estilos.modalOpcao]}>
                            <Texto style={estiloGlobal.tagPequenaNormalTexto}>Kawahara Supermercado LTDA</Texto>
                        </TouchableOpacity>
                        <TouchableOpacity style={[estiloGlobal.tagPequenaNormal, estilos.modalOpcao]}>
                            <Texto style={estiloGlobal.tagPequenaNormalTexto}>Extra Minimercado Doutor Campos Moura</Texto>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        );
    };

    const ModalOrdenar = () => {

        return (
            <ScrollView showsVerticalScrollIndicator={false} overScrollMode={"never"} style={estilos.modalScrollview} contentContainerStyle={estilos.modalScrollContent}>
                <TouchableOpacity style={[estiloGlobal.tagPequenaSecundaria, estilos.modalOpcao]}>
                    <Texto style={estiloGlobal.tagPequenaSecundariaTexto}>Não ordenar</Texto>
                </TouchableOpacity>
                <View style={estilos.modalSecao}>
                    <Texto peso="700Bold" style={[estiloGlobal.subtitulo, estilos.modalSubtitulo]}>Nome</Texto>
                    <View style={estilos.modalOpcoes}>
                        <TouchableOpacity style={[estiloGlobal.tagPequenaSecundaria, estilos.modalOpcao]}>
                            <Texto style={estiloGlobal.tagPequenaSecundariaTexto}>Alfabética crescente</Texto>
                        </TouchableOpacity>
                        <TouchableOpacity style={[estiloGlobal.tagPequenaNormal, estilos.modalOpcao]}>
                            <Texto style={estiloGlobal.tagPequenaNormalTexto}>Alfabética decrescente</Texto>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={estilos.modalSecao}>
                    <Texto peso="700Bold" style={[estiloGlobal.subtitulo, estilos.modalSubtitulo]}>Marca</Texto>
                    <View style={estilos.modalOpcoes}>
                        <TouchableOpacity style={[estiloGlobal.tagPequenaNormal, estilos.modalOpcao]}>
                            <Texto style={estiloGlobal.tagPequenaNormalTexto}>Alfabética crescente</Texto>
                        </TouchableOpacity>
                        <TouchableOpacity style={[estiloGlobal.tagPequenaNormal, estilos.modalOpcao]}>
                            <Texto style={estiloGlobal.tagPequenaNormalTexto}>Alfabética decrescente</Texto>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={estilos.modalSecao}>
                    <Texto peso="700Bold" style={[estiloGlobal.subtitulo, estilos.modalSubtitulo]}>Tamanho</Texto>
                    <View style={estilos.modalOpcoes}>
                        <TouchableOpacity style={[estiloGlobal.tagPequenaNormal, estilos.modalOpcao]}>
                            <Texto style={estiloGlobal.tagPequenaNormalTexto}>Maiores primeiro</Texto>
                        </TouchableOpacity>
                        <TouchableOpacity style={[estiloGlobal.tagPequenaNormal, estilos.modalOpcao]}>
                            <Texto style={estiloGlobal.tagPequenaNormalTexto}>Menores primeiro</Texto>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={estilos.modalSecao}>
                    <Texto peso="700Bold" style={[estiloGlobal.subtitulo, estilos.modalSubtitulo]}>Mercado</Texto>
                    <View style={estilos.modalOpcoes}>
                        <TouchableOpacity style={[estiloGlobal.tagPequenaNormal, estilos.modalOpcao]}>
                            <Texto style={estiloGlobal.tagPequenaNormalTexto}>Alfabética crescente</Texto>
                        </TouchableOpacity>
                        <TouchableOpacity style={[estiloGlobal.tagPequenaNormal, estilos.modalOpcao]}>
                            <Texto style={estiloGlobal.tagPequenaNormalTexto}>Alfabética decrescente</Texto>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        );
    };

    const componentesModal = {
        "filtrar": {
            titulo: "Filtrar resultados",
            componente: <ModalFiltrar/>
        },
        "ordenar": {
            titulo: "Ordenar resultados",
            componente: <ModalOrdenar/>
        }
    }

    const abrirModal = (modal: "filtrar" | "ordenar") => {
        setModalAtual(modal);
        modalRef.current?.open();
    }

    const ItemLista = ({item}: ListRenderItemInfo<any>) => {

        return (
            <TouchableOpacity style={estilos.listaItem}>
                <Image style={estilos.listaItemImagem} source={item.imagem}/>
                <Texto peso="700Bold" style={estilos.listaItemTexto} numberOfLines={1}>{item.nome}</Texto>
            </TouchableOpacity>
        );
    };
    
    return (
        <View style={estilos.container}>
            <Modal 
                titulo={componentesModal[modalAtual].titulo}
                refSheet={modalRef}
                height={alturaModal}
            >
                { componentesModal[modalAtual].componente }
            </Modal>
            <View style={estilos.cabecalho}>
                <Texto peso="800ExtraBold" style={estiloGlobal.titulo}>Buscar</Texto>
                <View style={estilos.barraBusca}>
                    <TextInput placeholderTextColor={propriedadesTema.cores.textoClaro} style={estilos.barraBuscaCampo} placeholder="Escreva aqui sua pesquisa..."/>
                    <Feather style={estilos.barraBuscaIcone} name="search"/>
                </View>
                <ScrollView showsHorizontalScrollIndicator={false} horizontal style={estilos.listaFiltros}>
                    <TouchableOpacity onPress={() => abrirModal("filtrar")} style={[estiloGlobal.tagPequenaDestaque, estilos.filtro]}>
                        <Texto peso="700Bold" style={estiloGlobal.tagPequenaDestaqueTexto}>Filtros</Texto>
                        <Texto peso="700Bold" style={estilos.filtroContador}>2</Texto>
                    </TouchableOpacity>
                    <View style={[estiloGlobal.tagPequenaSecundaria, estilos.filtro]}>
                        <Texto style={estiloGlobal.tagPequenaSecundariaTexto}>Opção</Texto>
                    </View>
                    <View style={[estiloGlobal.tagPequenaSecundaria, estilos.filtro]}>
                        <Texto style={estiloGlobal.tagPequenaSecundariaTexto}>Opção</Texto>
                    </View>
                    <View style={[estiloGlobal.tagPequenaSecundaria, estilos.filtro]}>
                        <Texto style={estiloGlobal.tagPequenaSecundariaTexto}>Opção</Texto>
                    </View>
                    <View style={[estiloGlobal.tagPequenaSecundaria, estilos.filtro]}>
                        <Texto style={estiloGlobal.tagPequenaSecundariaTexto}>Opção</Texto>
                    </View>
                    <View style={[estiloGlobal.tagPequenaSecundaria, estilos.filtro]}>
                        <Texto style={estiloGlobal.tagPequenaSecundariaTexto}>Opção</Texto>
                    </View>
                    <View style={[estiloGlobal.tagPequenaSecundaria, estilos.filtro]}>
                        <Texto style={estiloGlobal.tagPequenaSecundariaTexto}>Opção</Texto>
                    </View>
                    <View style={[estiloGlobal.tagPequenaSecundaria, estilos.filtro]}>
                        <Texto style={estiloGlobal.tagPequenaSecundariaTexto}>Opção</Texto>
                    </View>
                </ScrollView>
            </View>
            <View style={estilos.listaCabecalho}>
                <Texto peso="700Bold" style={estiloGlobal.subtitulo}>3 Resultados</Texto>
                <TouchableOpacity onPress={() => abrirModal("ordenar")} style={estiloGlobal.tagPequenaNormal}>
                    <Texto style={estiloGlobal.tagPequenaNormalTexto}>Ordenar</Texto>
                    <Feather name="bar-chart" style={estiloGlobal.tagPequenaNormalTexto}/>
                </TouchableOpacity>
            </View>
            <FlatList style={estilos.lista} data={dummydata} renderItem={ItemLista}/>
        </View>
    );
}