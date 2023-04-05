import {z} from "zod"
import {SuccessResult, FailureResult, Result} from "./Result"

/**
 * Shape spec
 */

/**
 * The "success" specific case of the TResultSchema pseudo-type
 */
export type TSuccessResultSchema<R, RS extends z.ZodType<R> = z.ZodType<R>> = z.infer<
	ReturnType<typeof SuccessResult.serializedSchema<R, RS>>
>

/**
 * The "success" specific case of the IResult pseudo-interface
 *
 * @export
 * @interface ISuccessResult
 * @template R
 */
export interface ISuccessResult<R> {
	readonly value: R
	readonly isOk: true
	readonly isSuccess: true
	readonly isError: false
	readonly isFailure: false
}

/**
 * The "failure" specific case of the TResultSchema pseudo-type
 */
export type TFailureResultSchema = z.infer<typeof FailureResult.serializedSchema>

/**
 * The "failure" specific case of the IResult pseudo-interface
 *
 * @export
 * @interface IFailureResult
 */
export interface IFailureResult {
	readonly error: Error
	readonly isOk: false
	readonly isSuccess: false
	readonly isError: true
	readonly isFailure: true
}

/**
 * The pseudo-interface for a result of type `R` (or an Error)
 */
export type IResult<R> = ISuccessResult<R> | IFailureResult

/**
 * Logic spec
 */
describe("In Result.ts", () => {
	describe("Result class", () => {
		it("should create a correct failure result object, when given an error message string", () => {
			const msgError = "bam!"
			const r: IResult<any> = Result.fail(msgError)
			expect(r).toBeInstanceOf(FailureResult)
			expect(r.isOk).toBe(false)
			expect(r.isSuccess).toBe(false)
			expect(r.isError).toBe(true)
			expect(r.isFailure).toBe(true)
			expect(Result.isOk(r)).toBe(false)
			expect(Result.isError(r)).toBe(true)
			if (Result.isError(r)) {
				// @ts-ignore
				expect(r.value).toBeUndefined()
				expect(r.error).toBeInstanceOf(Error)
				expect(r.error.message).toEqual(msgError)
			}
		})
		it("should create a correct failure result object, when given an error object", () => {
			const msgError = "bam!"
			const err = new Error(msgError)
			const r: IResult<any> = Result.fail(err)
			expect(r).toBeInstanceOf(FailureResult)
			expect(r.isError).toBe(true)
			expect(r.isFailure).toBe(true)
			expect(r.isOk).toBe(false)
			expect(r.isSuccess).toBe(false)
			expect(Result.isOk(r)).toBe(false)
			expect(Result.isError(r)).toBe(true)
			if (Result.isError(r)) {
				// @ts-ignore
				expect(r.value).toBeUndefined()
				expect(r.error).toBeInstanceOf(Error)
				expect(r.error).toEqual(err)
				expect(r.error.message).toEqual(msgError)
			}
		})
		it("should create a correct success result object", () => {
			const value = "foo"
			const r: IResult<string> = Result.success<string>(value)
			expect(r).toBeInstanceOf(SuccessResult)
			expect(r.isError).toBe(false)
			expect(r.isFailure).toBe(false)
			expect(r.isOk).toBe(true)
			expect(r.isSuccess).toBe(true)
			expect(Result.isOk(r)).toBe(true)
			expect(Result.isError(r)).toBe(false)
			if (Result.isOk(r)) {
				expect(r.value).toEqual(value)
				// @ts-ignore
				expect(r.error).toBeUndefined()
			}
		})
	})
})
