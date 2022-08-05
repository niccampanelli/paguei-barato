import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Text, View } from "react-native";
import variaveisEstilo from "../../../variaveisEstilo";

export default function Inicio() {

    const navigation = useNavigation();

    useEffect(() => {
        navigation.addListener('beforeRemove', e => {
            e.preventDefault();
        });
    }, []);

    return (
        <View>
            <StatusBar style="dark" backgroundColor={variaveisEstilo.cores.fundoPrincipal} hidden={false}/>
            <Text>Olá mundo</Text>
        </View>
    );
}