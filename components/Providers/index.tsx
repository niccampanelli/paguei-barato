import { ProvidersProps } from '@/types/components/Providers';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function Providers({
    children
}: ProvidersProps) {

    return (
        <SafeAreaProvider>
            <ThemeProvider value={DefaultTheme}>
                {children}
            </ThemeProvider>
        </SafeAreaProvider>
    )
}