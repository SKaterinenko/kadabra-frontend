import {FC} from "react";
import clsx from "clsx";

interface Props {
    children?: React.ReactNode;
    className?: string;
}

export const H1:FC<Props> = ({children, className}) => {
    return(
        <h1 className={clsx("text-6xl font-bold", className)}>{children}</h1>
    )
}