import Providers from '@/components/Providers';
import {
	Nunito_300Light,
	Nunito_400Regular,
	Nunito_700Bold,
	Nunito_800ExtraBold,
	Nunito_900Black,
} from '@expo-google-fonts/nunito';
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
		<Providers>
			<Stack
				screenOptions={{
					headerShown: false,
					contentStyle: {
						backgroundColor: "transparent",
					},
					animation: "slide_from_right",
				}}
			>
				<Stack.Screen name="(desprotegidas)" />
				<Stack.Screen name="(protegidas)" />
				<Stack.Screen name="+not-found" />
			</Stack>
			<StatusBar style='dark' />
		</Providers>
	);
}
