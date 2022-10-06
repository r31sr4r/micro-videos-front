import { Box, Button, Typography } from '@mui/material';
import { GridFilterModel } from '@mui/x-data-grid';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
	useDeleteCategoryMutation,
	useGetCategoriesQuery,
} from './categorySlice';
import { CategoriesTable } from './components/CategoryTable';

export const CategoryList = () => {
	const [page, setPage] = useState(1);
	const [rowsPerPage, setRowsPerPage] = useState([2, 5, 10, 25]);
	const [per_page, setPerPage] = useState(2);
	const [filter, setFilter] = useState('');

	const options = { per_page, filter, page };

	const { data, isFetching, error } = useGetCategoriesQuery(options);
	const [deleteCategory, deleteCategoryStatus] = useDeleteCategoryMutation();
	
	const { enqueueSnackbar } = useSnackbar();

	useEffect(() => {
		if (deleteCategoryStatus.isSuccess) {
			enqueueSnackbar('Category deleted successfully', {
				variant: 'success',
			});
		}
		if (deleteCategoryStatus.error) {
			enqueueSnackbar('Error deleting category', {
				variant: 'error',
			});
		}
	}, [deleteCategoryStatus, enqueueSnackbar]);

	if (error) {
		return <Typography color="error">Error loading categories</Typography>;
	}

	async function handleDelete(id: string) {
		await deleteCategory({ id });
	}

	function handleOnPageChange(page: number) {
		setPage(page + 1);
	}

	function handleFilterChange(filterModel: GridFilterModel) {
		if (filterModel.quickFilterValues?.length) {
			const search = filterModel.quickFilterValues.join('');
			setFilter(search);
		} else {
			setFilter('');
		}
	}

	function handleOnPageSizeChange(perPage: number) {
		setPerPage(perPage);
	}

	return (
		<Box maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
			<Box display="flex" justifyContent="flex-end">
				<Button
					variant="contained"
					color="secondary"
					component={Link}
					to="/categories/create"
					style={{ marginBottom: '1rem' }}
				>
					Create Category
				</Button>
			</Box>
			<CategoriesTable
				data={data}
				isFetching={isFetching}
				perPage={per_page}
				rowsPerPage={rowsPerPage}
				handleDelete={handleDelete}
				handleOnPageChange={handleOnPageChange}
				handleFilterChange={handleFilterChange}
				handleOnPageSizeChange={handleOnPageSizeChange}
			/>
		</Box>
	);
};
