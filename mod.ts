import { coerceError } from "./coerceError.ts";

export type Success<T> = [T, null];
export type Failure = [null, Error];

/**
 * @param data result from a successful function
 * @returns a Success object
 */
export function Success<T>(data: T): Success<T> {
	return [data, null];
}

/**
 * @param error result from a failed function
 * @returns a Failure object
 */
export function Failure(error: unknown): Failure {
	return [null, coerceError(error)];
}

/**
 * Executes a function and returns a result object indicating success or failure.
 *
 * @param fn - The function to be executed.
 * @returns A result object indicating success (with data) or failure (with error).
 */
export function Try<T>(
	fn: () => T,
): Extract<T, Promise<unknown>> extends never
	? Awaited<T> extends never ? Failure : Failure | Success<T>
	: Promise<Failure | Success<Awaited<T>>>;
/**
 * Executes a function and returns a result object indicating success or failure.
 *
 * @param fn - The function to be executed.
 * @returns A result object indicating success (with data) or failure (with error).
 */
export function Try<T>(fn: () => T): Failure | Success<T> | Promise<Failure | Success<Awaited<T>>> {
	try {
		const result = fn();
		if (result instanceof Promise) return result.then(Success, Failure);

		return Success(result);
	} catch (error: unknown) {
		return Failure(error);
	}
}
