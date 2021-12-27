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
}
export interface PersonDTO {
    code: string;
    name: string;
    active: boolean;
    address?: Address;
}

export interface Address {
    street?: string;
    num?: string;
    complement?: string;
    district?: string;
    postalCode?: string;
    city?: string;
    state?: string;
}