import { store } from '@/store';
import { ProvidersProps } from '@/types/components/shared';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import AlertaProvider from './AlertaProvider';
import AuthInitializer from './AuthInitializer';
import AuthRouteGuard from './AuthRouteGuard';

export default function Providers({
    children
}: ProvidersProps) {

    return (
        <SafeAreaProvider>
            <Provider store={store}>
                <ThemeProvider value={DefaultTheme}>
                    <>
                        <AuthInitializer />
                        <AuthRouteGuard>
                            <AlertaProvider>{children}</AlertaProvider>
                        </AuthRouteGuard>
                    </>
                </ThemeProvider>
            </Provider>
        </SafeAreaProvider>
    )
}
