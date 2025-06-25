import { LogoProps } from "@/types/components/Logo";
import { Image } from "react-native";

export default function Logo({
    ...resto
}: LogoProps) {

    return (
        <Image
            source={require("../../assets/images/app/logo.png")}
            {...resto}
        />
    );
}