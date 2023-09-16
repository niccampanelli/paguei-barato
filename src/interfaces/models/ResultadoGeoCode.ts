export interface ResultadoGeoCodeSummary {
    query: string,
    queryType: string,
    queryTime: number,
    numResults: number,
    offset: number,
    totalResults: number,
    fuzzyLevel: number
};

export interface ResultadoGeoCodeAddress {
    streetNumber: string
    streetName: string
    municipalitySubdivision: string
    municipality: string
    countrySubdivision: string
    postalCode: string
    extendedPostalCode: string
    countryCode: string
    country: string
    countryCodeISO3: string
    freeformAddress: string
    localName: string
};

export interface ResultadoGeoCodePosition {
    lat: number,
    lon: number
};

export interface ResultadoGeoCodeViewport {
    topLeftPoint: ResultadoGeoCodePosition,
    btmRightPoint: ResultadoGeoCodePosition
};

export interface ResultadoGeoCodeAddressRanges {
    rangeRight: string,
    from: ResultadoGeoCodePosition,
    to: ResultadoGeoCodePosition
};

export interface ResultadoGeoCodeResult {
    type: string,
    id: string,
    score: number,
    matchConfidence: {
        score: number
    },
    address: ResultadoGeoCodeAddress,
    position: ResultadoGeoCodePosition,
    viewport: ResultadoGeoCodeViewport,
    addressRanges: ResultadoGeoCodeAddressRanges
};

export default interface ResultadoGeoCode {
    summary: ResultadoGeoCodeSummary,
    results: ResultadoGeoCodeResult[]
};