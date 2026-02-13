import Image from "next/image";
import type {FC} from "react";

interface Props {
	path: string;
}

export const Banner: FC<Props> = ({ path }) => {
	return (
		<div className="relative h-[310px] w-full">
			<Image src={path} alt="Banner" fill className="object-cover" priority />
		</div>
	);
};
