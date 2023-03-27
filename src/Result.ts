import {z} from "zod"
import type {IResult} from "./Result.spec"

export function resultSchema<R = unknown>(resultTypeSchema?: z.ZodType<R>) {
	return z.object({
		error: z.instanceof(Error).optional(),
		value: (resultTypeSchema ?? z.unknown()).optional(),
		isOk: z.boolean(),
		isSuccess: z.boolean(),
		isError: z.boolean(),
		isFailure: z.boolean(),
	})
}
export type TResultSchema<R = unknown> = z.infer<ReturnType<typeof resultSchema<R>>>

/**
 * A Result class
 *
 * @export
 * @class Result
 * @template R Type of the value of a successfull result
 */
export class Result<R = unknown> implements IResult<R> {
	private readonly _error?: Error
	private readonly _value?: R
	private readonly _ok: boolean

	private constructor(v?: R, e?: Error | string) {
		this._ok = typeof e === "undefined" && typeof v !== "undefined"
		if (this._ok) {
			this._value = v
		} else {
			this._error = typeof e === "string" ? new Error(e) : e
		}
		Object.freeze(this)
	}

	get error(): Error | undefined {
		return this._error
	}
	get value(): R | undefined {
		return this._value
	}
	get isOk(): boolean {
		return this._ok
	}
	get isSuccess(): boolean {
		return this._ok
	}
	get isError(): boolean {
		return !this._ok
	}
	get isFailure(): boolean {
		return !this._ok
	}

	static success<R>(value: R): Result<R> {
		return new Result<R>(value)
	}

	static fail<R = unknown>(err: string | Error): Result<R> {
		return new Result<R>(undefined, err)
	}

	static failIn<R = unknown>(where: string, err: string | Error): Result<R> {
		const msg = typeof err === "string" ? err : err.message
		return Result.fail(`${where}: ${msg}`)
	}
}
