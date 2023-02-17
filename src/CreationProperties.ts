import {z} from "zod"

export function successResultCreationPropertiesSchema<T, N = null>(
	resultTypeSchema: z.ZodType<T>,
	emptyTypeSchema?: z.ZodType<N>,
) {
	return z.tuple([resultTypeSchema, emptyTypeSchema ?? z.null()])
}

export function errorResultCreationPropertiesSchema<N = null>(emptyTypeSchema?: z.ZodType<N>) {
	return z.tuple([emptyTypeSchema ?? z.null(), z.union([z.string().trim().min(1), z.instanceof(Error)])])
}

export function resultCreationPropertiesSchema<R, N = null>(
	resultTypeSchema: z.ZodType<R>,
	emptyTypeSchema?: z.ZodType<N>,
) {
	return z.union([
		successResultCreationPropertiesSchema<R, N>(resultTypeSchema, emptyTypeSchema),
		errorResultCreationPropertiesSchema<N>(emptyTypeSchema),
	])
}
