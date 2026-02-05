export const API_URL =
	typeof window === "undefined"
		? process.env.API_URL // сервер
		: process.env.NEXT_PUBLIC_API_URL; // клиент
