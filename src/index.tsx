import NotificacaoToast from "./components/NotificacaoToast";
import StackExterna from "./StackExterna";
import NotificacaoProvider from "./util/context/providers/notificacaoProvider";
import TemaProvider from "./util/context/providers/temaProvider";

export default function AppIndex() {
    return (
        <TemaProvider>
            <NotificacaoProvider>
                <StackExterna />
                <NotificacaoToast />
            </NotificacaoProvider>
        </TemaProvider>
    );
}