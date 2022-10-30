import { SortDirection } from "./SortDirection";

export interface Results {
    data: CastMember[];
    links: Links;
    meta: Meta;
}

export interface Result {
    meta: Meta;
    data: CastMember;
}

export interface CastMember {
    id: string;
    name: string;
    type: number;
    deleted_at: null;
    created_at: string;
    updated_at: string;
}

export interface Links {
    prev: null;
    last: string;
    next: string;
    first: string;
}

export interface Meta {
	page?: number;
	per_page?: number;
	sort?: string;
	sort_dir?: SortDirection;
	filter?: string;
    total?: number;
}

export interface CastMembersParams {
    page?: number;
    per_page?: number;
    sort?: string;
    sort_dir?: SortDirection;
    filter?: string;
}