import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "./Breadcrumb"
import clsx from "clsx";

type BreadcrumbItemType = {
    label: string
    href?: string
}

type BreadcrumbsProps = {
    items: BreadcrumbItemType[]
    className?: string
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
    return (
        <Breadcrumb className={clsx(className)}>
            <BreadcrumbList>
                {items.map((item, index) => {
                    const isLast = index === items.length - 1

                    return (
                        <span key={index} className="flex items-center">
              <BreadcrumbItem>
                {item.href && !isLast ? (
                    <BreadcrumbLink href={item.href}>
                        {item.label}
                    </BreadcrumbLink>
                ) : (
                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
                            {!isLast && <BreadcrumbSeparator />}
            </span>
                    )
                })}
            </BreadcrumbList>
        </Breadcrumb>
    )
}
