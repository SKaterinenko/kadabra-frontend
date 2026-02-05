export interface IProduct {
	id: number;
	name: string;
	slug: string;
	sub_category_id: number;
	manufacturer_id: number;
	short_description: string;
	description: string;
	variations: IVariation[];
	created_at: string;
	updated_at: string;
}

interface IVariation {
	id: number;
	name: string;
	image: string;
	price: number;
}

export interface ResProducts {
	data: IProduct[];
	total_count: number;
}

export interface ICategory {
	id: number;
	name: string;
	slug: string;
	created_at: string;
	updated_at: string;
}

export interface ISubCategory {
	id: number;
	name: string;
	slug: string;
	category_id: string;
	created_at: string;
	updated_at: string;
}

export interface IProductsType {
	id: number;
	name: string;
	sub_category_id: string;
	created_at: string;
	updated_at: string;
}

export interface IProductsTypeByCategory extends ISubCategory {
	products_type: IProductsType[];
}

export interface IManufacturer {
	id: number;
	category_ids: number[];
	name: string;
	slug: string;
	description: string;
	created_at: string;
	updated_at: string;
}

export interface ProductsFilters {
	categories?: (number | undefined)[];
	types?: number[];
	manufacturers?: number[];
	limit?: number;
	offset?: number;
}

export interface IProductWithParents {
	id: number;
	name: string;
	slug: string;
	product_type_id: number;
	manufacturer_id: number;
	short_description: string;
	description: string;
	variations: IVariation[];
	created_at: string;
	updated_at: string;
	product_type: IProductType;
	manufacturer: {
		id: number;
		name: string;
		slug: string;
	};
}

interface IProductType {
	id: number;
	name: string;
	sub_category: SubCategory;
}

interface SubCategory {
	id: number;
	name: string;
	category: ICategory;
}

export interface IUser {
	id: number;
	first_name: string;
	last_name: string;
	email: string;
	birth_date: string;
	phone_number: string;
	gender: "male" | "female";
	created_at: string;
	updated_at: string;
}

export interface ILoginRequest {
	email: string;
	password: string;
}

export interface IRegisterRequest {
	first_name: string;
	last_name: string;
	email: string;
	birth_date: string;
	phone_number?: string;
	gender: "male" | "female";
	password: string;
	repeat_password: string;
}
