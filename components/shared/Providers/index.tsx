import { store } from '@/store';
import { ProvidersProps } from '@/types/components/shared';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import AlertaProvider from './AlertaProvider';
import AuthProvider from './AuthProvider';

export default function Providers({
    children
}: ProvidersProps) {

    return (
        <SafeAreaProvider>
            <Provider store={store}>
                <ThemeProvider value={DefaultTheme}>
                    <AuthProvider>
                        <AlertaProvider>
                            {children}
                        </AlertaProvider>
                    </AuthProvider>
                </ThemeProvider>
            </Provider>
        </SafeAreaProvider>
    )
}