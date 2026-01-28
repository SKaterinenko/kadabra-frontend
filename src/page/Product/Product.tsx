"use client"
import {Header} from "@/src/entities/Header";
import {Footer} from "@/src/entities/Footer";
import {FC, useState} from "react";
import { IProductWithParents} from "@/src/shared/api/types";
import {Breadcrumbs} from "@/src/shared/ui/Breadcrumb";
import Image from "next/image";
import {H1} from "@/src/shared/ui/H1";
import {H2} from "@/src/shared/ui/H2";
import clsx from "clsx";

interface Props {
    product: IProductWithParents
}

export const Product:FC<Props> = ({product}) => {
    const href = `/category/${product?.product_type?.sub_category?.category?.slug}`
    const [selected, setSelected] = useState(0)

    return (
        <main>
            <Header />
            <div className="container">
                <Breadcrumbs
                    className="mt-5"
                    items={[
                        { label: "Главная", href: "/" },
                        { label: product?.product_type?.sub_category?.category?.name, href: href },
                        { label: product?.product_type?.sub_category?.name, href: href },
                        { label: product?.product_type?.name }
                    ]}
                />
                <div className="flex gap-[155px] mt-3">
                    <div className="max-w-[520px]">
                        <Image
                            src={product?.variations?.[selected]?.image}
                            className="w-full h-auto object-cover"
                            width={520}
                            height={600}
                            alt="Product"
                        />

                    </div>
                    <div className="flex flex-col gap-4">
                        <H1 className="!text-5xl mt-[37px]">
                            {product?.name}
                        </H1>
                        <div className="flex gap-3 w-[80px] h-[100px]">
                            {product?.variations.map((item, index) =>
                                <Image
                                  key={item.id}
                                  className={clsx("border cursor-pointer rounded-[3px] max-w-[80px] max-h-[100px] object-contain", selected == index ? "border-primary" : "border-gray")}
                                  onClick={() => setSelected(index)}
                                  src={item?.image}
                                  width={80}
                                  height={100}
                                  alt="Product" />
                            )}
                        </div>
                        <p>Производитель: {product?.manufacturer?.name}</p>
                        <H2>${product?.variations?.[selected]?.price}</H2>
                        <p>{product?.short_description}</p>
                        <div className="flex justify-between">
                            <p>Количество:</p>
                            <p>Стоимость:</p>
                        </div>

                    </div>

                </div>
            </div>
            <Footer />
        </main>
    )
}