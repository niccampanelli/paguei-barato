import { useNotificacaoToast } from "../../util/context/providers/notificacaoProvider";
import { View } from "react-native";
import Toast from "../Toast";

export default function NotificacaoToast() {
    const { notificacoes } = useNotificacaoToast();
    
    return (
    <View style={{ position: "absolute", display: "flex", flex: 1, flexDirection: "column-reverse", top: 0, bottom: 0, right: 0, left: 0 }}>
        { notificacoes.map((notificacao, index) => (
            <Toast key={index} {...notificacao} />
        ))}
    </View>
    );
}