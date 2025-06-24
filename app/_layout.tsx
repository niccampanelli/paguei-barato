import Texto from '@/components/Texto';
import {
	Nunito_300Light,
	Nunito_400Regular,
	Nunito_700Bold,
	Nunito_800ExtraBold,
	Nunito_900Black,
} from '@expo-google-fonts/nunito';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

export default function LayoutGeral() {

	const [loaded] = useFonts({
		Nunito_300Light,
		Nunito_400Regular,
		Nunito_700Bold,
		Nunito_800ExtraBold,
		Nunito_900Black,
	});

	if (!loaded)
		return null;

	return (
		<ThemeProvider value={DefaultTheme}>
			<Texto peso='titulo' tamanho='titulo'>AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA</Texto>
			<Texto peso='subtitulo' tamanho='subtitulo'>AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA</Texto>
			<Texto tamanho='legenda'>AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA</Texto>
			<Texto variante='titulo' >AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA</Texto>
			<Texto variante='titulo' cor='claro'>AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA</Texto>
			<Stack
				screenOptions={{
					headerShown: false,
					contentStyle: { backgroundColor: 'transparent' },
				}}
			>
				<Stack.Screen name="(desprotegidas)" />
				<Stack.Screen name="(protegidas)" />
				<Stack.Screen name="+not-found" />
			</Stack>
			<StatusBar style='auto' />
		</ThemeProvider>
	);
}
