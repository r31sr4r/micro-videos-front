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
	const { enqueueSnackbar } = useSnackbar();
	const [options, setOptions] = useState({
		page: 1,
		filter: '',
		per_page: 10,
		rowsPerPage: [10, 25, 30],
	});
	const { data, isFetching, error } = useGetCategoriesQuery(options);
	const [deleteCategory, deleteCategoryStatus] = useDeleteCategoryMutation();

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
		setOptions((prev) => ({ ...prev, page: page + 1 }));
	}

	function handleFilterChange(filterModel: GridFilterModel) {
		if (filterModel.quickFilterValues?.length) {
			const search = filterModel.quickFilterValues.join('');
			setOptions((prev) => ({ ...prev, filter: search }));
		} else {
			setOptions((prev) => ({ ...prev, filter: '' }));
		}
	}

	function handleOnPageSizeChange(perPage: number) {
		setOptions((prev) => ({ ...prev, per_page: perPage }));
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
