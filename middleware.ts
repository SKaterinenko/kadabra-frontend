import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getRefresh } from "@/src/shared/api/server/auth";

export async function middleware(request: NextRequest) {
	const accessToken = request.cookies.get("access_token");
	const refreshToken = request.cookies.get("refresh_token");
	const { pathname } = request.nextUrl;

	const protectedRoutes = ["/dashboard", "/profile", "/settings"];
	const isProtectedRoute = protectedRoutes.some((route) =>
		pathname.startsWith(route),
	);

	// Если защищенный роут
	if (isProtectedRoute) {
		// Нет access но есть refresh - пробуем обновить
		if (!accessToken && refreshToken) {
			try {
				await getRefresh();
			} catch (e) {
				// Не удалось обновить - редирект на логин
				const loginUrl = new URL("/login", request.url);
				loginUrl.searchParams.set("callbackUrl", pathname);
				return NextResponse.redirect(loginUrl);
			}
		}

		// Вообще нет токенов - редирект на логин
		if (!accessToken) {
			const loginUrl = new URL("/login", request.url);
			loginUrl.searchParams.set("callbackUrl", pathname);
			return NextResponse.redirect(loginUrl);
		}
	}

	// Если есть токен и пользователь на странице логина
	if (accessToken && pathname === "/login") {
		return NextResponse.redirect(new URL("/", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
