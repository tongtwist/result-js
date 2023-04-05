"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Result = exports.FailureResult = exports.SuccessResult = void 0;
const zod_1 = require("zod");
class SuccessResult {
    constructor(_value) {
        this._value = _value;
        Object.freeze(this);
    }
    get value() {
        return this._value;
    }
    get isOk() {
        return true;
    }
    get isSuccess() {
        return true;
    }
    get isError() {
        return false;
    }
    get isFailure() {
        return false;
    }
    static _serializedRawShape(resultTypeSchema) {
        return {
            v: resultTypeSchema,
            error: zod_1.z.never(),
            isOk: zod_1.z.literal(true).optional(),
            isSuccess: zod_1.z.literal(true).optional(),
            isError: zod_1.z.literal(false).optional(),
            isFailure: zod_1.z.literal(false).optional(),
        };
    }
    static serializedSchema(resultTypeSchema) {
        return zod_1.z.object(SuccessResult._serializedRawShape(resultTypeSchema));
    }
    static validateSerialized(j, resultTypeSchema) {
        return SuccessResult.serializedSchema(resultTypeSchema).safeParse(j).success;
    }
    static of(value) {
        return new SuccessResult(value);
    }
    static fromSerialized(j, resultTypeSchema) {
        return SuccessResult.validateSerialized(j, resultTypeSchema)
            ? SuccessResult.of(SuccessResult.of(j.v))
            : FailureResult.of(`Invalid serialized result: ${JSON.stringify(j)}`);
    }
}
exports.SuccessResult = SuccessResult;
class FailureResult {
    constructor(_error) {
        this._error = _error;
        Object.freeze(this);
    }
    get error() {
        return this._error;
    }
    get isOk() {
        return false;
    }
    get isSuccess() {
        return false;
    }
    get isError() {
        return true;
    }
    get isFailure() {
        return true;
    }
    static validateSerialized(j) {
        return FailureResult.serializedSchema.safeParse(j).success;
    }
    static of(err) {
        return new FailureResult(typeof err === "string" ? new Error(err) : err);
    }
    static fromSerialized(j) {
        return FailureResult.validateSerialized(j)
            ? SuccessResult.of(FailureResult.of(j.error))
            : FailureResult.of(`Invalid serialized result: ${JSON.stringify(j)}`);
    }
}
FailureResult.serializedSchema = zod_1.z.object({
    v: zod_1.z.never(),
    error: zod_1.z.string(),
    isOk: zod_1.z.literal(false).optional(),
    isSuccess: zod_1.z.literal(false).optional(),
    isError: zod_1.z.literal(true).optional(),
    isFailure: zod_1.z.literal(true).optional(),
});
exports.FailureResult = FailureResult;
class Result {
    static isOk(r) {
        return r.isOk;
    }
    static isSuccess(r) {
        return r.isOk;
    }
    static isError(r) {
        return r.isError;
    }
    static isFailure(r) {
        return r.isError;
    }
    static success(value) {
        return SuccessResult.of(value);
    }
    static fail(err) {
        return FailureResult.of(err);
    }
    static failIn(where, err) {
        const msg = typeof err === "string" ? err : err.message;
        return FailureResult.of(`${where}: ${msg}`);
    }
}
exports.Result = Result;
