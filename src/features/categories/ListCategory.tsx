import { Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { selectCategories } from './categorySlice';
import {
	DataGrid,
	GridRowsProp,
	GridColDef,
	GridToolbar,
} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';

export const CategoryList = () => {
	const categories = useAppSelector(selectCategories);

	const rows: GridRowsProp = categories.map((category) => ({
		id: category.id,
		name: category.name,
		description: category.description,
		is_active: category.is_active,
		created_at: new Date(category.created_at).toLocaleDateString('pt-BR'),
	}));

	const columns: GridColDef[] = [
		{
			field: 'name',
			headerName: 'Name',
			flex: 1,
		},
		{
			field: 'is_active',
			headerName: 'Active',
			type: 'boolean',
			flex: 1,
			renderCell: renderIsActiveCell,
		},
		{
			field: 'created_at',
			headerName: 'Created At',
			flex: 1,
		},
		{
			field: 'actions',
			headerName: 'Actions',
			flex: 1,
			renderCell: renderActionsCell,
		},
	];

	function renderActionsCell(params: any) {
		return (
			<IconButton
				color="secondary"
				onClick={() => console.log('delete', params.row.id)}
				arial-label="delete"
			>
				<DeleteIcon />
			</IconButton>
		);
	}

	function renderIsActiveCell(rowData: any) {
		return (
			<Typography color={rowData.value ? 'primary' : 'secondary'}>
				{rowData.value ? 'Active' : 'Inactive'}
			</Typography>
		);
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
			<div style={{ height: 300, width: '100%' }}>
				<DataGrid
					components={{ Toolbar: GridToolbar }}
					rowsPerPageOptions={[2, 10, 25, 50, 100]}
					disableColumnSelector={true}
					disableColumnFilter={true}
					disableDensitySelector={true}	
					disableSelectionOnClick={true}				
					rows={rows}
					columns={columns}
					componentsProps={{
						toolbar: {
							showQuickFilter: true,
							quickFilterProps: {
								debounceMs: 500,
							},
						},
					}}
				/>
			</div>
		</Box>
	);
};
