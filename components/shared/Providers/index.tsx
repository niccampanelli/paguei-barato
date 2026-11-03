import { store } from '@/store';
import { ProvidersProps } from '@/types/components/shared';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import AlertaProvider from './AlertaProvider';
import AuthInitializer from './AuthInitializer';

export default function Providers({
    children
}: ProvidersProps) {

    return (
        <SafeAreaProvider>
            <Provider store={store}>
                <ThemeProvider value={DefaultTheme}>
                    <>
                        <AuthInitializer />
                        <AlertaProvider>{children}</AlertaProvider>
                    </>
                </ThemeProvider>
            </Provider>
        </SafeAreaProvider>
    )
}
