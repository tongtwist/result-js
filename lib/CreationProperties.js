"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resultCreationPropertiesSchema = exports.errorResultCreationPropertiesSchema = exports.successResultCreationPropertiesSchema = void 0;
const zod_1 = require("zod");
function successResultCreationPropertiesSchema(resultTypeSchema, emptyTypeSchema) {
    return zod_1.z.tuple([resultTypeSchema, emptyTypeSchema !== null && emptyTypeSchema !== void 0 ? emptyTypeSchema : zod_1.z.null()]);
}
exports.successResultCreationPropertiesSchema = successResultCreationPropertiesSchema;
function errorResultCreationPropertiesSchema(emptyTypeSchema) {
    return zod_1.z.tuple([emptyTypeSchema !== null && emptyTypeSchema !== void 0 ? emptyTypeSchema : zod_1.z.null(), zod_1.z.union([zod_1.z.string().trim().min(1), zod_1.z.instanceof(Error)])]);
}
exports.errorResultCreationPropertiesSchema = errorResultCreationPropertiesSchema;
function resultCreationPropertiesSchema(resultTypeSchema, emptyTypeSchema) {
    return zod_1.z.union([
        successResultCreationPropertiesSchema(resultTypeSchema, emptyTypeSchema),
        errorResultCreationPropertiesSchema(emptyTypeSchema),
    ]);
}
exports.resultCreationPropertiesSchema = resultCreationPropertiesSchema;
//# sourceMappingURL=CreationProperties.js.map