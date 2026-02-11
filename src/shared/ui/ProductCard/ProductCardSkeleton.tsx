import type { FC } from "react";
import { Skeleton } from "@/src/shared/ui/Skeleton";

export const ProductCardSkeleton: FC = () => {
	return (
		<div>
			<Skeleton className="h-[243px] w-[243px]" />
			<div className="py-[25px] px-[15px]">
				<Skeleton className="h-[25px]" />
				<Skeleton className="h-[25px] mt-1" />
				<div className="mt-[10px]">
					<Skeleton className="h-[25px]" />
				</div>
			</div>
		</div>
	);
};
