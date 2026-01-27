import type { FC } from "react"

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "./ui"
import clsx from "clsx";

interface Props {
    limit: number
    setOffset: (offset: number) => void
    // setLimit: (limit: number) => void
    totalCount: number | null | undefined
    offset: number
}

export const PaginationComponents: FC<Props> = ({ limit, setOffset, offset, totalCount }) => {
    if (totalCount === null || totalCount === undefined) {
        return null
    }

    const totalPages = Math.ceil(totalCount / limit)
    const currentPage = Math.floor(offset / limit) + 1

    const handlePageChange = (page: number) => {
        setOffset((page - 1) * limit)
    }

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            handlePageChange(currentPage - 1)
        }
    }

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            handlePageChange(currentPage + 1)
        }
    }

    const renderPageNumbers = () => {
        const pageNumbers = []
        const showEllipsisStart = currentPage > 4
        const showEllipsisEnd = currentPage < totalPages - 3

        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(renderPageButton(i))
            }
        } else {
            pageNumbers.push(renderPageButton(1))

            if (showEllipsisStart) {
                pageNumbers.push(<PaginationEllipsis key="ellipsis-start" />)
            }

            const startPage = Math.max(2, currentPage - 1)
            const endPage = Math.min(totalPages - 1, currentPage + 1)

            for (let i = startPage; i <= endPage; i++) {
                pageNumbers.push(renderPageButton(i))
            }

            if (showEllipsisEnd) {
                pageNumbers.push(<PaginationEllipsis key="ellipsis-end" />)
            }

            pageNumbers.push(renderPageButton(totalPages))
        }

        return pageNumbers
    }

    const renderPageButton = (pageNum: number) => (
        <PaginationItem key={pageNum}>
            <PaginationLink
                className={clsx(
                    "h-8 w-8 cursor-pointer p-0",
                    currentPage === pageNum && "bg-secondary h-8 w-9 rounded-full font-bold text-white",
                )}
                onClick={() => handlePageChange(pageNum)}
            >
                {pageNum}
            </PaginationLink>
        </PaginationItem>
    )

    return (
        <Pagination>
            <PaginationContent>
                {/*<div className="mr-4 flex items-center">*/}
                {/*    <p className="mr-2">on-page:</p>*/}
                {/*    <Select*/}
                {/*        menuPlacement="auto"*/}
                {/*        className="w-fit text-sm"*/}
                {/*        placeholder="number-records"*/}
                {/*        options={options}*/}
                {/*        value={options.find((option) => option?.value === limit)}*/}
                {/*        onChange={(newValue) => {*/}
                {/*            if (newValue) {*/}
                {/*                setLimit(newValue?.value)*/}
                {/*                setOffset(0)*/}
                {/*            }*/}
                {/*        }}*/}
                {/*    />*/}
                {/*</div>*/}
                {totalPages > 1 && (
                    <>
                        <PaginationItem>
                            <PaginationPrevious
                                className={clsx("cursor-pointer", currentPage === 1 && "cursor-not-allowed opacity-50")}
                                onClick={handlePreviousPage}
                            />
                        </PaginationItem>
                        {renderPageNumbers()}
                        <PaginationItem>
                            <PaginationNext
                                className={clsx(
                                    "cursor-pointer",
                                    currentPage === totalPages && "cursor-not-allowed opacity-50",
                                )}
                                onClick={handleNextPage}
                            />
                        </PaginationItem>
                    </>
                )}
            </PaginationContent>
        </Pagination>
    )
}
