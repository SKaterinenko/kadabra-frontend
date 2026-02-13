"use client";
import clsx from "clsx";
import {usePathname, useRouter} from "next/navigation";
import {useLocale} from "next-intl";
import {routing} from "@/src/i18n/routing";

export const LangSwitcher = () => {
	const router = useRouter();
	const pathname = usePathname();
	const locale = useLocale();

	const switchLang = (newLocale: string) => {
		const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
		router.push(newPath);
	};

	return (
		<div>
			{routing.locales.map((lang, index) => (
				<span key={lang}>
					<button
						type="button"
						onClick={() => switchLang(lang)}
						className={clsx(
							"cursor-pointer",
							locale === lang ? "font-bold text-primary" : "font-normal",
						)}
					>
						{lang.toUpperCase()}
					</button>
					{index < routing.locales.length - 1 && (
						<span className="mx-1">/</span>
					)}
				</span>
			))}
		</div>
	);
};
