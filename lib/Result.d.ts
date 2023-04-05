import { z } from "zod";
import type { TSuccessResultSchema, TFailureResultSchema, ISuccessResult, IFailureResult, IResult } from "./Result.spec";
export declare class SuccessResult<R = unknown> implements ISuccessResult<R> {
    private readonly _value;
    private constructor();
    get value(): R;
    get isOk(): true;
    get isSuccess(): true;
    get isError(): false;
    get isFailure(): false;
    private static _serializedRawShape;
    static serializedSchema<R, RS extends z.ZodType<R> = z.ZodType<R>>(resultTypeSchema: RS): z.ZodObject<ReturnType<typeof SuccessResult._serializedRawShape<RS>>>;
    static validateSerialized<R, RS extends z.ZodType<R> = z.ZodType<R>>(j: any, resultTypeSchema: RS): j is TSuccessResultSchema<RS>;
    static of<R = unknown>(value: R): ISuccessResult<R>;
    static fromSerialized<R = unknown, RS extends z.ZodType<R> = z.ZodType<R>>(j: any, resultTypeSchema: RS): IResult<ISuccessResult<R>>;
}
export declare class FailureResult implements IFailureResult {
    private readonly _error;
    private constructor();
    get error(): Error;
    get isOk(): false;
    get isSuccess(): false;
    get isError(): true;
    get isFailure(): true;
    static readonly serializedSchema: z.ZodObject<{
        v: z.ZodNever;
        error: z.ZodString;
        isOk: z.ZodOptional<z.ZodLiteral<false>>;
        isSuccess: z.ZodOptional<z.ZodLiteral<false>>;
        isError: z.ZodOptional<z.ZodLiteral<true>>;
        isFailure: z.ZodOptional<z.ZodLiteral<true>>;
    }, "strip", z.ZodTypeAny, {
        v: never;
        error: string;
        isOk?: false | undefined;
        isSuccess?: false | undefined;
        isError?: true | undefined;
        isFailure?: true | undefined;
    }, {
        v: never;
        error: string;
        isOk?: false | undefined;
        isSuccess?: false | undefined;
        isError?: true | undefined;
        isFailure?: true | undefined;
    }>;
    static validateSerialized(j: any): j is TFailureResultSchema;
    static of(err: string | Error): IFailureResult;
    static fromSerialized(j: any): IResult<IFailureResult>;
}
export declare class Result {
    static isOk<R>(r: IResult<R>): r is ISuccessResult<R>;
    static isSuccess<R>(r: IResult<R>): r is ISuccessResult<R>;
    static isError<R>(r: IResult<R>): r is IFailureResult;
    static isFailure<R>(r: IResult<R>): r is IFailureResult;
    static success<R>(value: R): IResult<R>;
    static fail<R = unknown>(err: string | Error): IResult<R>;
    static failIn<R = unknown>(where: string, err: string | Error): IResult<R>;
}
