import { Maybe } from "./maybe.monad";

export interface Employee {
    id: number;
    name: string;
    supervisorId: Maybe<number>;
}