import 'react-native-gesture-handler';
import 'intl';
import 'intl/locale-data/jsonp/en';
import AppIndex from "./src";
import { useFonts,
	Nunito_400Regular, 
	Nunito_400Regular_Italic, 
	Nunito_600SemiBold, 
	Nunito_600SemiBold_Italic,
	Nunito_700Bold, 
	Nunito_700Bold_Italic, 
	Nunito_800ExtraBold, 
	Nunito_800ExtraBold_Italic, 
	Nunito_900Black, 
	Nunito_900Black_Italic
} from '@expo-google-fonts/nunito';
global.Buffer = require('buffer').Buffer;

/**
 * # PagueiBarato
 * Aplicativo para facilitar comparações de preços em varejos.
 * 
 * Made with ❤ in 🇧🇷
 * @author Nicholas Campanelli, Lucas Campanelli
 */
export default function App() {
	
	let [fontsLoaded] = useFonts({
		Nunito_400Regular, 
		Nunito_400Regular_Italic, 
		Nunito_600SemiBold, 
		Nunito_600SemiBold_Italic,
		Nunito_700Bold, 
		Nunito_700Bold_Italic, 
		Nunito_800ExtraBold, 
		Nunito_800ExtraBold_Italic, 
		Nunito_900Black, 
		Nunito_900Black_Italic
	});

	if (!fontsLoaded) {
		return null;
	}

	return (
		<AppIndex />
	);
}
