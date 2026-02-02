import { useMutation } from "@tanstack/react-query";
import { login } from "@/src/shared/api/server/auth";

export function useLogin() {
    return useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            console.log("Login successful:", data);
        },
        onError: (error) => {
            console.error("Login failed:", error);
        },
    });
}