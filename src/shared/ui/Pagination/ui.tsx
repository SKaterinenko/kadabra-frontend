import clsx from "clsx";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import type * as React from "react";

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
	<nav
		role="navigation"
		aria-label="pagination"
		className={clsx("", className)}
		{...props}
	/>
);
Pagination.displayName = "Pagination";

const PaginationContent = ({
	ref,
	className,
	...props
}: React.ComponentProps<"ul"> & {
	ref?: React.RefObject<HTMLUListElement | null>;
}) => (
	<ul
		ref={ref}
		className={clsx("flex flex-row items-center gap-1", className)}
		{...props}
	/>
);
PaginationContent.displayName = "PaginationContent";

const PaginationItem = ({
	ref,
	className,
	...props
}: React.ComponentProps<"li"> & {
	ref?: React.RefObject<HTMLLIElement | null>;
}) => <li ref={ref} className={clsx("p-0", className)} {...props} />;
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = {
	isActive?: boolean;
} & React.ComponentProps<"a">;

const PaginationLink = ({
	className,
	isActive,
	...props
}: PaginationLinkProps) => (
	<a
		aria-current={isActive ? "page" : undefined}
		className={clsx("cursor-pointer", className)}
		{...props}
	/>
);
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = ({
	className,
	...props
}: React.ComponentProps<typeof PaginationLink>) => (
	<PaginationLink
		aria-label="Go to previous page"
		className={clsx("gap-1", className)}
		{...props}
	>
		<ChevronLeft className="text-inherit cursor-pointer" />
	</PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = ({
	className,
	...props
}: React.ComponentProps<typeof PaginationLink>) => (
	<PaginationLink
		aria-label="Go to next page"
		className={clsx("gap-1", className)}
		{...props}
	>
		<ChevronRight className="text-inherit cursor-pointer" />
	</PaginationLink>
);
PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = ({
	className,
	...props
}: React.ComponentProps<"span">) => (
	<span
		aria-hidden
		className={clsx("flex h-9 w-9 items-center justify-center", className)}
		{...props}
	>
		<MoreHorizontal className="text-secondary h-4 w-4" />
	</span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
};
