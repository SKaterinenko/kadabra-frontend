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
import {Button} from "@/src/shared/ui/Button";
import {Slider} from "@/src/entities/Slider";
import {useGetProducts} from "@/src/shared/api/client/productsClient";
import {Banner} from "@/src/shared/ui/Banner";

interface Props {
    product: IProductWithParents
}

export const Product:FC<Props> = ({product}) => {
    const href = `/category/${product?.product_type?.sub_category?.category?.slug}`
    const [selected, setSelected] = useState(0)
    const [quantity, setQuantity] = useState(1)
    const price = product?.variations?.[selected]?.price
    const {data: products} = useGetProducts({})

    return (
        <main>
            <Header />
            <div className="container flex flex-col gap-5">
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
                    <div className="w-[520px] h-[600px]">
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
                        <p className="text-xl">Производитель: {product?.manufacturer?.name}</p>
                        <H2>${price}</H2>
                        <p className="text-xl">{product?.short_description}</p>
                        <div className="flex justify-between gap-10 items-center text-xl">
                            <div className="flex gap-2">
                                <p>Количество:</p>
                                <div className="flex justify-between w-[75px]  border px-[8px] rounded-[3px]">
                                    <span
                                    className="cursor-pointer text-primary text-base"
                                    onClick={() => setQuantity(quantity > 1 ? quantity - 1 : quantity)}>
                                        -
                                    </span>
                                    <p className='text-base'>{quantity}</p>
                                    <span className="cursor-pointer text-primary text-base"
                                          onClick={() => setQuantity(quantity + 1)}>
                                        +
                                    </span>
                                </div>
                            </div>
                            <div className="flex gap-5">
                                <p>Стоимость: </p>
                                <span className="text-primary font-bold text-2xl">${quantity * price}</span>
                            </div>
                        </div>
                        <div className="flex justify-between gap-5">
                            <Button className="!bg-yellow-500 border-yellow-500">
                                Купить
                            </Button>
                            <Button variant="outlined">
                                В корзину
                            </Button>
                        </div>


                    </div>
                </div>
                <div>
                    <p className="font-bold text-2xl">Товары, которые также могут вам понравиться:</p>
                    <Slider data={products?.data} />
                </div>
                <Banner path="/images/banner6.png"/>
                <div className="flex">
                    <div>
                        <H2>
                            Характеристики товара:
                        </H2>
                        <p>
                            {product?.description}
                        </p>
                    </div>
                    <div></div>
                </div>

            </div>
            <Footer />
        </main>
    )
}