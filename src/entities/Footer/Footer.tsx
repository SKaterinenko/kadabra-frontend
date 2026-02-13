"use client";
import Image from "next/image";
import Link from "next/link";
import {useTranslations} from "next-intl";

export const Footer = () => {
	const t = useTranslations();

	return (
		<footer className="container mt-10! py-10">
			<Image src="/images/logo.svg" alt="logo" width={287} height={60} />
			<div className="mt-[30px] flex w-full justify-between">
				<div className="flex items-center justify-between gap-5">
					<Link href="/" className="text-xl">
						{t("contacts")}
					</Link>
					<span className="h-6 w-px bg-gray-300" />
					<Link href="/" className="text-xl">
						{t("telegramChanel")}
					</Link>
					<span className="h-6 w-px bg-gray-300" />
					<Link href="/" className="text-xl">
						{t("offer")}
					</Link>
				</div>
				<p className="text-gray! text-xl">+100 123 45 56</p>
			</div>
		</footer>
	);
};
