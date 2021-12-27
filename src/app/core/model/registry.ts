import { Category, CategoryOnlyCode } from "./category";
import { PersonOnlyCode, PersonSummary } from "./person";

export interface RegistryDTOInsert {
    description: string;
    dueDate: string;
    paymentDate?: string;
    value: number;
    obs?: string;
    type: string;
    category: CategoryOnlyCode;
    person: PersonOnlyCode;
}
export interface RegistryDTO {
    code: string;
    description: string;
    dueDate: string;
    paymentDate?: string;
    value: number;
    obs?: string;
    type: string;
    category: Category;
    person: PersonSummary;
}