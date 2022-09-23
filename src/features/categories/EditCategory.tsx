import { Box, Paper, Typography } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Category, selectCatoryById, updateCategory } from './categorySlice';
import { CategoryForm } from './components/CategoryForm';
import { useSnackbar } from 'notistack'

export const CategoryEdit = () => {
	const id = useParams<{ id: string }>().id || '';
	const [isdisabled, setIsDisabled] = React.useState(false);
	const category = useAppSelector((state) => selectCatoryById(state, id));
	const [categoryState, setCategoryState] = React.useState<Category>(category);
	const dispatch = useAppDispatch();
	const { enqueueSnackbar } = useSnackbar()

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();	
		dispatch(updateCategory(categoryState));
		enqueueSnackbar('Category updated successfully', { variant: 'success' })
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setCategoryState({ ...categoryState, [name]: value });
	};

	const handleToogle = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, checked } = e.target;
		setCategoryState({ ...categoryState, [name]: checked });
	};

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
					isdisabled={isdisabled}
					isLoading={false}
					handleSubmit={handleSubmit}
					handleChange={handleChange}
					handleToogle={handleToogle}
				/>
			</Paper>
		</Box>
	);
};
