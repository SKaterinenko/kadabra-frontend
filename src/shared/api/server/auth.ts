import type {ILoginRequest, IRegisterRequest, IUser,} from "@/src/shared/api/types";
import {API_URL} from "../config";

export async function login(credentials: ILoginRequest): Promise<IUser> {
	const res = await fetch(`${API_URL}/auth/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
		body: JSON.stringify(credentials),
	});

	const data = await res.json();

	if (!res.ok) {
		throw new Error(data.message || "Failed to login");
	}

	return data;
}

export async function getRefresh(): Promise<IUser> {
	const res = await fetch(`${API_URL}/auth/refresh`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
	});

	const data = await res.json();

	if (!res.ok) {
		throw new Error(data.message || "Failed to refresh tokens");
	}

	return data;
}

export async function logout() {
	const res = await fetch(`${API_URL}/auth/logout`, {
		method: "POST",
		credentials: "include",
	});

	const data = await res.json();

	if (!res.ok) {
		throw new Error(data.message || "Failed to logout");
	}

	return data;
}

export async function getMe(): Promise<IUser> {
	const res = await fetch(`${API_URL}/me`, {
		method: "GET",
		credentials: "include",
	});

	const data = await res.json();

	if (!res.ok) {
		throw new Error(data.message || "Failed to get Me");
	}

	return data;
}

export async function register(credentials: IRegisterRequest): Promise<IUser> {
	const res = await fetch(`${API_URL}/auth/register`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
		body: JSON.stringify(credentials),
	});

	const data = await res.json();

	if (!res.ok) {
		throw new Error(data.message || "Failed to register");
	}

	return data;
}
