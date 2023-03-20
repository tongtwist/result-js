"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Result = exports.resultSchema = void 0;
const zod_1 = require("zod");
function resultSchema(resultTypeSchema) {
    return zod_1.z.object({
        error: zod_1.z.instanceof(Error).optional(),
        value: (resultTypeSchema !== null && resultTypeSchema !== void 0 ? resultTypeSchema : zod_1.z.unknown()).optional(),
        isOk: zod_1.z.boolean(),
        isSuccess: zod_1.z.boolean(),
        isError: zod_1.z.boolean(),
        isFailure: zod_1.z.boolean(),
    });
}
exports.resultSchema = resultSchema;
class Result {
    constructor(props) {
        this._ok = !props[1];
        if (this._ok) {
            this._value = props[0];
        }
        else {
            this._error = typeof props[1] === "string" ? new Error(props[1]) : props[1];
        }
        Object.freeze(this);
    }
    get error() {
        return this._error;
    }
    get value() {
        return this._value;
    }
    get isOk() {
        return this._ok;
    }
    get isSuccess() {
        return this._ok;
    }
    get isError() {
        return !this._ok;
    }
    get isFailure() {
        return !this._ok;
    }
    static success(value) {
        return new Result([value, null]);
    }
    static fail(err) {
        return new Result([null, err]);
    }
}
exports.Result = Result;
