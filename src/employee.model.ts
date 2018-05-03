import { Maybe } from "./maybe.monad";
import { Result } from "./result.monad";

export interface Employee {
    id: number;
    name: string;
    supervisorId: Result<number, string>;
}