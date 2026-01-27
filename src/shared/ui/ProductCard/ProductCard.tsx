import Image from "next/image";
import StarRating from "@/src/shared/ui/StarRating/StarRating";
import {ICategory, IProduct} from "@/src/shared/api/types";
import {FC} from "react";
import clsx from "clsx";
import Link from "next/link";

interface Props {
    data: IProduct | ICategory;
    subTitle?: string;
}

export const ProductCard:FC<Props> = ({data, subTitle}) => {
    if (!data) { return }

    return (
        <Link href={`/product/${data?.slug}`}  className="shadow rounded-[3px] max-h-[370px]">
            <div>
                <Image src="/images/product1.png" width={300} height={222} alt="Product"/>
            </div>
            <div className="py-[25px] px-[15px]">
                <p className={clsx(subTitle && "font-bold text-2xl")}>{data?.name}</p>
                <div className="mt-[10px]">
                    {!subTitle ?  <StarRating initialRating={4} editable={false} size={20} />
                        : <p className="text-primary!">{subTitle}</p> }
                </div>
            </div>
        </Link>
    )
}