import clsx from "clsx";
import { type ButtonHTMLAttributes, forwardRef } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
	variant?: "outlined" | "filled" | "white" | "yellow";
	className?: string;
}

export const Button = forwardRef<HTMLButtonElement, Props>(
	(
		{ children, variant = "filled", className, type = "button", ...props },
		ref,
	) => {
		return (
			<button
				ref={ref}
				type={type}
				className={clsx(
					"px-4 py-2 cursor-pointer rounded-md w-full transition-colors duration-200 font-bold border-[3px] border-primary disabled:bg-light-gray disabled:opacity-50 disabled:border-light-gray disabled:cursor-not-allowed",
					variant === "outlined" &&
						"text-primary bg-transparent hover:bg-primary/20",
					variant === "filled" && "bg-primary text-white hover:bg-primary/80",
					variant === "white" &&
						"bg-white/20 text-white border-white hover:bg-white/80",
					className,
				)}
				{...props}
			>
				{children}
			</button>
		);
	},
);

Button.displayName = "Button";
