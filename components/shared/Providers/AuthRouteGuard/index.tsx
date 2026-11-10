import { useAppSelector } from "@/hooks/store";
import { selectUsuario } from "@/store/usuario/usuarioSlice";
import { Redirect, useSegments } from "expo-router";
import { ReactNode } from "react";

interface AuthRouteGuardProps {
    children: ReactNode;
}

export default function AuthRouteGuard({ children }: AuthRouteGuardProps) {
    const usuario = useAppSelector(selectUsuario);
    const segmentos = useSegments();
    const estaEmRotaDesprotegida = segmentos[0] === "(desprotegidas)";

    if (usuario.status === "carregando")
        return null;

    if (usuario.status === "autenticado" && estaEmRotaDesprotegida)
        return <Redirect href="/(protegidas)/(abas)/inicio" />;

    return <>{children}</>;
}
