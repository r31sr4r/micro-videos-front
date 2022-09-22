import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

interface Category {
	id: string;
	name: string;
	description: string | null;
	is_active: boolean;
	deleted_at: string | null;
	created_at: string;
	updated_at: string;
}

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
	{ ...category, id: '2', name: 'Category 2', created_at: '2021-05-12 00:00:00', updated_at: '2021-01-02 00:00:00' },
	{ ...category, id: '3', name: 'Category 3', is_active: false },
];

const categorySlice = createSlice({
	name: 'category',
	initialState: initialState,
	reducers: {
		createCategory: (state, action) => {},
		updateCategory: (state, action) => {},
		deleteCategory: (state, action) => {},
	},
});

export const selectCategories = (state: RootState) => state.categories;

export default categorySlice.reducer;
