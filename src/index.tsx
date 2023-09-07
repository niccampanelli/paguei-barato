import NotificacaoToast from "./components/NotificacaoToast";
import StackExterna from "./StackExterna";
import AuthProvider from "./util/context/providers/authProvider";
import CacheProvider from "./util/context/providers/cacheProvider";
import ListaProvider from "./util/context/providers/listaProvider";
import NotificacaoProvider from "./util/context/providers/notificacaoProvider";
import TemaProvider from "./util/context/providers/temaProvider";

export default function AppIndex() {
    return (
        <TemaProvider>
            <NotificacaoProvider tempoDispensar={5000}>
                <AuthProvider>
                    <CacheProvider>
                        <ListaProvider>
                            <StackExterna />
                            <NotificacaoToast />
                        </ListaProvider>
                    </CacheProvider>
                </AuthProvider>
            </NotificacaoProvider>
        </TemaProvider>
    );
}