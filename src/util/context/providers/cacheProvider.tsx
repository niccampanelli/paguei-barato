import { createContext, useContext, useEffect, useState } from "react";
import Produto from "../../../interfaces/models/Produto";
import produtoServices from "../../../services/produtoServices";

const CacheContext = createContext({ produtosCache: [] as Produto[] });

export default function CacheProvider(props: any) {
    
    const [produtosCache, setProdutosCache] = useState<Produto[]>([]);

    useEffect(() => {
    }, []);

    return (
        <CacheContext.Provider value={{ produtosCache }}>
            {props.children}
        </CacheContext.Provider>
    );
}

export const useCacheContext = () => useContext(CacheContext);