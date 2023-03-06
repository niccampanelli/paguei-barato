import { Text } from "react-native";
import TextoProps from "../../interfaces/components/TextoProps";

export default function Texto({
    style,
    children,
    peso = "400Regular",
    italico,
    ...props
}: TextoProps) {

    let fontStyle = `Nunito_${peso}${italico ? "_Italic" : ""}`;

    return (
        <Text
            style={
                Array.isArray(style) ? 
                    Object.assign({}, ...style, { fontFamily: fontStyle })
                    : 
                    Object.assign({}, style, { fontFamily: fontStyle })
            }
            {...props}
        >
            {children}
        </Text>
    );
}