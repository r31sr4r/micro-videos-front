import {
	configureStore,
	ThunkAction,
	Action,
	combineReducers,
	PreloadedState,
} from '@reduxjs/toolkit';
import categoryReducer, {
	categoryApiSlice,
} from '../features/categories/categorySlice';
import { apiSlice } from '../features/api/apiSlice';
import { castMemberApiSlice } from '../features/cast/castMembesSlice';

const rootReducer = combineReducers({
	categories: categoryReducer,
	[apiSlice.reducerPath]: apiSlice.reducer,
	[categoryApiSlice.reducerPath]: categoryApiSlice.reducer,
	[castMemberApiSlice.reducerPath]: castMemberApiSlice.reducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
	return configureStore({
		reducer: rootReducer,
		preloadedState,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().concat(apiSlice.middleware),
	});
};

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
