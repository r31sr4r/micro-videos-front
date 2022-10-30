import { Box, Button, Typography } from '@mui/material';
import { GridFilterModel } from '@mui/x-data-grid';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
	useDeleteCastMemberMutation,
	useGetCastMembersQuery,
} from './castMembesSlice';
import { CastMembersTable } from './components/CastMembersTable';

export const ListCastMembers = () => {
	const { enqueueSnackbar } = useSnackbar();
	const [options, setOptions] = useState({
        page: 1,
        filter: '',
        per_page: 10,
        rowsPerPage: [10, 25, 30],
    });
	const { data, isFetching, error } = useGetCastMembersQuery(options);
	const [deleteCastMember, deleteCastMemberStatus] =
		useDeleteCastMemberMutation();

	async function handleDelete(id: string) {
		await deleteCastMember({ id });
	}

	function handleOnPageChange(page: number) {
		setOptions({ ...options, page: page + 1});
	}

	function handleOnPageSizeChange(per_page: number) {
		setOptions({ ...options, per_page });
	}

	function handleFilterChange(filterModel: GridFilterModel) {
		if (filterModel.quickFilterValues?.length) {
			const search = filterModel.quickFilterValues.join('');
			setOptions({ ...options, filter: search });
		}
		setOptions({ ...options, filter: '' });
	}

	useEffect(() => {
		if (deleteCastMemberStatus.isSuccess) {
			enqueueSnackbar('Cast member deleted successfully', {
				variant: 'success',
			});
		}
		if (deleteCastMemberStatus.error) {
			enqueueSnackbar('Error deleting cast member', {
				variant: 'error',
			});
		}
	}, [deleteCastMemberStatus, enqueueSnackbar]);

	if (error) {
		return (
			<Typography color="error">Error loading cast members</Typography>
		);
	}

	return (
		<Box maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
			<Box display="flex" justifyContent="flex-end">
				<Button
					variant="contained"
					color="secondary"
					component={Link}
					to="/cast-members/create"
					style={{ marginBottom: '1rem' }}
				>
					Create Cast Member
				</Button>
			</Box>
            <CastMembersTable
				data={data}
				isFetching={isFetching}
				perPage={options.per_page}
				rowsPerPage={options.rowsPerPage}
				handleDelete={handleDelete}
				handleOnPageChange={handleOnPageChange}
				handleFilterChange={handleFilterChange}
				handleOnPageSizeChange={handleOnPageSizeChange}
			/>
		</Box>
	);
};
