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
