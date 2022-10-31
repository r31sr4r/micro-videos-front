import { GridFilterModel } from '@mui/x-data-grid';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CategoriesTable } from './CategoryTable';

const Props = {
	data: undefined,
	perPage: 10,
	isFetching: false,
	rowsPerPage: [10, 20, 30],
	handleOnPageChange: (page: number) => {},
	handleFilterChange: (filterModel: GridFilterModel) => {},
	handleOnPageSizeChange: (perPage: number) => {},
	handleDelete: (id: string) => {},
};

const mockData = {
	data: [
		{
			id: '1',
			name: 'Test',
			description: 'Description',
			is_active: true,
			created_at: new Date('2020-01-01'),
		},
	],
	meta: {
		page: 1,
		per_page: 1,
		total: 1,
	},
};

describe('CategoriesTable', () => {
	it('should render successfully', () => {
		const { asFragment } = render(<CategoriesTable {...Props} />, {
			wrapper: BrowserRouter,
		});
		expect(asFragment()).toMatchSnapshot();
	});

	it('should render loading', () => {
		const { asFragment } = render(
			<CategoriesTable {...Props} isFetching={true} />,
			{
				wrapper: BrowserRouter,
			}
		);
		expect(asFragment()).toMatchSnapshot();
	});

	it('should render with data', () => {
		const { asFragment } = render(
			<CategoriesTable {...Props} data={mockData} />,
			{
				wrapper: BrowserRouter,
			}
		);
		expect(asFragment()).toMatchSnapshot();
	});

	it('should render with inactive data', () => {
		const { asFragment } = render(
			<CategoriesTable
				{...Props}
				data={{
					...mockData,
					data: [
						{
							...mockData.data[0],
							is_active: false,
						},
					],
				}}
			/>,
			{
				wrapper: BrowserRouter,
			}
		);
		expect(asFragment()).toMatchSnapshot();
	});
});
