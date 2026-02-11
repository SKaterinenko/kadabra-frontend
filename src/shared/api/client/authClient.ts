import { useMutation, useQuery } from "@tanstack/react-query";
import {
	getMe,
	getRefresh,
	login,
	logout,
	register,
} from "@/src/shared/api/server/auth";

export function useLogin() {
	return useMutation({
		mutationFn: login,
	});
}

export function useRefresh() {
	return useQuery({
		queryKey: ["user"],
		queryFn: getRefresh,
		refetchInterval: 30 * 60 * 1000,
		refetchIntervalInBackground: true,
	});
}

export function useGetMe() {
	return useQuery({
		queryKey: ["user"],
		queryFn: getMe,
		staleTime: 5 * 60 * 1000, // 5 минут
		retry: false, // не повторять при 401
	});
}

export function useLogout() {
	return useMutation({
		mutationFn: logout,
	});
}

export function useRegister() {
	return useMutation({
		mutationFn: register,
	});
}
