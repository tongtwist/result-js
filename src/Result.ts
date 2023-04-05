import {z} from "zod"
import type {TSuccessResultSchema, TFailureResultSchema, ISuccessResult, IFailureResult, IResult} from "./Result.spec"

export class SuccessResult<R = unknown> implements ISuccessResult<R> {
	private constructor(private readonly _value: R) {
		Object.freeze(this)
	}

	get value(): R {
		return this._value
	}
	get isOk(): true {
		return true
	}
	get isSuccess(): true {
		return true
	}
	get isError(): false {
		return false
	}
	get isFailure(): false {
		return false
	}

	private static _serializedRawShape<R, RS extends z.ZodType<R> = z.ZodType<R>>(resultTypeSchema: RS): z.ZodRawShape {
		return {
			v: resultTypeSchema,
			error: z.never(),
			isOk: z.literal(true).optional(),
			isSuccess: z.literal(true).optional(),
			isError: z.literal(false).optional(),
			isFailure: z.literal(false).optional(),
		}
	}

	static serializedSchema<R, RS extends z.ZodType<R> = z.ZodType<R>>(
		resultTypeSchema: RS,
	): z.ZodObject<ReturnType<typeof SuccessResult._serializedRawShape<RS>>> {
		return z.object(SuccessResult._serializedRawShape<R>(resultTypeSchema))
	}

	static validateSerialized<R, RS extends z.ZodType<R> = z.ZodType<R>>(
		j: any,
		resultTypeSchema: RS,
	): j is TSuccessResultSchema<RS> {
		return SuccessResult.serializedSchema(resultTypeSchema).safeParse(j).success
	}

	static of<R = unknown>(value: R): ISuccessResult<R> {
		return new SuccessResult<R>(value)
	}

	static fromSerialized<R = unknown, RS extends z.ZodType<R> = z.ZodType<R>>(
		j: any,
		resultTypeSchema: RS,
	): IResult<ISuccessResult<R>> {
		return SuccessResult.validateSerialized<R, RS>(j, resultTypeSchema)
			? SuccessResult.of(SuccessResult.of<R>(j.v))
			: FailureResult.of(`Invalid serialized result: ${JSON.stringify(j)}`)
	}
}

export class FailureResult implements IFailureResult {
	private constructor(private readonly _error: Error) {
		Object.freeze(this)
	}

	get error(): Error {
		return this._error
	}
	get isOk(): false {
		return false
	}
	get isSuccess(): false {
		return false
	}
	get isError(): true {
		return true
	}
	get isFailure(): true {
		return true
	}

	static readonly serializedSchema = z.object({
		v: z.never(),
		error: z.string(),
		isOk: z.literal(false).optional(),
		isSuccess: z.literal(false).optional(),
		isError: z.literal(true).optional(),
		isFailure: z.literal(true).optional(),
	})

	static validateSerialized(j: any): j is TFailureResultSchema {
		return FailureResult.serializedSchema.safeParse(j).success
	}

	static of(err: string | Error): IFailureResult {
		return new FailureResult(typeof err === "string" ? new Error(err) : err)
	}

	static fromSerialized(j: any): IResult<IFailureResult> {
		return FailureResult.validateSerialized(j)
			? SuccessResult.of(FailureResult.of(j.error))
			: FailureResult.of(`Invalid serialized result: ${JSON.stringify(j)}`)
	}
}

export class Result {
	static isOk<R>(r: IResult<R>): r is ISuccessResult<R> {
		return r.isOk
	}
	static isSuccess<R>(r: IResult<R>): r is ISuccessResult<R> {
		return r.isOk
	}

	static isError<R>(r: IResult<R>): r is IFailureResult {
		return r.isError
	}
	static isFailure<R>(r: IResult<R>): r is IFailureResult {
		return r.isError
	}

	static success<R>(value: R): IResult<R> {
		return SuccessResult.of<R>(value)
	}

	static fail<R = unknown>(err: string | Error): IResult<R> {
		return FailureResult.of(err)
	}

	static failIn<R = unknown>(where: string, err: string | Error): IResult<R> {
		const msg = typeof err === "string" ? err : err.message
		return FailureResult.of(`${where}: ${msg}`)
	}
}
