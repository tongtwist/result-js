"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const CreationProperties_1 = require("./CreationProperties");
describe("In CreationProperties.ts", () => {
    describe("successResultCreationPropertiesSchema()", () => {
        it(`should return a Zod schema that can validate against any creation properties matching a correct success tuple`, () => {
            const successStringNullSchema = (0, CreationProperties_1.successResultCreationPropertiesSchema)(zod_1.z.string());
            expect(successStringNullSchema).toBeInstanceOf(zod_1.z.ZodTuple);
            expect(successStringNullSchema.safeParse(["foo", null]).success).toBe(true);
            expect(successStringNullSchema.safeParse(["foo", false]).success).toBe(false);
            expect(successStringNullSchema.safeParse([123, null]).success).toBe(false);
            expect(successStringNullSchema.safeParse(["foo", "error"]).success).toBe(false);
            const successStringFalseSchema = (0, CreationProperties_1.successResultCreationPropertiesSchema)(zod_1.z.string(), zod_1.z.literal(false));
            expect(successStringFalseSchema).toBeInstanceOf(zod_1.z.ZodTuple);
            expect(successStringFalseSchema.safeParse(["foo", false]).success).toBe(true);
            expect(successStringFalseSchema.safeParse(["foo", null]).success).toBe(false);
            expect(successStringFalseSchema.safeParse([123, false]).success).toBe(false);
            expect(successStringFalseSchema.safeParse(["foo", "error"]).success).toBe(false);
        });
    });
    describe("errorResultCreationPropertiesSchema()", () => {
        it(`should return a Zod schema that can validate against any creation properties matching a correct error tuple`, () => {
            const errorSchema = (0, CreationProperties_1.errorResultCreationPropertiesSchema)();
            expect(errorSchema).toBeInstanceOf(zod_1.z.ZodTuple);
            expect(errorSchema.safeParse([null, "error"]).success).toBe(true);
            expect(errorSchema.safeParse([null, new Error("error")]).success).toBe(true);
            expect(errorSchema.safeParse([false, "error"]).success).toBe(false);
            expect(errorSchema.safeParse([null, 123]).success).toBe(false);
            expect(errorSchema.safeParse(["foo", "error"]).success).toBe(false);
            const errorSchemaEmptyAsFalse = (0, CreationProperties_1.errorResultCreationPropertiesSchema)(zod_1.z.literal(false));
            expect(errorSchemaEmptyAsFalse).toBeInstanceOf(zod_1.z.ZodTuple);
            expect(errorSchemaEmptyAsFalse.safeParse([false, "error"]).success).toBe(true);
            expect(errorSchemaEmptyAsFalse.safeParse([false, new Error("error")]).success).toBe(true);
            expect(errorSchemaEmptyAsFalse.safeParse([null, "error"]).success).toBe(false);
            expect(errorSchemaEmptyAsFalse.safeParse([false, 123]).success).toBe(false);
            expect(errorSchemaEmptyAsFalse.safeParse(["foo", "error"]).success).toBe(false);
        });
    });
    describe("resultCreationPropertiesSchema()", () => {
        it(`should return a Zod schema that can validate against any creation properties matching a correct result tuple`, () => {
            const resultSchema = (0, CreationProperties_1.resultCreationPropertiesSchema)(zod_1.z.string());
            expect(resultSchema).toBeInstanceOf((zod_1.z.ZodUnion));
            expect(resultSchema.safeParse(["foo", null]).success).toBe(true);
            expect(resultSchema.safeParse(["foo", false]).success).toBe(false);
            expect(resultSchema.safeParse([123, null]).success).toBe(false);
            expect(resultSchema.safeParse(["foo", "error"]).success).toBe(false);
            expect(resultSchema.safeParse([null, "error"]).success).toBe(true);
            expect(resultSchema.safeParse([null, new Error("error")]).success).toBe(true);
            expect(resultSchema.safeParse([false, "error"]).success).toBe(false);
            expect(resultSchema.safeParse([null, 123]).success).toBe(false);
            expect(resultSchema.safeParse(["foo", "error"]).success).toBe(false);
        });
    });
});
