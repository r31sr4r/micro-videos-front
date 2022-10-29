import { SortDirection } from "./SortDirection";

export interface Results {
    paginationPresenter: Meta;
    data: Category[];    
}

export interface Result {
    paginationPresenter: Meta;
    data: Category;
}

export interface Category {
    id:          string;
    name:        string;
    description: null;
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

