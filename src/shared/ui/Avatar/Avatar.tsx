import Image from "next/image";
import type { FC } from "react";
import { AvatarFallback, AvatarImage, RadixAvatar } from "./RadixAvatar";

interface Props {
	src?: string;
	alt?: string;
	size?: number;
}

export const Avatar: FC<Props> = ({ src, alt = "Avatar", size = 75 }) => {
	return (
		<RadixAvatar style={{ width: size, height: size }} className="bg-muted">
			<AvatarImage src={src} alt={alt} className="object-cover" />
			<AvatarFallback>
				<Image src="/images/avatar.svg" alt="Avatar" fill />
			</AvatarFallback>
		</RadixAvatar>
	);
};
