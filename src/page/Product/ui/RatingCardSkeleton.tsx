import type { FC } from "react";
import { H3 } from "@/src/shared/ui/H3";
import { Skeleton } from "@/src/shared/ui/Skeleton";

export const RatingCardSkeleton: FC = () => {
	return (
		<div className="shadow p-5 w-[385px]">
			<H3>Оценки</H3>
			<Skeleton className="h-4 w-[150px] mt-4" />
			<Skeleton className="h-4 w-[75px] mt-2" />
			<div className="mt-5">
				<Skeleton className="h-[24px] mt-1" />
				<Skeleton className="h-[24px] mt-1" />
				<Skeleton className="h-[24px] mt-1" />
				<Skeleton className="h-[24px] mt-1" />
				<Skeleton className="h-[24px] mt-1" />
			</div>
		</div>
	);
};
