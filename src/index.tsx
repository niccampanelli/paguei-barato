import NotificacaoToast from "./components/NotificacaoToast";
import StackExterna from "./StackExterna";
import NotificacaoProvider from "./util/context/providers/notificacaoProvider";
import { View } from "react-native";

export default function AppIndex() {
    return (
        <NotificacaoProvider>
            <StackExterna />
            <NotificacaoToast />
        </NotificacaoProvider>
    );
}