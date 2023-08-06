export type QueriesPesquisaImagens = {
    totalResults: number,
    count: number,
    startIndex: number,
}

export type ItensImagePesquisaImagens = {
    contextLink: string,
    height: number,
    width: number,
    byteSize: number,
    thumbnailLink: string,
    thumbnailHeight: number,
    thumbnailWidth: number
}

export type ItensPesquisaImagens = {
    kind: string,
    title: string,
    htmlTitle: string,
    link: string,
    displayLink: string,
    snippet: string,
    htmlSnippet: string,
    mime: string,
    fileFormat: string,
    image: ItensImagePesquisaImagens
}

export default interface ResultadoPesquisaImagens {
    queries: {
        request: QueriesPesquisaImagens[]
    }
    items: ItensPesquisaImagens[],
}