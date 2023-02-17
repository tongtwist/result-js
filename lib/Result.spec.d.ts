export interface IResult<R> {
    readonly error?: Error;
    readonly value?: R;
    readonly isOk: boolean;
    readonly isSuccess: boolean;
    readonly isError: boolean;
    readonly isFailure: boolean;
}
