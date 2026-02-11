import { memo } from "react";
import { Checkbox } from "@/src/shared/ui/Checkbox";

export const FilterItem = memo(
	({
		id,
		label,
		checked,
		onToggle,
	}: {
		id: string;
		label: string;
		checked: boolean;
		onToggle: () => void;
	}) => (
		<div className="flex gap-2 items-center">
			<Checkbox id={id} checked={checked} onCheckedChange={onToggle} />
			<label htmlFor={id}>{label}</label>
		</div>
	),
);
