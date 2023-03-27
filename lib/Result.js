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
    constructor(v, e) {
        this._ok = typeof e === "undefined" && typeof v !== "undefined";
        if (this._ok) {
            this._value = v;
        }
        else {
            this._error = typeof e === "string" ? new Error(e) : e;
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
        return new Result(value);
    }
    static fail(err) {
        return new Result(undefined, err);
    }
    static failIn(where, err) {
        const msg = typeof err === "string" ? err : err.message;
        return Result.fail(`${where}: ${msg}`);
    }
}
exports.Result = Result;
