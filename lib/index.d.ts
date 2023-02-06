declare module "Result.spec" {
    /**
     * Shape spec
     */
    export type TSuccessResultCreationProperties<R, N> = [R, N];
    export type TErrorResultCreationProperties<N> = [N, string | Error];
    export type TResultCreationProperties<R = unknown, N = null> = TSuccessResultCreationProperties<R, N> | TErrorResultCreationProperties<N>;
    export interface IResult<R> {
        readonly error?: Error;
        readonly value?: R;
        readonly isOk: boolean;
        readonly isSuccess: boolean;
        readonly isError: boolean;
        readonly isFailure: boolean;
    }
}
declare module "Result" {
    import type { IResult } from "Result.spec";
    /**
     * A Result class
     *
     * @export
     * @class Result
     * @template R Type of the value of a successfull result
     */
    export class Result<R = unknown> implements IResult<R> {
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
        static success<R = unknown>(value: R): Result<R>;
        static fail<R = unknown>(err: string | Error): Result<R>;
    }
}
declare module "@tongtwist/result-js" {
    export * from "Result";
}
