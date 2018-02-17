import { Employee } from "./employee.model";
import { Maybe } from "./maybe.monad";

export class EmployeeRepository {
    private employees: Employee[] = [
        { id: 1, name: "John", supervisorId: Maybe.none() },
        { id: 2, name: "Jane", supervisorId: Maybe.some(1) },
        { id: 3, name: "Joe", supervisorId: Maybe.some(2) },
    ];

    findById(id: number): Maybe<Employee> {
        const results = this.employees.filter(employee => employee.id === id);
        return results.length ? Maybe.some(results[0]) : Maybe.none();
    }
}