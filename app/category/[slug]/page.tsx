import { Category } from "@/src/page/Category";
import { FC } from "react";
import {getCategoryBySlug} from "@/src/shared/api/server/categories";

interface Props {
    params: Promise<{ slug: string }>
}

const CategoryPage: FC<Props> = async ({ params }) => {
    const { slug } = await params;
    const category = await getCategoryBySlug(slug)

    return (
            <Category category={category}/>
    );
}

export default CategoryPage;