import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CategoryForm } from './CategoryForm';

const Props = {
	category: {
		id: '1',
		name: 'Test',
		description: 'Test',
		is_active: true,
		created_at: '2020-01-01',
	},
	isLoading: false,
	isDisabled: false,
	handleSubmit: () => {},
	handleChange: () => {},
	handleToggle: () => {},
};

describe('CategoryForm', () => {
	it('should render successfully', () => {
		const { asFragment } = render(<CategoryForm {...Props} />, {
			wrapper: BrowserRouter,
		});
		expect(asFragment()).toMatchSnapshot();
	});

	it('should render loading', () => {
		const { asFragment } = render(
			<CategoryForm {...Props} isLoading={true} isDisabled={true} />,
			{
				wrapper: BrowserRouter,
			}
		);
		expect(asFragment()).toMatchSnapshot();
	});
});
