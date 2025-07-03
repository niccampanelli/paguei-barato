import { store } from '@/store';
import { ProvidersProps } from '@/types/components/Providers';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

export default function Providers({
    children
}: ProvidersProps) {

    return (
        <SafeAreaProvider>
            <Provider store={store}>
                <ThemeProvider value={DefaultTheme}>
                    {children}
                </ThemeProvider>
            </Provider>
        </SafeAreaProvider>
    )
}