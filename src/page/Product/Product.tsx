import {Header} from "@/src/entities/Header";
import {Footer} from "@/src/entities/Footer";
import {FC} from "react";
import { IProductWithParents} from "@/src/shared/api/types";
import {Breadcrumbs} from "@/src/shared/ui/Breadcrumb";

interface Props {
    product: IProductWithParents
}

export const Product:FC<Props> = ({product}) => {
    const href = `/category/${product?.product_type?.sub_category?.category?.slug}`

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
                <h1>{product.name}</h1>
            </div>
            <Footer />
        </main>
    )
}