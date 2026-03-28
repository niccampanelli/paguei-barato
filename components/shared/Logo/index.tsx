import { LogoProps } from "@/types/components/shared";
import { Image } from "react-native";

export default function Logo({
    largura = 200,
    style,
    ...resto
}: LogoProps) {

    return (
        <Image
            source={require("../../assets/images/app/logo.png")}
            resizeMode="contain"
            width={largura}
            style={[
                {
                    width: largura,
                    height: undefined,
                    aspectRatio: 463 / 63,
                },
                style
            ]}
            {...resto}
        />
    );
}