export class Result<TSuccess, TFailure> {
    private constructor(
        private value: TSuccess,
        private errorValue: TFailure
    ) {}

    static success<TSuccess, TFailure>(value: TSuccess) {
        return new Result<TSuccess, TFailure>(value, null);
    }

    static failure<TSuccess, TFailure>(errorValue: TFailure) {
        return new Result<TSuccess, TFailure>(null, errorValue);
    }

    map<R>(f: (wrapped: TSuccess) => R): Result<R, TFailure> {
        if (this.value === null) {
            return Result.failure<R, TFailure>(this.errorValue);
        } else {
            return Result.success<R, TFailure>(f(this.value));
        }
    }

    flatMap<R>(f: (wrapped: TSuccess) => Result<R, TFailure>): Result<R, TFailure> {
        if (this.value === null) {
            return Result.failure<R, TFailure>(this.errorValue);
        } else {
            return f(this.value);
        }
    }

    get(handleError: (errorValue: TFailure) => TSuccess): TSuccess {
        if (this.value === null) {
            return handleError(this.errorValue);
        } else {
            return this.value;
        }
    }
}