"use client"
import {ReactNode} from "react";
import {useRefresh} from "@/src/shared/api/client/authClient";

export function AuthProvider({ children }: { children: ReactNode }) {
// Запрос сам будет вызываться каждые N миллисекунд. Куки будут обновлятся.
// Сессия будет жить пока вкладка открыта и refreshToken живет
    useRefresh()

    return (
        <>
            {children}
        </>
    );
}