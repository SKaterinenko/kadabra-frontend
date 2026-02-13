"use client";
import Image from "next/image";
import Link from "next/link";
import {useTranslations} from "next-intl";
import type {FC} from "react";
import {useGetMe} from "@/src/shared/api/client/authClient";
import {Banner} from "@/src/shared/ui/Banner";
import {Button} from "@/src/shared/ui/Button";

export const LoginBanner: FC = () => {
	const { data: user } = useGetMe();
	const t = useTranslations();

	return (
		<section className="flex gap-[35px]">
			{!user && (
				<div className="flex w-[520px] flex-col items-center rounded-[3px] p-[30px] text-center shadow">
					<Image
						className="mb-[27px] rounded-[3px]"
						src="/images/userCheck.svg"
						width={67}
						height={71}
						alt="Hello"
					/>
					<h2 className="font-bold text-4xl">{t("welcome")}</h2>
					<p>{t("purchases")}</p>
					<div className="mt-5 flex w-full gap-5">
						<Link href="/registration" className="w-full">
							<Button>{t("registration")}</Button>
						</Link>

						<Link href="/login" className="w-full">
							<Button variant="outlined">{t("login")}</Button>
						</Link>
					</div>
				</div>
			)}
			<Banner path="/images/banner2.jpg" />
		</section>
	);
};
