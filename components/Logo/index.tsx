import { LogoProps } from "@/types/components/Logo";
import { Image } from "react-native";

export default function Logo({
    largura = 200,
    ...resto
}: LogoProps) {

    return (
        <Image
            source={require("../../assets/images/app/logo.png")}
            resizeMode="contain"
            width={largura}
            style={{
                width: largura,
                height: undefined,
                aspectRatio: 463/63,
                ...[resto.style]
            }}
            {...resto}
        />
    );
}