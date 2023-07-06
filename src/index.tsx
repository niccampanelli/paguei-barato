import NotificacaoToast from "./components/NotificacaoToast";
import StackExterna from "./StackExterna";
import CacheProvider from "./util/context/providers/cacheProvider";
import NotificacaoProvider from "./util/context/providers/notificacaoProvider";
import TemaProvider from "./util/context/providers/temaProvider";

export default function AppIndex() {
    return (
        <TemaProvider>
            <NotificacaoProvider tempoDispensar={2000}>
                <CacheProvider>
                    <StackExterna />
                    <NotificacaoToast />
                </CacheProvider>
            </NotificacaoProvider>
        </TemaProvider>
    );
}