import { useAppDispatch } from "@/hooks/store";
import { configurarSessao, definirAccessToken } from "@/services/authSession";
import { limparSessao } from "@/services/authStorage";
import { fazerLogout } from "@/store/usuario/usuarioSlice";
import { renovarSessao, restaurarSessao } from "@/store/usuario/usuarioThunks";
import { useEffect, useRef } from "react";

let inicializacaoExecutada = false;

export default function AuthInitializer() {
    const dispatch = useAppDispatch();
    const inicializado = useRef(false);

    useEffect(() => {
        if (inicializado.current || inicializacaoExecutada)
            return;

        inicializado.current = true;
        inicializacaoExecutada = true;
        configurarSessao(
            async () => dispatch(renovarSessao()).unwrap().then((sessao) => sessao?.token ?? null),
            async () => {
                definirAccessToken(null);
                dispatch(fazerLogout());
                await limparSessao();
            },
        );

        dispatch(restaurarSessao());

    }, [dispatch]);

    return null;
}
