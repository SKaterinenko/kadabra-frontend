export interface IProduct {
    id: string
    name: string
    slug: string
    sub_category_id: string
    manufacturer_id: string
    short_description: string
    description: string
    created_at: string
    updated_at: string
}

export interface ICategory {
    id: string
    name: string
    slug: string
    created_at: string
    updated_at: string
}

export interface ISubCategory {
    id: string
    name: string
    slug: string
    category_id: string
    created_at: string
    updated_at: string
}

export interface IProductsType {
    id: string
    name: string
    sub_category_id: string
    created_at: string
    updated_at: string
}

export interface IProductsTypeByCategory extends ISubCategory  {
    products_type: IProductsType[]
}