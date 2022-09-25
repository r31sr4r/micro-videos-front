import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import categoryReducer, { categoryApiSlice } from '../features/categories/categorySlice';
import { apiSlice } from '../features/api/apiSlice';

export const store = configureStore({
	reducer: {
		categories: categoryReducer,
		[apiSlice.reducerPath]: apiSlice.reducer,
		[categoryApiSlice.reducerPath]: apiSlice.reducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
