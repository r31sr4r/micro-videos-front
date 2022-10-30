import { Box, Paper, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Category, useGetCategoryQuery, useUpdateCategoryMutation } from './categorySlice';
import { CategoryForm } from './components/CategoryForm';
import { useSnackbar } from 'notistack'

export const CategoryEdit = () => {
	const id = useParams<{ id: string }>().id || '';
	const { data: category, isFetching } = useGetCategoryQuery({ id });
	const [updateCategory, status] = useUpdateCategoryMutation();

	const [categoryState, setCategoryState] = React.useState<Category>({
		id: '',
		name: '',
		description: '',
		is_active: true,
		created_at: null,		
	});

	const { enqueueSnackbar } = useSnackbar()

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();	
		await updateCategory(categoryState);
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setCategoryState({ ...categoryState, [name]: value });
	};

	const handleToogle = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, checked } = e.target;
		setCategoryState({ ...categoryState, [name]: checked });
	};

	useEffect(() => {
		if (category) {
			setCategoryState(category.data);
		}
	}, [category])

	useEffect(() => {
		if (status.isSuccess) {
			enqueueSnackbar('Category updated successfully', { variant: 'success' })
		}
		if (status.error) {
			enqueueSnackbar('Error updating category', { variant: 'error' })
		}
	}, [enqueueSnackbar, status.error, status.isSuccess])

	return (
		<Box>
			<Paper>
				<Box p={2}>
					<Box mb={2}>
						<Typography variant="h4">Edit Category</Typography>
					</Box>
				</Box>

				<CategoryForm
					category={categoryState}
					isdisabled={status.isLoading}
					isLoading={false}
					handleSubmit={handleSubmit}
					handleChange={handleChange}
					handleToogle={handleToogle}
				/>
			</Paper>
		</Box>
	);
};
