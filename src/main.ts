import { EmployeeRepository } from "./employee.repository";
import { Result } from "./result.monad";

const employeeIdInputEl = document.getElementById("employeeIdInput") as HTMLInputElement;
const findEmployeeButtonEl = document.getElementById("findEmployeeButton");
const searchResultsEl = document.getElementById("searchResults");

const repository = new EmployeeRepository();

findEmployeeButtonEl.addEventListener("click", () => {
    const inputResult: Result<string, string> = employeeIdInputEl.value 
        ? Result.success(employeeIdInputEl.value)
        : Result.failure("No employee id provided");
    const supervisorNameOrError = getSupervisorName(inputResult).get(error => error);
    searchResultsEl.innerText = `Supervisor name: ${supervisorNameOrError}`;
});

function getSupervisorName(enteredIdResult: Result<string, string>): Result<string, string> {
    return enteredIdResult
        .flatMap(safeParseInt)
        .flatMap(employeeId => repository.findById(employeeId))
        .flatMap(employee => employee.supervisorId)
        .flatMap(supervisorId => repository.findById(supervisorId))
        .map(supervisor => supervisor.name);
}

function safeParseInt(numberString: string): Result<number, string> {
    const result = parseInt(numberString);
    return isNaN(result)
        ? Result.failure("Invalid number format") : Result.success(result);
}