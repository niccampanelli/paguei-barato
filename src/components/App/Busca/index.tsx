import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { FlatList, Image, ListRenderItemInfo, ScrollView, Text, TextInput, TouchableOpacity, useWindowDimensions, View } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import estiloGlobal from "../../../estiloGlobal";
import Modal from "../../Modal";
import estilos from "./styles";

export default function Busca() {

    const navigation = useNavigation();
    const modalRef = useRef<RBSheet>(null);

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
                    <Text style={estiloGlobal.tagPequenaSecundariaTexto}>Sem filtros</Text>
                </TouchableOpacity>
                <View style={estilos.modalSecao}>
                    <Text style={[estiloGlobal.subtitulo, estilos.modalSubtitulo]}>Marca</Text>
                    <View style={estilos.modalOpcoes}>
                        <TouchableOpacity style={[estiloGlobal.tagPequenaNormal, estilos.modalOpcao]}>
                            <Text style={estiloGlobal.tagPequenaNormalTexto}>ÉBomMesmo</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[estiloGlobal.tagPequenaNormal, estilos.modalOpcao]}>
                            <Text style={estiloGlobal.tagPequenaNormalTexto}>Ipê</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[estiloGlobal.tagPequenaNormal, estilos.modalOpcao]}>
                            <Text style={estiloGlobal.tagPequenaNormalTexto}>Qualidade</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[estiloGlobal.tagPequenaNormal, estilos.modalOpcao]}>
                            <Text style={estiloGlobal.tagPequenaNormalTexto}>Escute</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[estiloGlobal.tagPequenaNormal, estilos.modalOpcao]}>
                            <Text style={estiloGlobal.tagPequenaNormalTexto}>Age+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={estilos.modalSecao}>
                    <Text style={[estiloGlobal.subtitulo, estilos.modalSubtitulo]}>Tamanho</Text>
                    <View style={estilos.modalOpcoes}>
                        <TouchableOpacity style={[estiloGlobal.tagPequenaNormal, estilos.modalOpcao]}>
                            <Text style={estiloGlobal.tagPequenaNormalTexto}>250g</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[estiloGlobal.tagPequenaNormal, estilos.modalOpcao]}>
                            <Text style={estiloGlobal.tagPequenaNormalTexto}>500ml</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[estiloGlobal.tagPequenaNormal, estilos.modalOpcao]}>
                            <Text style={estiloGlobal.tagPequenaNormalTexto}>1L</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[estiloGlobal.tagPequenaNormal, estilos.modalOpcao]}>
                            <Text style={estiloGlobal.tagPequenaNormalTexto}>100g</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={estilos.modalSecao}>
                    <Text style={[estiloGlobal.subtitulo, estilos.modalSubtitulo]}>Mercado</Text>
                    <View style={estilos.modalOpcoes}>
                        <TouchableOpacity style={[estiloGlobal.tagPequenaNormal, estilos.modalOpcao]}>
                            <Text style={estiloGlobal.tagPequenaNormalTexto}>Kawahara Supermercado LTDA</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[estiloGlobal.tagPequenaNormal, estilos.modalOpcao]}>
                            <Text style={estiloGlobal.tagPequenaNormalTexto}>Extra Minimercado Doutor Campos Moura</Text>
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
                    <Text style={estiloGlobal.tagPequenaSecundariaTexto}>Não ordenar</Text>
                </TouchableOpacity>
                <View style={estilos.modalSecao}>
                    <Text style={[estiloGlobal.subtitulo, estilos.modalSubtitulo]}>Nome</Text>
                    <View style={estilos.modalOpcoes}>
                        <TouchableOpacity style={[estiloGlobal.tagPequenaSecundaria, estilos.modalOpcao]}>
                            <Text style={estiloGlobal.tagPequenaSecundariaTexto}>Alfabética crescente</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[estiloGlobal.tagPequenaNormal, estilos.modalOpcao]}>
                            <Text style={estiloGlobal.tagPequenaNormalTexto}>Alfabética decrescente</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={estilos.modalSecao}>
                    <Text style={[estiloGlobal.subtitulo, estilos.modalSubtitulo]}>Marca</Text>
                    <View style={estilos.modalOpcoes}>
                        <TouchableOpacity style={[estiloGlobal.tagPequenaNormal, estilos.modalOpcao]}>
                            <Text style={estiloGlobal.tagPequenaNormalTexto}>Alfabética crescente</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[estiloGlobal.tagPequenaNormal, estilos.modalOpcao]}>
                            <Text style={estiloGlobal.tagPequenaNormalTexto}>Alfabética decrescente</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={estilos.modalSecao}>
                    <Text style={[estiloGlobal.subtitulo, estilos.modalSubtitulo]}>Tamanho</Text>
                    <View style={estilos.modalOpcoes}>
                        <TouchableOpacity style={[estiloGlobal.tagPequenaNormal, estilos.modalOpcao]}>
                            <Text style={estiloGlobal.tagPequenaNormalTexto}>Maiores primeiro</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[estiloGlobal.tagPequenaNormal, estilos.modalOpcao]}>
                            <Text style={estiloGlobal.tagPequenaNormalTexto}>Menores primeiro</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={estilos.modalSecao}>
                    <Text style={[estiloGlobal.subtitulo, estilos.modalSubtitulo]}>Mercado</Text>
                    <View style={estilos.modalOpcoes}>
                        <TouchableOpacity style={[estiloGlobal.tagPequenaNormal, estilos.modalOpcao]}>
                            <Text style={estiloGlobal.tagPequenaNormalTexto}>Alfabética crescente</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[estiloGlobal.tagPequenaNormal, estilos.modalOpcao]}>
                            <Text style={estiloGlobal.tagPequenaNormalTexto}>Alfabética decrescente</Text>
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
                <Text style={estilos.listaItemTexto} numberOfLines={1}>{item.nome}</Text>
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
                <Text style={estiloGlobal.titulo}>Buscar</Text>
                <View style={estilos.barraBusca}>
                    <TextInput style={estilos.barraBuscaCampo} placeholder="Escreva aqui sua pesquisa..."/>
                    <Feather style={estilos.barraBuscaIcone} name="search"/>
                </View>
                <ScrollView showsHorizontalScrollIndicator={false} horizontal style={estilos.listaFiltros}>
                    <TouchableOpacity onPress={() => abrirModal("filtrar")} style={[estiloGlobal.tagPequenaDestaque, estilos.filtro]}>
                        <Text style={estiloGlobal.tagPequenaDestaqueTexto}>Filtros</Text>
                        <Text style={estilos.filtroContador}>2</Text>
                    </TouchableOpacity>
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
                <TouchableOpacity onPress={() => abrirModal("ordenar")} style={estiloGlobal.tagPequenaNormal}>
                    <Text style={estiloGlobal.tagPequenaNormalTexto}>Ordenar</Text>
                    <Feather name="bar-chart"/>
                </TouchableOpacity>
            </View>
            <FlatList style={estilos.lista} data={dummydata} renderItem={ItemLista}/>
        </View>
    );
}