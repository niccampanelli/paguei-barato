import { Tema, TemaCores, TemaLayout, TemaLayoutEspacamentos, TemaLayoutPaddings, TemaTexto, TemaTextoPesos, TemaTextoTamanhos } from "@/types/contants/tema";

export const temaClaroCores: TemaCores = {
	destaque: {
		normal: "#27fb6b",
		claro: "#c4ffc2",
		escuro: "#18c951",
		contraste: "#313C56",
	},
	secundaria: {
		normal: "#3772ff",
		claro: "#8aaaff",
		escuro: "#225ae0",
		contraste: "#ffffff",
	},
	info: {
		normal: "#f5f5f5",
		claro: "#fafafa",
		escuro: "#dfdfdf",
		contraste: "#313C56",
	},
	vermelho: {
		normal: "#ff6a85",
		claro: "#ff8ca1",
		escuro: "#ed4c69",
		contraste: "#ffffff",
	},
	texto: {
		normal: "#313C56",
		claro: "#808AA2",
		escuro: "#000000",
		contraste: "#ffffff",
	},
	fundo: {
		principal: "#ffffff",
		secundario: "#f5f5f5",
		terciario: "#dfdfdf",
		quaternario: "#dddddd",
	},
}

export const temaTextoTamanhos: TemaTextoTamanhos = {
	titulo: 24,
	subtitulo: 20,
	texto: 16,
	legenda: 12,
}

export const temaTextoPesos: TemaTextoPesos = {
	titulo: 900,
	subtitulo: 800,
	link: 700,
	texto: 400,
}

export const temaTexto: TemaTexto = {
	tamanhos: temaTextoTamanhos,
	pesos: temaTextoPesos,
}

export const temaLayoutPaddings: TemaLayoutPaddings = {
	grande: {
		horizontal: 20,
		vertical: 32,
	},
	medio: {
		horizontal: 10,
		vertical: 20,
	},
	pequeno: {
		horizontal: 5,
		vertical: 10,
	},
	botaoPequeno: {
		horizontal: 10,
		vertical: 5,
	},
	botaoGrande: {
		horizontal: 15,
		vertical: 10,
	},
}

export const temaLayoutEspacamentos: TemaLayoutEspacamentos = {
	grande: 16,
	medio: 10,
	pequeno: 5,
}

export const temaLayout: TemaLayout = {
	raioBorda: 16,
	paddings: temaLayoutPaddings,
	espacamentos: temaLayoutEspacamentos,
}

export const tema: Tema = {
	cores: temaClaroCores,
	texto: temaTexto,
	layout: temaLayout,
}