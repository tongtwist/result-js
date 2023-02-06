"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Result = void 0;
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
