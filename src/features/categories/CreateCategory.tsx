import {
	Box,
	Paper,
	Typography,
} from '@mui/material';
import { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { Category, createCategory } from './categorySlice';
import { CategoryForm } from './components/CategoryForm';
import { useSnackbar } from 'notistack'

export const CategoryCreate = () => {
	const [isdisabled, setIsDisabled] = useState(false);
	const [categoryState, setCategoryState] = useState<Category>({
		id: '',
		name: '',
		description: '',
		is_active: true,
		created_at: '',
		updated_at: '',
		deleted_at: ''
	});
	const dispatch = useAppDispatch();
	const { enqueueSnackbar } = useSnackbar()

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();	
		dispatch(createCategory(categoryState));
		enqueueSnackbar('Category created successfully', { variant: 'success' })
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
