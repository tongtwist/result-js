"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const Result_1 = require("./Result");
describe("In Result.ts", () => {
    describe("Result class", () => {
        it("should create a correct failure result object, when given an error message string", () => {
            const msgError = "bam!";
            const r = Result_1.Result.fail(msgError);
            expect(r).toBeInstanceOf(Result_1.Result);
            expect(r.isError).toBe(true);
            expect(r.isFailure).toBe(true);
            expect(r.isOk).toBe(false);
            expect(r.isSuccess).toBe(false);
            expect(r.value).toBeUndefined();
            expect(r.error).toBeInstanceOf(Error);
            if (r.error) {
                expect(r.error.message).toBe(msgError);
            }
        });
        it("should create a correct failure result object, when given an error object", () => {
            const msgError = "bam!";
            const err = new Error(msgError);
            const r = Result_1.Result.fail(err);
            expect(r).toBeInstanceOf(Result_1.Result);
            expect(r.isError).toBe(true);
            expect(r.isFailure).toBe(true);
            expect(r.isOk).toBe(false);
            expect(r.isSuccess).toBe(false);
            expect(r.value).toBeUndefined();
            expect(r.error).toBeInstanceOf(Error);
            if (r.error) {
                expect(r.error).toBe(err);
                expect(r.error.message).toBe(msgError);
            }
        });
        it("should create a correct success result object", () => {
            const value = "foo";
            const r = Result_1.Result.success(value);
            expect(r).toBeInstanceOf(Result_1.Result);
            expect(r.isError).toBe(false);
            expect(r.isFailure).toBe(false);
            expect(r.isOk).toBe(true);
            expect(r.isSuccess).toBe(true);
            expect(r.value).toBe(value);
            expect(r.error).toBeUndefined();
        });
    });
    describe("resultSchema", () => {
        it("should return a schema matching a Result object", () => {
            const rString = Result_1.Result.success("foo");
            const rNumber = Result_1.Result.success(123);
            const schemString = (0, Result_1.resultSchema)(zod_1.z.string());
            const schemNumber = (0, Result_1.resultSchema)(zod_1.z.number());
            const schemUnknown = (0, Result_1.resultSchema)();
            expect(schemString.safeParse({}).success).toBe(false);
            expect(schemNumber.safeParse({}).success).toBe(false);
            expect(schemUnknown.safeParse({}).success).toBe(false);
            expect(schemString.safeParse(rString).success).toBe(true);
            expect(schemNumber.safeParse(rString).success).toBe(false);
            expect(schemUnknown.safeParse(rString).success).toBe(true);
            expect(schemString.safeParse(rNumber).success).toBe(false);
            expect(schemNumber.safeParse(rNumber).success).toBe(true);
            expect(schemUnknown.safeParse(rNumber).success).toBe(true);
        });
    });
});
