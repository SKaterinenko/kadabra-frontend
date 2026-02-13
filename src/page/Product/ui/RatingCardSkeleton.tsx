"use client";
import {useTranslations} from "next-intl";
import type {FC} from "react";
import {H3} from "@/src/shared/ui/H3";
import {Skeleton} from "@/src/shared/ui/Skeleton";

export const RatingCardSkeleton: FC = () => {
	const t = useTranslations();

	return (
		<div className="w-[385px] p-5 shadow">
			<H3>{t("ratings")}</H3>
			<Skeleton className="mt-4 h-4 w-[150px]" />
			<Skeleton className="mt-2 h-4 w-[75px]" />
			<div className="mt-5">
				<Skeleton className="mt-1 h-[24px]" />
				<Skeleton className="mt-1 h-[24px]" />
				<Skeleton className="mt-1 h-[24px]" />
				<Skeleton className="mt-1 h-[24px]" />
				<Skeleton className="mt-1 h-[24px]" />
			</div>
		</div>
	);
};
