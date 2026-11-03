import { useAppDispatch } from "@/hooks/store";
import { configurarSessao, definirAccessToken } from "@/services/authSession";
import { limparSessao } from "@/services/authStorage";
import { fazerLogout } from "@/store/usuario/usuarioSlice";
import { renovarSessao, restaurarSessao } from "@/store/usuario/usuarioThunks";
import { useEffect } from "react";

export default function AuthInitializer() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        configurarSessao(
            async () => dispatch(renovarSessao()).unwrap().then((sessao) => sessao?.token ?? null),
            async () => {
                definirAccessToken(null);
                dispatch(fazerLogout());
                await limparSessao();
            },
        );

        dispatch(restaurarSessao());

        return () => configurarSessao(async () => null, async () => undefined);
    }, [dispatch]);

    return null;
}
