import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Result, Results } from '../../types/Category';
import { apiSlice } from '../api/apiSlice';

export interface Category {
	id: string;
	name: string;
	description: string | null;
	is_active: boolean;
	deleted_at: string | null;
	created_at: string;
	updated_at: string;
}

const endpointUrl = '/categories';

const deleteCategoryMutation = (category: Category) => {
	return {
		url: `${endpointUrl}/${category.id}`,
		method: 'DELETE',
	};
};

export const categoryApiSlice = apiSlice.injectEndpoints({
	endpoints: ({ query, mutation }) => ({
		getCategories: query<Results, void>({
			query: () => `${endpointUrl}`,
			providesTags: ['Categories'],
		}),
		deleteCategory: mutation<Result, { id: string }>({
			query: deleteCategoryMutation,
			invalidatesTags: ['Categories'],
		}),
	}),
});

export const { useGetCategoriesQuery, useDeleteCategoryMutation } =
	categoryApiSlice;

const category: Category = {
	id: '1',
	name: 'Category 1',
	description: 'Category 1 description',
	is_active: true,
	deleted_at: null,
	created_at: '2021-01-01 00:00:00',
	updated_at: '2021-01-01 00:00:00',
};

export const initialState = [
	category,
	{
		...category,
		id: '2',
		name: 'Category 2',
		created_at: '2021-05-12 00:00:00',
		updated_at: '2021-01-02 00:00:00',
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
			deleted_at: null,
			created_at: '',
			updated_at: '',
		}
	);
};

export default categorySlice.reducer;
export const { createCategory, updateCategory, deleteCategory } =
	categorySlice.actions;
