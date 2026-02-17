/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
"use client";

import Image from "next/image";
import Link from "next/link";
import {useTranslations} from "next-intl";
import React from "react";
import {useGetCategories} from "@/src/shared/api/client/categoriesClient";
import {Input} from "@/src/shared/ui/Input/Input";
import {LangSwitcher} from "@/src/shared/ui/LangSwitcher";
import {Skeleton} from "@/src/shared/ui/Skeleton/Skeleton";

export const Header = () => {
	const { data: categories } = useGetCategories();
	const t = useTranslations();

	return (
		<header className="shadow">
			<div className="bg-amber-300 text-center">
				<h2>
					{t("petProject")}{" "}
					<Link
						target="_blank"
						className="text-blue-400"
						href="https://github.com/SKaterinenko/kadabra-backend"
					>
						backend
					</Link>{" "}
					+{" "}
					<Link
						target="_blank"
						className="text-blue-400"
						href="https://github.com/SKaterinenko/kadabra-frontend"
					>
						frontend
					</Link>{" "}
					by{" "}
					<Link
						target="_blank"
						className="text-blue-400"
						href="https://github.com/SKaterinenko"
					>
						SKaterinenko
					</Link>
				</h2>
			</div>
			<div className="container py-[20px]">
				<div className="flex justify-between">
					<div className="flex items-center justify-between gap-[123px]">
						<Link href="/">
							<Image
								src="/images/logo.svg"
								width={145}
								height={30}
								alt="Logo"
							/>
						</Link>
						<Input placeholder={t("searchProducts")} width={790} search />
					</div>
					<div className="flex gap-8 items-center">
						<Link href="/cart">
							<Image src="/images/cart.svg" width={32} height={28} alt="Cart" />
						</Link>
						<Link href="/profile">
							<Image src="/images/user.svg" width={26} height={28} alt="User" />
						</Link>
						<LangSwitcher />
					</div>
				</div>
				<div className="flex mt-[30px] justify-between w-[1058px]">
					<Link href="/best-of-month" className="text-xl">
						{t("bestOfMonth")}
					</Link>
					{!!categories?.length &&
						categories?.slice(0, 5)?.map((item) => (
							<React.Fragment key={item.id}>
								<span className="h-6 w-px bg-gray-300" />
								<Link href={`/category/${item?.slug}`} className="text-xl">
									{item?.name}
								</Link>
							</React.Fragment>
						))}
					{!categories?.length &&
						Array.from({ length: 5 }).map((_, i) => (
							<React.Fragment key={i}>
								<span className="h-6 w-px bg-gray-300" />
								<Skeleton key={i} className="h-[25px] w-[120px]" />
							</React.Fragment>
						))}
				</div>
			</div>
		</header>
	);
};
