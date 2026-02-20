import type {NextRequest} from "next/server";
import {NextResponse} from "next/server";
import createMiddleware from "next-intl/middleware";
import {routing} from "./src/i18n/routing";

const intlMiddleware = createMiddleware(routing);

export function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl;

	const accessToken = request.cookies.get("access_token")?.value;
	const refreshToken = request.cookies.get("refresh_token")?.value;

	// Защищённые роуты (без локали)
	const protectedRoutes = ["/dashboard", "/profile", "/settings"];
	const pathnameWithoutLocale = pathname.replace(/^\/(en|ru)/, "") || "/";

	const isProtectedRoute = protectedRoutes.some((route) =>
		pathnameWithoutLocale.startsWith(route),
	);

	// Если защищённый маршрут и нет access token → login
	if (isProtectedRoute && !accessToken) {
		const loginUrl = new URL("/login", request.url);
		loginUrl.searchParams.set("callbackUrl", pathname);
		return NextResponse.redirect(loginUrl);
	}

	// Если пользователь залогинен → нельзя на /login
	if (accessToken && pathnameWithoutLocale === "/login") {
		return NextResponse.redirect(new URL("/", request.url));
	}

	// Передаём управление next-intl
	return intlMiddleware(request);
}

export const config = {
	matcher: [
		"/((?!api|_next/static|_next/image|_next/webpack-hmr|favicon.ico|images|fonts|icons|.*\\..*).*)",
	],
};
