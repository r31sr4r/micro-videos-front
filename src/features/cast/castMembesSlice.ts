import {
    CastMember,
    CastMembersParams,
    Result,
    Results
} from '../../types/CastMembers';
import { apiSlice } from '../api/apiSlice';

const endpointUrl = '/cast_members';

export const initialState: CastMember = {
	id: '',
	name: '',
	type: 0,
	deleted_at: null,
	created_at: '',
	updated_at: '',
};

function parseQueryParams(params: CastMembersParams) {
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

function getCastMembers(params: CastMembersParams) {
	const { page, per_page, sort, sort_dir, filter } = params;
	return `${endpointUrl}?${parseQueryParams({
		page,
		per_page,
		sort,
		sort_dir,
		filter,
	})}`;
}

function deleteCastMember({ id }: { id: string }) {
	return {
		url: `${endpointUrl}/${id}`,
		method: 'DELETE',
	};
}

function createCastMember(castMember: CastMember) {
	return {
		url: endpointUrl,
		method: 'POST',
		body: castMember,
	};
}

function updateCastMember(castMember: CastMember) {
    return {
        url: `${endpointUrl}/${castMember.id}`,
        method: 'PUT',
        body: castMember,
    };
}

function getCastMember({ id }: { id: string }) {
    return {
        url: `${endpointUrl}/${id}`,
        method: 'GET',
    }
}

export const castMemberApiSlice = apiSlice.injectEndpoints({
	endpoints: ({ query, mutation }) => ({
		getCastMembers: query<Results, CastMembersParams>({
			query: getCastMembers,
			providesTags: ['CastMembers'],
		}),
		deleteCastMember: mutation<Result, { id: string }>({
			query: deleteCastMember,
			invalidatesTags: ['CastMembers'],
		}),
		createCastMember: mutation<Result, CastMember>({
			query: createCastMember,
			invalidatesTags: ['CastMembers'],
		}),
        updateCastMember: mutation<Result, CastMember>({
            query: updateCastMember,
            invalidatesTags: ['CastMembers'],
        }),
        getCastMember: query<Result, { id: string }>({
            query: getCastMember,
            providesTags: ['CastMembers'],
        }),
	}),
});

export const {
	useGetCastMembersQuery,
	useDeleteCastMemberMutation,
	useCreateCastMemberMutation,
    useUpdateCastMemberMutation,
    useGetCastMemberQuery,
} = castMemberApiSlice;
