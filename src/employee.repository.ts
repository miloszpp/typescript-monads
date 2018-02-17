import { Employee } from "./employee.model";

export class EmployeeRepository {
    private employees: Employee[] = [
        { id: 1, name: "John" },
        { id: 2, name: "Jane", supervisorId: 1 },
        { id: 3, name: "Joe", supervisorId: 2 },
    ];

    findById(id: number) {
        const results = this.employees.filter(employee => employee.id === id);
        return results.length ? results[0] : null;
    }
}