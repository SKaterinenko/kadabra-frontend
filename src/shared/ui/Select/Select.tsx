"use client";

import clsx from "clsx";
import type * as React from "react";
import {
	RadixSelect,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./RadixSelect";

type SelectOption = {
	label: React.ReactNode;
	value: string;
	disabled?: boolean;
};

type SelectProps = {
	placeholder?: string;
	options: SelectOption[];

	value?: string;
	defaultValue?: string;
	onValueChange?: (value: string) => void;

	disabled?: boolean;
	className?: string;
};

export function Select({
	placeholder,
	options,
	value,
	defaultValue,
	onValueChange,
	disabled,
	className,
}: SelectProps) {
	return (
		<RadixSelect
			value={value}
			defaultValue={defaultValue}
			onValueChange={onValueChange}
			disabled={disabled}
		>
			<SelectTrigger className={clsx("w-full ", className)}>
				<SelectValue placeholder={placeholder} />
			</SelectTrigger>

			<SelectContent position="popper">
				<SelectGroup>
					{options.map((option) => (
						<SelectItem
							key={option.value}
							value={option.value}
							disabled={option.disabled}
						>
							{option.label}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</RadixSelect>
	);
}
