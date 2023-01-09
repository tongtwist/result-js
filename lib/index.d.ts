declare module "Result" {
    export type TSuccessResultCreationProperties<R, N> = [R, N];
    export type TErrorResultCreationProperties<N> = [N, string | Error];
    export type TResultCreationProperties<R = unknown, N = null> = TSuccessResultCreationProperties<R, N> | TErrorResultCreationProperties<N>;
    /**
     * A Result class
     *
     * @export
     * @class Result
     * @template R Type of the value of a successfull result
     */
    export class Result<R = unknown> {
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
