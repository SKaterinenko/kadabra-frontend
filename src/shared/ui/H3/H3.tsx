import clsx from "clsx";
import type {FC} from "react";

interface Props {
	children?: React.ReactNode;
	className?: string;
}

export const H3: FC<Props> = ({ children, className }) => {
	return <h3 className={clsx("text-2xl font-bold", className)}>{children}</h3>;
};
