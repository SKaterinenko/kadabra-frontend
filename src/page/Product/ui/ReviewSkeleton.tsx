import type {FC} from "react";
import {Skeleton} from "@/src/shared/ui/Skeleton";

export const ReviewSkeleton: FC = () => (
	<div className="p-5 shadow flex gap-4">
		<Skeleton className="rounded-full! w-[75px] h-[75px]" />
		<div className="flex w-full flex-col gap-6">
			<div className="flex flex-col gap-2">
				<Skeleton className="h-[20px] w-[200px]" />
				<Skeleton className="h-[16px] w-[150px] mt-2" />
			</div>
			<div className="flex flex-col gap-2">
				<Skeleton className="h-[24px] w-full" />
				<Skeleton className="h-[24px] w-full" />
				<Skeleton className="h-[24px] w-full" />
			</div>
		</div>
	</div>
);
