import {z} from "zod"
import {
	successResultCreationPropertiesSchema,
	errorResultCreationPropertiesSchema,
	resultCreationPropertiesSchema,
} from "./CreationProperties"

/**
 * Shape spec
 */
export type TSuccessResultCreationPropertiesSchema<R, N = null> = z.infer<
	ReturnType<typeof successResultCreationPropertiesSchema<R, N>>
>
export type TErrorResultCreationPropertiesSchema<N = null> = z.infer<
	ReturnType<typeof errorResultCreationPropertiesSchema<N>>
>
export type TResultCreationProperties<R, N = null> = z.infer<ReturnType<typeof resultCreationPropertiesSchema<R, N>>>

/**
 * Logic spec
 */
describe("In CreationProperties.ts", () => {
	describe("successResultCreationPropertiesSchema()", () => {
		it(`should return a Zod schema that can validate against any creation properties matching a correct success tuple`, () => {
			const successStringNullSchema = successResultCreationPropertiesSchema(z.string())
			expect(successStringNullSchema).toBeInstanceOf(z.ZodTuple)
			expect(successStringNullSchema.safeParse(["foo", null]).success).toBe(true)
			expect(successStringNullSchema.safeParse(["foo", false]).success).toBe(false)
			expect(successStringNullSchema.safeParse([123, null]).success).toBe(false)
			expect(successStringNullSchema.safeParse(["foo", "error"]).success).toBe(false)
			const successStringFalseSchema = successResultCreationPropertiesSchema(z.string(), z.literal(false))
			expect(successStringFalseSchema).toBeInstanceOf(z.ZodTuple)
			expect(successStringFalseSchema.safeParse(["foo", false]).success).toBe(true)
			expect(successStringFalseSchema.safeParse(["foo", null]).success).toBe(false)
			expect(successStringFalseSchema.safeParse([123, false]).success).toBe(false)
			expect(successStringFalseSchema.safeParse(["foo", "error"]).success).toBe(false)
		})
	})
	describe("errorResultCreationPropertiesSchema()", () => {
		it(`should return a Zod schema that can validate against any creation properties matching a correct error tuple`, () => {
			const errorSchema = errorResultCreationPropertiesSchema()
			expect(errorSchema).toBeInstanceOf(z.ZodTuple)
			expect(errorSchema.safeParse([null, "error"]).success).toBe(true)
			expect(errorSchema.safeParse([null, new Error("error")]).success).toBe(true)
			expect(errorSchema.safeParse([false, "error"]).success).toBe(false)
			expect(errorSchema.safeParse([null, 123]).success).toBe(false)
			expect(errorSchema.safeParse(["foo", "error"]).success).toBe(false)
			const errorSchemaEmptyAsFalse = errorResultCreationPropertiesSchema(z.literal(false))
			expect(errorSchemaEmptyAsFalse).toBeInstanceOf(z.ZodTuple)
			expect(errorSchemaEmptyAsFalse.safeParse([false, "error"]).success).toBe(true)
			expect(errorSchemaEmptyAsFalse.safeParse([false, new Error("error")]).success).toBe(true)
			expect(errorSchemaEmptyAsFalse.safeParse([null, "error"]).success).toBe(false)
			expect(errorSchemaEmptyAsFalse.safeParse([false, 123]).success).toBe(false)
			expect(errorSchemaEmptyAsFalse.safeParse(["foo", "error"]).success).toBe(false)
		})
	})
	describe("resultCreationPropertiesSchema()", () => {
		it(`should return a Zod schema that can validate against any creation properties matching a correct result tuple`, () => {
			const resultSchema = resultCreationPropertiesSchema(z.string())
			expect(resultSchema).toBeInstanceOf(z.ZodUnion<[z.ZodTuple, z.ZodTuple]>)
			expect(resultSchema.safeParse(["foo", null]).success).toBe(true)
			expect(resultSchema.safeParse(["foo", false]).success).toBe(false)
			expect(resultSchema.safeParse([123, null]).success).toBe(false)
			expect(resultSchema.safeParse(["foo", "error"]).success).toBe(false)
			expect(resultSchema.safeParse([null, "error"]).success).toBe(true)
			expect(resultSchema.safeParse([null, new Error("error")]).success).toBe(true)
			expect(resultSchema.safeParse([false, "error"]).success).toBe(false)
			expect(resultSchema.safeParse([null, 123]).success).toBe(false)
			expect(resultSchema.safeParse(["foo", "error"]).success).toBe(false)
		})
	})
})
