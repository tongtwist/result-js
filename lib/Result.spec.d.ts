import { z } from "zod";
import { SuccessResult, FailureResult } from "./Result";
export type TSuccessResultSchema<R, RS extends z.ZodType<R> = z.ZodType<R>> = z.infer<ReturnType<typeof SuccessResult.serializedSchema<R, RS>>>;
export interface ISuccessResult<R> {
    readonly value: R;
    readonly isOk: true;
    readonly isSuccess: true;
    readonly isError: false;
    readonly isFailure: false;
}
export type TFailureResultSchema = z.infer<typeof FailureResult.serializedSchema>;
export interface IFailureResult {
    readonly error: Error;
    readonly isOk: false;
    readonly isSuccess: false;
    readonly isError: true;
    readonly isFailure: true;
}
export type IResult<R> = ISuccessResult<R> | IFailureResult;
