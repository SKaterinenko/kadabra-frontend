import { Category } from "@/src/page/Category";
import { FC } from "react";
import {getCategoryById} from "@/src/shared/api/server/categories";

interface Props {
    params: Promise<{ id: string }>
}

const CategoryPage: FC<Props> = async ({ params }) => {
    const { id } = await params;
    const category = await getCategoryById(id)

    return (
        <div>
            <Category name={category?.name} id={id} />
        </div>
    );
}

export default CategoryPage;