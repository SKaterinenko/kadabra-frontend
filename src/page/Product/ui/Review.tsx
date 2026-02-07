import type {FC} from "react";
import type {IReview} from "@/src/shared/api/types";
import {Avatar} from "@/src/shared/ui/Avatar";
import StarRating from "@/src/shared/ui/StarRating/StarRating";

interface Props {
	review: IReview;
}

export const Review: FC<Props> = ({ review }) => (
	<div className="p-5 shadow flex gap-3">
		<div className="w-[100px]">
			<Avatar src={review?.user?.avatar} />
		</div>
		<div className="flex flex-col gap-6">
			<div className="flex flex-col gap-2">
				<p>{`${review?.user?.first_name} ${review?.user.last_name}`}</p>
				<StarRating initialRating={review?.rating} size={16} editable={false} />
			</div>
			<p>{review?.description}</p>
		</div>
	</div>
);
