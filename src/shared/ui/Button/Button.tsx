import { FC } from "react";
import clsx from "clsx";

interface Props {
    children: React.ReactNode;
    variant?: "outlined" | "filled" | "white" | "yellow";
    className?: string;
}

export const Button: FC<Props> = ({ children, variant = "filled", className }) => {
    return (
        <button
            type="button"
            className={clsx(
                "px-4 py-2 cursor-pointer rounded-md w-full transition-colors duration-200 font-bold border border-[3px] border-primary",
                variant === "outlined" &&
                "text-primary bg-transparent hover:bg-primary/20",
                variant === "filled" &&
                "bg-primary text-white hover:bg-primary hover:bg-primary/80",
                variant === "white" &&
                "bg-white/20 text-white border-white hover:bg-white hover:bg-white/80",
                className
            )}
        >
            {children}
        </button>
    );
};
