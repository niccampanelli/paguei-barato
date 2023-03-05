import { createContext, useContext, useEffect, useState } from "react";
import ContextTema from "../../../interfaces/context/ContextTema";
import TemaPropriedades from "../../../interfaces/context/TemaPropriedades";
import valoresTema from "./valoresTema";
import * as NavigationBar from "expo-navigation-bar";
import { useColorScheme } from "react-native";

const TemaContext = createContext<ContextTema>({ propriedadesTema: valoresTema["claro"], temaAtivo: "claro", alterarTema: () => { } });

export default function TemaProvider(props: any) {

    const [propriedadesTema, setPropriedadesTema] = useState<TemaPropriedades>(valoresTema["claro"]);
    const [temaAtivo, setTemaAtivo] = useState<"claro" | "escuro">("claro");
    const androidActiveTheme = useColorScheme();

    useEffect(() => {
        alterarTema(androidActiveTheme === "dark" ? "escuro" : "claro");
    }, [androidActiveTheme]);

    const alterarTema = (tema?: "claro" | "escuro") => {
        if (tema) {
            setPropriedadesTema(valoresTema[tema]);
            setTemaAtivo(tema);
            NavigationBar.setBackgroundColorAsync(valoresTema[tema].cores.fundoPrincipal);
            NavigationBar.setButtonStyleAsync(tema === "claro" ? "dark" : "light");
        }
        else {
            setPropriedadesTema(valoresTema[temaAtivo === "claro" ? "escuro" : "claro"]);
            setTemaAtivo(temaAtivo === "claro" ? "escuro" : "claro");
            NavigationBar.setBackgroundColorAsync(valoresTema[temaAtivo === "claro" ? "escuro" : "claro"].cores.fundoPrincipal);
            NavigationBar.setButtonStyleAsync(temaAtivo === "claro" ? "light" : "dark");
        }
    }

    return (
        <TemaContext.Provider value={{ propriedadesTema, temaAtivo, alterarTema }}>
            {props.children}
        </TemaContext.Provider>
    );
}

export const useTemaContext = () => useContext(TemaContext);