export type AuthIntentRoute =
    | "/(protegidas)/(abas)/lista"
    | "/(protegidas)/(abas)/(menu)/usuario";

let pendingIntent: AuthIntentRoute | null = null;

export function definirIntencaoDeAutenticacao(route: AuthIntentRoute): void {
    pendingIntent = route;
}

export function consumirIntencaoDeAutenticacao(): AuthIntentRoute | null {
    const intent = pendingIntent;
    pendingIntent = null;
    return intent;
}
