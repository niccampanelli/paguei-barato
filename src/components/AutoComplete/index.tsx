import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { View, TouchableOpacity, FlatList } from "react-native";
import AutocompleteProps from "../../interfaces/components/AutocompleteProps";
import Input from "../Input";
import { useEstiloGlobal } from "../../estiloGlobal";
import buscaObjeto from "../../util/buscaObjeto";
import Texto from "../Texto";

export default function AutoComplete<TipoItem>({
    dados,
    icone,
    alturaLista,
    aoSelecionar,
    extrairChave,
    onSubmitEditing,
    ...props
}: AutocompleteProps<TipoItem>) {

    const { estiloGlobal } = useEstiloGlobal();
    const [valorInput, setValorInput] = useState<string>("");
    const [mostrarLista, setMostrarLista] = useState<boolean>(false);
    const [correspondencias, setCorrespondencias] = useState<TipoItem[]>([]);

    const aoModificarInput = (texto: string) => {        
        setValorInput(texto);
        let valores = [];
        
        if (texto !== "")
            valores = buscaObjeto.corresponder(dados, texto, extrairChave);
        
        setCorrespondencias(valores);
    };

    const selecionarItem = (valor: TipoItem) => {
        setValorInput(extrairChave(valor));
        aoSelecionar(valor);
        setMostrarLista(false);
    };

    const ItemLista = ({ item }: any) => {
        return (
            <TouchableOpacity style={estiloGlobal.autocompleteListaItem} onPress={() => selecionarItem(item)}>
                <Texto style={estiloGlobal.autocompleteListaItemTexto}>{extrairChave(item)}</Texto>
            </TouchableOpacity>
        );
    };

    const ListaVazia = () => {

        return (
            <View style={estiloGlobal.autocompleteListaItem}>
                <Texto style={estiloGlobal.autocompleteListaItemTexto}>
                    {valorInput.length > 0 ? "Nenhum resultado encontrado" : "Escreva para buscar"}
                </Texto>
            </View>
        );
    }

    return (
        <View style={estiloGlobal.autocomplete}>
            <Input
                icone={<Feather name={icone} style={estiloGlobal.inputIcone} />}
                value={valorInput}
                onChangeText={aoModificarInput}
                onSubmitEditing={(e) => {
                    if (correspondencias.length > 0)
                        selecionarItem(correspondencias[0]);
                    onSubmitEditing?.(e);
                    setMostrarLista(false);
                }}
                onFocus={() => setMostrarLista(true)}
                {...props}
            />
            {mostrarLista &&
                <FlatList
                    data={correspondencias}
                    nestedScrollEnabled
                    style={[
                        estiloGlobal.autocompleteLista,
                        { maxHeight: alturaLista ?? 200 }
                    ]}
                    renderItem={(props) => <ItemLista {...props} />}
                    ListEmptyComponent={ListaVazia}
                />
            }
        </View>
    );
}