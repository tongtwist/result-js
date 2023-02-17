import type { IResult } from "./Result.spec";
export declare class Result<R = unknown> implements IResult<R> {
    private readonly _error?;
    private readonly _value?;
    private readonly _ok;
    private constructor();
    get error(): Error | undefined;
    get value(): R | undefined;
    get isOk(): boolean;
    get isSuccess(): boolean;
    get isError(): boolean;
    get isFailure(): boolean;
    static success<R>(value: R): Result<R>;
    static fail<R = unknown>(err: string | Error): Result<R>;
}
