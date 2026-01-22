export interface IProduct {
    id: number
    name: string
    slug: string
    sub_category_id: number
    manufacturer_id: number
    short_description: string
    description: string
    created_at: string
    updated_at: string
}

export interface ICategory {
    id: number
    name: string
    slug: string
    created_at: string
    updated_at: string
}

export interface ISubCategory {
    id: number
    name: string
    slug: string
    category_id: string
    created_at: string
    updated_at: string
}

export interface IProductsType {
    id: number
    name: string
    sub_category_id: string
    created_at: string
    updated_at: string
}

export interface IProductsTypeByCategory extends ISubCategory  {
    products_type: IProductsType[]
}

export interface IManufacturer {
    id: number
    category_ids: number[]
    name: string
    slug: string
    description: string
    created_at: string
    updated_at: string
}

export interface ProductsFilters {
    categories?: number[];
    types?: number[];
    manufacturers?: number[];
}
