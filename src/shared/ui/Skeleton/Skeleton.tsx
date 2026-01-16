import clsx from "clsx";
import React from "react";


function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="skeleton"
            className={clsx("bg-light-gray animate-pulse rounded-md", className)}
            {...props}
        />
    )
}

export { Skeleton }
