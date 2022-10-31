import { GridFilterModel } from '@mui/x-data-grid';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CastMembersTable } from './CastMembersTable';

const Props = {
	data: {
		data: [
			{
				id: '1',
				name: 'Test',
				type: 1,
				deleted_at: null,
				created_at: '2020-01-01',
				updated_at: '2020-01-01',
			},
		],
		meta: {
			page: 1,
			per_page: 1,
			total: 1,
		},
		links: {
			first: 'http://localhost:8000/api/cast_members?page=1',
			last: 'http://localhost:8000/api/cast_members?page=1',
			prev: '',
			next: '',
		},
	},
	perPage: 10,
	isFetching: false,
	rowsPerPage: [10, 20, 30],
	handleOnPageChange: (page: number) => {},
	handleFilterChange: (filterModel: GridFilterModel) => {},
	handleOnPageSizeChange: (perPage: number) => {},
	handleDelete: (id: string) => {},
};

describe('CastMembersTable', () => {
	it('should render successfully', () => {
		const { asFragment } = render(<CastMembersTable {...Props} />, {
			wrapper: BrowserRouter,
		});
		expect(asFragment()).toMatchSnapshot();
	});

	it('should render loading', () => {
		const { asFragment } = render(
			<CastMembersTable {...Props} isFetching={true} />,
			{
				wrapper: BrowserRouter,
			}
		);
		expect(asFragment()).toMatchSnapshot();
	});

	it('should render empty', () => {
		const { asFragment } = render(
			<CastMembersTable
				{...Props}
				data={{ data: [], meta: {}, links: {} }}
			/>,
			{
				wrapper: BrowserRouter,
			}
		);
		expect(asFragment()).toMatchSnapshot();
	});

	it('should render with type', () => {
		const { asFragment } = render(
			<CastMembersTable
				{...Props}
				data={{
					data: [{ ...Props.data.data[0], type: 2 }],
					meta: { ...Props.data.meta },
					links: { ...Props.data.links },
				}}
			/>,
			{
				wrapper: BrowserRouter,
			}
		);
		expect(asFragment()).toMatchSnapshot();
	});
});
