export type TSuccessResultCreationProperties<R, N> = [R, N]
export type TErrorResultCreationProperties<N> = [N, string | Error]
export type TResultCreationProperties<R = unknown, N = null> =
	| TSuccessResultCreationProperties<R, N>
	| TErrorResultCreationProperties<N>

/**
 * A Result class
 *
 * @export
 * @class Result
 * @template R Type of the value of a successfull result
 */
export class Result<R = unknown> {
	private readonly _error?: Error
	private readonly _value?: R
	private readonly _ok: boolean

	private constructor(readonly props: TResultCreationProperties<R>) {
		this._ok = !props[1]
		if (this._ok) {
			this._value = props[0]!
		} else {
			this._error = typeof props[1]! === "string" ? new Error(props[1]!) : props[1]!
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

	static success<R = unknown>(value: R): Result<R> {
		return new Result<R>([value, null])
	}

	static fail<R = unknown>(err: string | Error): Result<R> {
		return new Result<R>([null, err])
	}
}
