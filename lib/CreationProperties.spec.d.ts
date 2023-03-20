import { z } from "zod";
import { successResultCreationPropertiesSchema, errorResultCreationPropertiesSchema, resultCreationPropertiesSchema } from "./CreationProperties";
export type TSuccessResultCreationPropertiesSchema<R, N = null> = z.infer<ReturnType<typeof successResultCreationPropertiesSchema<R, N>>>;
export type TErrorResultCreationPropertiesSchema<N = null> = z.infer<ReturnType<typeof errorResultCreationPropertiesSchema<N>>>;
export type TResultCreationProperties<R, N = null> = z.infer<ReturnType<typeof resultCreationPropertiesSchema<R, N>>>;
