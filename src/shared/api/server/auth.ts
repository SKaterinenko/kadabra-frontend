import {ILoginRequest, IUser} from "@/src/shared/api/types";
import {API_URL} from "@/src/shared/api/config";

export async function login(credentials: ILoginRequest): Promise<IUser> {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || 'Failed to login');
    }

    return data;
}