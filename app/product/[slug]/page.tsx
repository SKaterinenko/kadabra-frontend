import type { FC } from "react";
import { Product } from "@/src/page/Product";
import { getProductBySlug } from "@/src/shared/api/server/products";

interface Props {
	params: Promise<{ slug: string }>;
}

const ProductPage: FC<Props> = async ({ params }) => {
	const { slug } = await params;
	const product = await getProductBySlug(slug);

	return <Product product={product} />;
};

export default ProductPage;
