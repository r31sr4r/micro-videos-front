import { Box, IconButton, Typography } from '@mui/material';
import { Results } from '../../../types/Category';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import {
	DataGrid,
	GridColDef,
	GridRowsProp,
	GridToolbar,
	GridFilterModel
} from '@mui/x-data-grid';

type Props = {
	data: Results | undefined;
	perPage: number;
	isFetching: boolean;
	rowsPerPage?: number[];

	handleOnPageChange: (page: number) => void;
	handleFilterChange: (filterModel: GridFilterModel) => void;
	handleOnPageSizeChange: (perPage: number) => void;
	handleDelete: (id: string) => void;
};

export function CategoriesTable({
	data,
	perPage,
	isFetching,
	rowsPerPage,
	handleOnPageChange,
	handleFilterChange,
	handleOnPageSizeChange,
	handleDelete,
}: Props) {
	const componentProps = {
		toolbar: {
			showQuickFilter: true,
			quickFilterProps: {
				debounceMs: 500,
			},
		},
	};

	const mapDataToGridRows = (data: Results) => {
		const { items: categories } = data;
		return categories.map((category) => ({
			id: category.id,
			name: category.name,
			description: category.description,
			is_active: category.is_active,
			created_at: new Date(category.created_at).toLocaleDateString(
				'pt-BR'
			),
		}));
	};

	const rows: GridRowsProp = data ? mapDataToGridRows(data) : [];

	const columns: GridColDef[] = [
		{
			field: 'name',
			headerName: 'Name',
			flex: 1,
			renderCell: renderNameCell,
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
			field: 'id',
			headerName: 'Actions',
			type: 'string',
			flex: 1,
			renderCell: renderActionsCell,
		},
	];

	function renderNameCell(rowData: any) {
		return (
			<Link
				style={{ textDecoration: 'none' }}
				to={`/categories/edit/${rowData.id}`}
			>
				<Typography color="primary">{rowData.value}</Typography>
			</Link>
		);
	}

	function renderIsActiveCell(rowData: any) {
		return (
			<Typography color={rowData.value ? 'primary' : 'secondary'}>
				{rowData.value ? 'Active' : 'Inactive'}
			</Typography>
		);
	}

	function renderActionsCell(params: any) {
		return (
			<IconButton
				color="secondary"
				onClick={() => handleDelete(params.value)}
				arial-label="delete"
			>
				<DeleteIcon />
			</IconButton>
		);
	}

	const rowCounter = data?.total || 0;

	return (
		<Box sx={{ display: 'flex', height: 600 }}>
			<DataGrid
				checkboxSelection={false}
				columns={columns}
				components={{ Toolbar: GridToolbar }}
				componentsProps={componentProps}
				disableColumnFilter={true}
				disableColumnSelector={true}
				disableDensitySelector={true}
				disableSelectionOnClick={true}
				filterMode={'server'}
				loading={isFetching}
				pageSize={perPage}
				paginationMode={'server'}
				rowCount={rowCounter}
				rows={rows}
				rowsPerPageOptions={rowsPerPage}
				onFilterModelChange={handleFilterChange}
				onPageChange={handleOnPageChange}
				onPageSizeChange={handleOnPageSizeChange}
			/>
		</Box>
	);
}
