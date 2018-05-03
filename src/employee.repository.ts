import { Employee } from "./employee.model";
import { Maybe } from "./maybe.monad";
import { Result } from "./result.monad";

export class EmployeeRepository {
    private employees: Employee[] = [
        { id: 1, name: "John", supervisorId: Result.failure("No supervisor") },
        { id: 2, name: "Jane", supervisorId: Result.success(1) },
        { id: 3, name: "Joe", supervisorId: Result.success(2) },
    ];

    findById(id: number): Result<Employee, string> {
        const results = this.employees.filter(employee => employee.id === id);
        return results.length 
            ? Result.success(results[0]) 
            : Result.failure("Employee does not exist");
    }
}