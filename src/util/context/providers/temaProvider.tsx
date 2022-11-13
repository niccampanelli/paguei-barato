import { createContext, useContext, useState } from "react";
import ContextTema from "../../../interfaces/ContextTema";
import TemaPropriedades from "../../../interfaces/TemaPropriedades";
import valoresTema from "./valoresTema";
import * as NavigationBar from "expo-navigation-bar";

const TemaContext = createContext<ContextTema>({ propriedadesTema: valoresTema["claro"], temaAtivo: "claro", alterarTema: () => { } });

export default function TemaProvider(props: any) {

    const [propriedadesTema, setPropriedadesTema] = useState<TemaPropriedades>(valoresTema["claro"]);
    const [temaAtivo, setTemaAtivo] = useState<"claro" | "escuro">("claro");

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