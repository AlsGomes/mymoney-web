export interface PersonSummary {
    code: string;
    name: string;
}
export interface PersonOnlyCode {
    code: string;
}
export interface PersonDTOInsert {
    name: string;
    address?: Address;
    contacts?: ContactDTOInsert[];
}
export interface PersonDTO {
    code: string;
    name: string;
    active: boolean;
    address?: Address;
    contacts?: ContactDTO[];
}

export interface Address {
    street?: string;
    num?: string;
    complement?: string;
    district?: string;
    postalCode?: string;
    city?: CityDTOInsert;
}

export interface ContactDTOInsert {
    name: string;
    email: string;
    telephone: string;
}

export interface ContactDTO {
    code: string;
    name: string;
    email: string;
    telephone: string;
}

export interface StateSummary {
    id: number;
    name: string;
    initials: string;
    ibge: number;
}

export interface CitySummary {
    id: number;
    name: string;
    ibge: number;
    stateId: number;
}

export interface CityDTOInsert {
    id: number;
}
