import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import variaveisEstilo from "../../../variaveisEstilo";

export default function Inicio() {

    return (
        <View>
            <StatusBar style="dark" backgroundColor={variaveisEstilo.cores.fundoPrincipal} hidden={false}/>
            <Text>Olá mundo</Text>
        </View>
    );
}