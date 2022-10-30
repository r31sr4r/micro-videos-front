import { Box, IconButton, Typography } from '@mui/material';
import { Results } from '../../../types/CastMembers';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import {
	DataGrid,
	GridColDef,
	GridRowsProp,
	GridToolbar,
	GridFilterModel,
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

export function CastMembersTable({
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
		const { data: castMembers } = data;
		return castMembers.map((castMember) => ({
			id: castMember.id,
			name: castMember.name,
			type: castMember.type,
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
			field: 'type',
			headerName: 'Type',
			flex: 1,
			renderCell: renderTypeCell,
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
				to={`/cast-members/edit/${rowData.id}`}
			>
				<Typography color="primary">{rowData.value}</Typography>
			</Link>
		);
	}

	function renderTypeCell(rowData: any) {
		return (
			<Typography color="primary">
				{rowData.value === 1 ? 'Director' : 'Actor'}
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

	const rowCounter = data?.meta.total || 0;

	return (
		<Box sx={{ display: 'flex', height: 400 }}>
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
				onFilterModelChange={handleFilterChange}
				onPageChange={handleOnPageChange}
				onPageSizeChange={handleOnPageSizeChange}
				pageSize={perPage}
				paginationMode={'server'}
				rowCount={rowCounter}
				rows={rows}
				rowsPerPageOptions={rowsPerPage}
			/>
		</Box>
	);
}
