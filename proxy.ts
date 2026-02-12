import type {NextRequest} from "next/server";
import {NextResponse} from "next/server";
import createMiddleware from "next-intl/middleware";
import {getRefresh} from "@/src/shared/api/server/auth";
import {routing} from "./src/i18n/routing";

const intlMiddleware = createMiddleware(routing);

export async function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl;
	const accessToken = request.cookies.get("access_token");
	const refreshToken = request.cookies.get("refresh_token");

	// Защищённые роуты — проверяем без учёта локали (/en/dashboard → /dashboard)
	const protectedRoutes = ["/dashboard", "/profile", "/settings"];
	const pathnameWithoutLocale = pathname.replace(/^\/(en|ru)/, "") || "/";
	const isProtectedRoute = protectedRoutes.some((route) =>
		pathnameWithoutLocale.startsWith(route),
	);

	if (isProtectedRoute) {
		if (!accessToken && refreshToken) {
			try {
				await getRefresh();
			} catch (e) {
				const loginUrl = new URL("/login", request.url);
				loginUrl.searchParams.set("callbackUrl", pathname);
				return NextResponse.redirect(loginUrl);
			}
		}

		if (!accessToken) {
			const loginUrl = new URL("/login", request.url);
			loginUrl.searchParams.set("callbackUrl", pathname);
			return NextResponse.redirect(loginUrl);
		}
	}

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
