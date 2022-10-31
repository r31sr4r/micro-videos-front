import { SortDirection } from "./SortDirection";

export interface Results {
    meta: Meta;
    data: Category[];    
}

export interface Result {
    meta: Meta;
    data: Category;
}

export interface Category {
    id:          string;
    name:        string;
    description?: string | null;
    is_active:    boolean;
    created_at:   Date;
}

export interface Meta {
	page?: number;
	per_page?: number;
	sort?: string;
	sort_dir?: SortDirection;
	filter?: string;
    total?: number;
}

export interface CategoryParams {
    page?: number;
    per_page?: number;
    sort?: string;
    sort_dir?: SortDirection;
    filter?: string;
}

