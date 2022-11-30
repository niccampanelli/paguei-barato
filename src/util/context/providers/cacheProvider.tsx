import { createContext, useContext, useEffect, useState } from "react";
import Produto from "../../../interfaces/Produto";
import produtoServices from "../../../services/produtoServices";

const CacheContext = createContext({ produtosCache: [] as Produto[] });

export default function CacheProvider(props: any) {
    
    const [produtosCache, setProdutosCache] = useState<Produto[]>([]);

    useEffect(() => {
        produtoServices.getProdutos({})
            .then(produtos => {
                setProdutosCache(produtos.data);
                console.log(produtos.data);
                
            })
    }, []);

    return (
        <CacheContext.Provider value={{ produtosCache }}>
            {props.children}
        </CacheContext.Provider>
    );
}

export const useCacheContext = () => useContext(CacheContext);