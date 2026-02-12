"use client";
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
			{routing.locales.map((lang) => (
				<button
					key={lang}
					type="button"
					onClick={() => switchLang(lang)}
					style={{ fontWeight: locale === lang ? "bold" : "normal" }}
				>
					{lang.toUpperCase()}
				</button>
			))}
		</div>
	);
};
