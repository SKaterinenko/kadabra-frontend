/** biome-ignore-all lint/style/noNonNullAssertion: <explanation> */
export function getApiUrl() {
	return process.env.NEXT_PUBLIC_API_URL!;
}
