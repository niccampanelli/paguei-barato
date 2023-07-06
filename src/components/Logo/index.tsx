import { Image } from "react-native";
import LogoProps from "../../interfaces/components/LogoProps";
import { useTemaContext } from "../../util/context/providers/temaProvider";

export default function Logo({
    style,
    tema,
    ...props
}: LogoProps) {

    const { temaAtivo } = useTemaContext();

    const logoTemaClaro = require("../../../assets/logo.png");
    const logoTemaEscuro = require("../../../assets/logo-white.png");

    return (
        <Image
            style={style}
            resizeMode="contain"
            source={
                temaAtivo === "claro" ?
                    logoTemaClaro
                    :
                    logoTemaEscuro
            }
            {...props}
        />
    );
}