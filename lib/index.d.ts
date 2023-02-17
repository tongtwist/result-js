declare module "CreationProperties" {
    import { z } from "zod";
    export function successResultCreationPropertiesSchema<T, N = null>(resultTypeSchema: z.ZodType<T>, emptyTypeSchema?: z.ZodType<N>): z.ZodTuple<[z.ZodType<T, z.ZodTypeDef, T>, z.ZodType<N, z.ZodTypeDef, N> | z.ZodNull], null>;
    export function errorResultCreationPropertiesSchema<N = null>(emptyTypeSchema?: z.ZodType<N>): z.ZodTuple<[z.ZodNull | z.ZodType<N, z.ZodTypeDef, N>, z.ZodUnion<[z.ZodString, z.ZodType<Error, z.ZodTypeDef, Error>]>], null>;
    export function resultCreationPropertiesSchema<R, N = null>(resultTypeSchema: z.ZodType<R>, emptyTypeSchema?: z.ZodType<N>): z.ZodUnion<[z.ZodTuple<[z.ZodType<R, z.ZodTypeDef, R>, z.ZodNull | z.ZodType<N, z.ZodTypeDef, N>], null>, z.ZodTuple<[z.ZodNull | z.ZodType<N, z.ZodTypeDef, N>, z.ZodUnion<[z.ZodString, z.ZodType<Error, z.ZodTypeDef, Error>]>], null>]>;
}
declare module "CreationProperties.spec" {
    import { z } from "zod";
    import { successResultCreationPropertiesSchema, errorResultCreationPropertiesSchema, resultCreationPropertiesSchema } from "CreationProperties";
    /**
     * Shape spec
     */
    export type TSuccessResultCreationPropertiesSchema<R, N = null> = z.infer<ReturnType<typeof successResultCreationPropertiesSchema<R, N>>>;
    export type TErrorResultCreationPropertiesSchema<N = null> = z.infer<ReturnType<typeof errorResultCreationPropertiesSchema<N>>>;
    export type TResultCreationProperties<R, N = null> = z.infer<ReturnType<typeof resultCreationPropertiesSchema<R, N>>>;
}
declare module "Result.spec" {
    /**
     * Shape spec
     */
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
        static success<R>(value: R): Result<R>;
        static fail<R = unknown>(err: string | Error): Result<R>;
    }
}
declare module "@tongtwist/result-js" {
    export * from "Result";
}
