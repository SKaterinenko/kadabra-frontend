// app/components/StarRating.tsx
"use client";

import {Star} from "lucide-react";
import {useState} from "react";

type StarRatingProps = {
	maxStars?: number;
	initialRating?: number;
	editable?: boolean;
	size?: number;
	emptyColor?: string;
	onChange?: (rating: number) => void;
	showValue?: boolean;
	className?: string;
};

export const StarRating = ({
	maxStars = 5,
	initialRating = 0,
	editable = false,
	size = 32,
	onChange,
	className = "",
}: StarRatingProps) => {
	const [rating, setRating] = useState(initialRating);
	const [hoverRating, setHoverRating] = useState(0);

	const handleClick = (starIndex: number) => {
		if (!editable) return;

		const newRating = starIndex + 1;
		setRating(newRating);
		onChange?.(newRating);
	};

	const handleMouseEnter = (starIndex: number) => {
		if (!editable) return;
		setHoverRating(starIndex + 1);
	};

	const handleMouseLeave = () => {
		if (!editable) return;
		setHoverRating(0);
	};

	// Определяем, заполнена ли звезда
	const isStarFilled = (starIndex: number): boolean => {
		if (!editable) {
			return starIndex < rating;
		}

		if (hoverRating > 0) {
			return starIndex < hoverRating;
		}

		return starIndex < rating;
	};

	return (
		<div className={`flex flex-col items-start gap-2 ${className}`}>
			<div className="flex items-center gap-[2px]">
				{Array.from({ length: maxStars }).map((_, index) => (
					<button
						key={Math.random()}
						type="button"
						onClick={() => handleClick(index)}
						onMouseEnter={() => handleMouseEnter(index)}
						onMouseLeave={handleMouseLeave}
						disabled={!editable}
						className={`
              transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
              ${
								editable
									? "cursor-pointer hover:scale-110 active:scale-95"
									: "cursor-default"
							}
              ${isStarFilled(index) ? "animate-pulse-once" : ""}
            `}
						aria-label={`${index + 1} ${index + 1 === 1 ? "звезда" : index + 1 < 5 ? "звезды" : "звёзд"}`}
					>
						<Star
							size={size}
							strokeWidth={1.5}
							fill={
								isStarFilled(index) ? "var(--color-primary)" : "transparent"
							}
							color={
								isStarFilled(index)
									? "var(--color-primary)"
									: "var(--color-primary)"
							}
							className={`
                transition-all duration-200
                ${isStarFilled(index) ? "drop-shadow-lg" : ""}
              `}
						/>
					</button>
				))}
			</div>
		</div>
	);
};
