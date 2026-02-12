import type {FC} from "react";
import {Product} from "@/src/page/Product";
import {getProductBySlug} from "@/src/shared/api/server/products";

interface Props {
	params: Promise<{ slug: string; locale: string }>;
}

const ProductPage: FC<Props> = async ({ params }) => {
	const { slug, locale } = await params;
	const product = await getProductBySlug(slug, locale);

	return <Product product={product} />;
};

export default ProductPage;
