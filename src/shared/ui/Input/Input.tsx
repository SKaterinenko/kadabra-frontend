import clsx from "clsx";
import Image from "next/image";
import { forwardRef } from "react";
import type { FieldError } from "react-hook-form";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
	placeholder?: string;
	width?: number;
	search?: boolean;
	className?: string;
	classNameInput?: string;
	error?: FieldError;
}

export const Input = forwardRef<HTMLInputElement, Props>(
	(
		{ placeholder, width, search, className, classNameInput, error, ...props },
		ref,
	) => {
		return (
			<div className={clsx("relative inline-block", className)}>
				<input
					ref={ref}
					placeholder={placeholder}
					style={{ width }}
					className={clsx(
						"shadow py-3 px-6 rounded-[5px] focus-visible:outline-primary disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-light-gray",
						search && "pr-12",
						error && "border-red-500",
						classNameInput,
					)}
					{...props}
				/>

				{search && (
					<Image
						src="/images/search.svg"
						alt="search"
						width={23}
						height={23}
						className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
					/>
				)}
			</div>
		);
	},
);

Input.displayName = "Input";
