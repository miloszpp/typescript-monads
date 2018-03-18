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
    return Maybe.run(function* () {
        const enteredIdStr = yield maybeEnteredId;
        const enteredId = parseInt(enteredIdStr);
        const employee = yield repository.findById(enteredId);
        const supervisorId = yield employee.supervisorId;
        const supervisor = yield repository.findById(supervisorId);
        return Maybe.some(supervisor.name);
    }());
}

function* numbers(): IterableIterator<number> {
    console.log('Inside numbers; start');1
    yield 1;
    console.log('Inside numbers; after first yield');
    yield 2;
    console.log('Inside numbers; end');
}

const numbersGenerator = numbers();
console.log('Outside of numbers');
console.log(numbersGenerator.next());
console.log('Outside of numbers; after first next');
console.log(numbersGenerator.next());
console.log('Outside of numbers; after second next');