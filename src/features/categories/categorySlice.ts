import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { CategoryParams, Result, Results } from '../../types/Category';
import { apiSlice } from '../api/apiSlice';
import { SortDirection } from '../../types/SortDirection';

export interface Category {
	id: string;
	name: string;
	description: string | null;
	is_active: boolean;
	created_at: string | null;
}

const endpointUrl = '/categories';

function parseQueryParams(params: CategoryParams) {
	const queryParams = new URLSearchParams();
	if (params.page) {
		queryParams.append('page', params.page.toString());
	}

	if (params.per_page) {
		queryParams.append('per_page', params.per_page.toString());
	}

	if (params.filter) {
		queryParams.append('filter', params.filter);
	}

	if (params.sort) {
		queryParams.append('sort', params.sort);
	}

	if (params.sort_dir) {
		queryParams.append('sort_dir', params.sort_dir);
	}

	return queryParams.toString();
}

function getCategories({
	page = 1,
	per_page = 10,
	sort = 'name',
	sort_dir = 'asc' as SortDirection,
	filter = '',
}) {
	const params = { page, per_page, sort, sort_dir, filter };

	return `${endpointUrl}?${parseQueryParams(params)}`;
}

function deleteCategoryMutation(category: Category) {
	return {
		url: `${endpointUrl}/${category.id}`,
		method: 'DELETE',
	};
}

function createCategoryMutation(category: Category) {
	return {
		url: endpointUrl,
		method: 'POST',
		body: category,
	};
}

function updateCategoryMutation(category: Category) {
	return {
		url: `${endpointUrl}/${category.id}`,
		method: 'PUT',
		body: category,
	};
}

function getCategoryById({ id }: { id: string }): string {
	return `${endpointUrl}/${id}`;
}

export const categoryApiSlice: any = apiSlice.injectEndpoints({
	endpoints: ({ query, mutation }) => ({
		getCategories: query<Results, CategoryParams>({
			query: getCategories,
			providesTags: ['Categories'],
		}),
		getCategory: query<Result, { id: string }>({
			query: getCategoryById,
			providesTags: ['Categories'],
		}),
		deleteCategory: mutation<Result, { id: string }>({
			query: deleteCategoryMutation,
			invalidatesTags: ['Categories'],
		}),
		createCategory: mutation<Result, Category>({
			query: createCategoryMutation,
			invalidatesTags: ['Categories'],
		}),
		updateCategory: mutation<Result, Category>({
			query: updateCategoryMutation,
			invalidatesTags: ['Categories'],
		}),		
	}),
});

export const {
	useGetCategoriesQuery,
	useGetCategoryQuery,
	useDeleteCategoryMutation,
	useCreateCategoryMutation,
	useUpdateCategoryMutation,
} = categoryApiSlice;

const category: Category = {
	id: '1',
	name: 'Category 1',
	description: 'Category 1 description',
	is_active: true,
	created_at: '2021-01-01 00:00:00',
};

export const initialState = [
	category,
	{
		...category,
		id: '2',
		name: 'Category 2',
		created_at: '2021-05-12 00:00:00',
	},
	{ ...category, id: '3', name: 'Category 3', is_active: false },
];

const categorySlice = createSlice({
	name: 'category',
	initialState: initialState,
	reducers: {
		createCategory: (state, action) => {
			state.push(action.payload);
		},
		updateCategory: (state, action) => {
			const index = state.findIndex(
				(category) => category.id === action.payload.id
			);
			if (index !== -1) {
				state[index] = action.payload;
			}
		},
		deleteCategory: (state, action) => {
			const index = state.findIndex(
				(category) => category.id === action.payload.id
			);

			state.splice(index, 1);
		},
	},
});

export const selectCategories = (state: RootState) => state.categories;

export const selectCatoryById = (state: RootState, id: string) => {
	const category = state.categories.find((category) => category.id === id);

	return (
		category || {
			id: '',
			name: '',
			description: '',
			is_active: false,
			created_at: '',
		}
	);
};

export default categorySlice.reducer;
export const { createCategory, updateCategory, deleteCategory } =
	categorySlice.actions;
