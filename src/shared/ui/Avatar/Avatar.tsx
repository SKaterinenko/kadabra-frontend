import clsx from "clsx";
import Image from "next/image";
import type {FC} from "react";
import {AvatarFallback, AvatarImage, RadixAvatar} from "./RadixAvatar";

interface Props {
	src?: string;
	alt?: string;
	size?: number;
}

export const Avatar: FC<Props> = ({ src, alt = "Avatar", size = 75 }) => {
	return (
		<RadixAvatar className={clsx(`w-[${size}px]! h-[${size}px]!`)}>
			<AvatarImage src={src} alt={alt} className="grayscale" />
			<AvatarFallback>
				<Image src="/images/avatar.svg" alt="Avatar" fill />
			</AvatarFallback>
		</RadixAvatar>
	);
};
