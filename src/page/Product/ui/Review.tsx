"use client";

import Image from "next/image";
import { type FC, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import type { IReview } from "@/src/shared/api/types";
import { Avatar } from "@/src/shared/ui/Avatar";
import { StarRating } from "@/src/shared/ui/StarRating";

interface Props {
	review: IReview;
}

export const Review: FC<Props> = ({ review }) => {
	const [open, setOpen] = useState(false);
	const [photoIndex, setPhotoIndex] = useState(0);

	const slides = review?.images.map((src) => ({ src })) || [];

	const handleImageClick = (index: number) => {
		setPhotoIndex(index);
		setOpen(true);
	};

	return (
		<>
			<div className="p-5 shadow flex gap-4">
				<div>
					<Avatar src={review?.user?.avatar} />
				</div>
				<div className="flex flex-col gap-6">
					<div className="flex flex-col gap-2">
						<p>{`${review?.user?.first_name} ${review?.user.last_name}`}</p>
						<StarRating
							initialRating={review?.rating}
							size={16}
							editable={false}
						/>
					</div>
					<p>{review?.description}</p>
					<div className="flex gap-2 mt-3">
						{review?.images.map((el, index) => (
							<Image
								key={el}
								width={80}
								height={100}
								src={el}
								alt="Review image"
								className="border rounded-[3px] border-gray cursor-pointer hover:opacity-80 transition-opacity"
								onClick={() => handleImageClick(index)}
							/>
						))}
					</div>
				</div>
			</div>

			<Lightbox
				open={open}
				close={() => setOpen(false)}
				slides={slides}
				index={photoIndex}
				carousel={{
					finite: review?.images.length <= 1,
				}}
				controller={{
					closeOnBackdropClick: true,
				}}
			/>
		</>
	);
};
