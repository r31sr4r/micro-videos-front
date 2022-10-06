import {
	Box,
	Paper,
	Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Category, useCreateCategoryMutation } from './categorySlice';
import { CategoryForm } from './components/CategoryForm';
import { useSnackbar } from 'notistack'

export const CategoryCreate = () => {
	const { enqueueSnackbar } = useSnackbar()
	const [createCategory, status] = useCreateCategoryMutation();
	const [isdisabled, setIsDisabled] = useState(false);
	const [categoryState, setCategoryState] = useState<Category>({
		id: '',
		name: '',
		description: '',
		is_active: true,
		created_at: null,
	});

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();	
		const payload = {
			name: categoryState.name,
			description: categoryState.description,
			is_active: categoryState.is_active,
		};
		await createCategory(payload);
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
		if (status.isSuccess) {
			enqueueSnackbar('Category created successfully', { variant: 'success' })
			setIsDisabled(true);
		}
		if (status.error) {
			enqueueSnackbar('Error creating category', { variant: 'error' })
		}

	}, [enqueueSnackbar, status.error, status.isSuccess])

	return (
		<Box>
			<Paper>
				<Box p={2}>
					<Box mb={2}>
						<Typography variant="h4">Create Category</Typography>
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
