import { EmployeeRepository } from "./employee.repository";
import { Maybe } from "./maybe.monad";

const employeeIdInputEl = document.getElementById("employeeIdInput") as HTMLInputElement;
const findEmployeeButtonEl = document.getElementById("findEmployeeButton");
const searchResultsEl = document.getElementById("searchResults");

const repository = new EmployeeRepository();

findEmployeeButtonEl.addEventListener("click", () => {
    const supervisorName = getSupervisorName(Maybe.fromValue(employeeIdInputEl.value));
    searchResultsEl.innerText = `Supervisor name: ${supervisorName.getOrElse("could not find")}`;
});

function getSupervisorName(maybeEnteredId: Maybe<string>): Maybe<string> {
    return maybeEnteredId
        .flatMap(employeeIdString => Maybe.fromValue(parseInt(employeeIdString)))
        .flatMap(employeeId => repository.findById(employeeId))
        .flatMap(employee => employee.supervisorId)
        .flatMap(supervisorId => repository.findById(supervisorId))
        .map(supervisor => supervisor.name);
}