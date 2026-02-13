"use client";
import {useRouter} from "next/navigation";
import {useTranslations} from "next-intl";
import type {Dispatch, FC, SetStateAction} from "react";
import {RatingBar} from "@/src/page/Product/ui/RatingBar";
import {RatingCardSkeleton} from "@/src/page/Product/ui/RatingCardSkeleton";
import type {IRating, IUser} from "@/src/shared/api/types";
import {Button} from "@/src/shared/ui/Button";
import {H3} from "@/src/shared/ui/H3";
import {StarRating} from "@/src/shared/ui/StarRating";
import {getAverageRating} from "@/src/shared/utils/avgRating";

interface Props {
	ratings?: IRating;
	isCreateReview: boolean;
	setIsCreateReview: Dispatch<SetStateAction<boolean>>;
	user?: IUser;
}

export const RatingCard: FC<Props> = ({
	ratings,
	isCreateReview,
	setIsCreateReview,
	user,
}) => {
	const t = useTranslations();
	const router = useRouter();
	const handleCreate = () => {
		if (user) {
			setIsCreateReview(!isCreateReview);
		} else {
			router.push("/login");
		}
	};

	if (!ratings) return <RatingCardSkeleton />;

	return (
		<div className="w-[385px] p-5 shadow">
			<H3>{t("ratings")}</H3>
			<div className="mt-4 flex gap-3">
				<StarRating
					size={16}
					initialRating={Math.floor(getAverageRating(ratings) ?? 0)}
				/>
				<p>
					{getAverageRating(ratings)} {` ${t("outOf")}`} 5
				</p>
			</div>
			<p>
				{ratings?.total_count} {t("reviews")}
			</p>
			<div className="mt-5">
				<RatingBar
					total={ratings?.total_count}
					label={`5 ${t("5stars")}`}
					rating={ratings?.rating_5}
				/>
				<RatingBar
					total={ratings?.total_count}
					label={`4 ${t("stars")}`}
					rating={ratings?.rating_4}
				/>
				<RatingBar
					total={ratings?.total_count}
					label={`3 ${t("stars")}`}
					rating={ratings?.rating_3}
				/>
				<RatingBar
					total={ratings?.total_count}
					label={`2 ${t("stars")}`}
					rating={ratings?.rating_2}
				/>
				<RatingBar
					total={ratings?.total_count}
					label={`1 ${t("star")}`}
					rating={ratings?.rating_1}
				/>
			</div>
			<div className="flex justify-center">
				<Button
					variant="outlined"
					className="mt-6 w-[180px]!"
					onClick={handleCreate}
				>
					{!isCreateReview ? t("feedback") : t("cancelFeedback")}
				</Button>
			</div>
		</div>
	);
};
