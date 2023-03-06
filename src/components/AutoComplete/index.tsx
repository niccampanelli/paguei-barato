import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import AutocompleteProps from "../../interfaces/components/AutocompleteProps";
import Input from "../Input";
import { useEstiloGlobal } from "../../estiloGlobal";
import buscaObjeto from "../../services/buscaObjeto";
import Texto from "../Texto";

export default function AutoComplete({
    dados,
    icone,
    alturaLista,
    onChangeText,
    ...props
}: AutocompleteProps) {

    const { estiloGlobal } = useEstiloGlobal();
    const [valorInput, setValorInput] = useState("");
    const [valorSelecionado, setValorSelecionado] = useState("");
    const [correspondencias, setCorrespondencias] = useState<string[]>(dados);

    const aoModificarInput = (texto: string) => {
        setValorInput(texto);
        let valores = buscaObjeto.corresponder(dados, texto);
        setCorrespondencias(valores);
    };

    const selecionarItem = (valor: string) => {
        setCorrespondencias(dados);
        setValorInput(valor);
        setValorSelecionado(valor);
    };

    const ItemLista = ({ item }: any) => {
        return (
            <TouchableOpacity style={estiloGlobal.autocompleteListaItem} onPress={() => selecionarItem(item)}>
                <Texto style={estiloGlobal.autocompleteListaItemTexto}>{item}</Texto>
            </TouchableOpacity>
        );
    };

    const ListaVazia = () => {
        
        return (
            <View style={estiloGlobal.autocompleteListaItem}>
                <Texto style={estiloGlobal.autocompleteListaItemTexto}>Nenhum resultado encontrado.</Texto>
            </View>
        );
    }

    return (
        <View style={estiloGlobal.autocomplete}>
            <Input icone={<Feather name={icone} style={estiloGlobal.inputIcone} />} value={valorInput} onChangeText={t => {aoModificarInput(t); onChangeText?.(t)}} {...props} />
            { valorSelecionado === valorInput ? null :
                <FlatList data={correspondencias} nestedScrollEnabled style={[estiloGlobal.autocompleteLista, { maxHeight: alturaLista ?? 200 }]} renderItem={(props) => <ItemLista {...props} />} ListEmptyComponent={ListaVazia} />
            }
        </View>
    );
}