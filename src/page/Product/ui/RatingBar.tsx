import type {FC} from "react";
import {Progress} from "@/src/shared/ui/Progress";

interface Props {
	total?: number;
	label: string;
	rating?: number;
}

export const RatingBar: FC<Props> = ({ total, label, rating }) => {
	const getPercent = (): number => {
		return (rating || 0 / (total || 0)) * 100;
	};

	return (
		<div className="flex gap-5 items-center">
			<p className="whitespace-nowrap w-[60px]">{label}:</p>
			<Progress className="w-[200px]!" value={getPercent()} />
			<p className="w-[45px]">{getPercent()}%</p>
		</div>
	);
};
