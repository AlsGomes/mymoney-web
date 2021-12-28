import { Category, CategoryOnlyCode } from "./category";
import { PersonOnlyCode, PersonSummary } from "./person";

export interface RegistryDTOInsert {
    description: string;
    dueDate?: Date;
    paymentDate?: Date;
    value: number;
    obs?: string;
    type: string;
    category: CategoryOnlyCode;
    person: PersonOnlyCode;
}
export interface RegistryDTO {
    code: string;
    description: string;
    dueDate: Date;
    paymentDate?: Date;
    value: number;
    obs?: string;
    type: string;
    category: Category;
    person: PersonSummary;
}