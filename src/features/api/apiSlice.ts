import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseUrl = 'http://localhost:3000';
const bq = fetchBaseQuery({ baseUrl });

export const apiSlice = createApi({
	reducerPath: 'api',
	tagTypes: ['Categories', 'CastMembers'],
	endpoints: (builder) => ({}),
	async baseQuery(...args) {
		const result = await bq(...args);
		if (result.error) {
			console.log('Error on fetch', result.error);            
			throw result.error;
		}
		return result;
	},
});
