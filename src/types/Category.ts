import { SortDirection } from "./SortDirection";


export interface Results {
    items:       Item[];
    total:       number;
    currentPage: number;
    lastPage:    number;
    perPage:     number;
}

export interface Result {
    items:       Item;
    total:       number;
    currentPage: number;
    lastPage:    number;
    perPage:     number;
}

export interface Item {
    id:          string;
    name:        string;
    description: null;
    is_active:    boolean;
    created_at:   Date;
}

export interface CategoryParams {
	page?: number;
	per_page?: number;
	sort?: string;
	sort_dir?: SortDirection;
	filter?: string;
}

