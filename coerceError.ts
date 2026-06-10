export function coerceError(error: unknown): Error {
	if (error instanceof Error) return error;
	if (typeof error === "string") return new Error(error);
	if (typeof error === "number") {
		if (isNaN(error)) return new Error("NaN");
		if (!isFinite(error)) return new Error("Infinity");
		return new Error(String(error));
	}
	if (typeof error === "bigint") return new Error(String(error));
	if (typeof error === "symbol") return new Error(error.description ?? error.toString());
	if (error === null) return new Error("null");
	if (error === undefined) return new Error("undefined");
	if (typeof error === "object") {
		try {
			return new Error(JSON.stringify(error));
		} catch {
			return new Error(Object.prototype.toString.call(error));
		}
	}
	return new Error(String(error));
}
