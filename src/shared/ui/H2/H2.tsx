import {FC} from "react";
import clsx from "clsx";

interface Props {
    children: string;
    className?: string;
}

export const H2:FC<Props> = ({children, className}) => {
    return(
        <h2 className={clsx("text-4xl font-bold",className)}>{children}</h2>
    )
}