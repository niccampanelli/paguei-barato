import { useEffect } from "react";

/**
 * Hook para executar uma função com atraso
 * @param funcao Função a ser executada
 * @param delay Atraso em milissegundos
 * @param deps Dependências para reexecutar a função
 */
export default function useDebounce(funcao: Function, delay: number, deps: any[]) {
    useEffect(() => {
        const handler = setTimeout(() => {
            funcao();
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [...deps]);
}