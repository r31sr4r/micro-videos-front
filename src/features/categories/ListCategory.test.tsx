import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {
	fireEvent,
	renderWithProviders,
	screen,
	waitFor,
} from '../../utils/test-utils';
import { baseUrl } from '../api/apiSlice';
import { CategoryList } from './ListCategory';
import { categoryResponse, categoryResponsePage2 } from './mocks';

export const handlers = [
	rest.get(`${baseUrl}/categories`, (req, res, ctx) => {
		console.log(req.url.searchParams.get('page'));
		if (req.url.searchParams.get('page') === '2') {
			return res(ctx.json(categoryResponsePage2), ctx.delay(150));
		}
		return res(ctx.json(categoryResponse), ctx.delay(150));
	}),

	rest.delete(
		`${baseUrl}/categories/887b0585-3848-4da0-8d1b-912ae612eb4b`,
		(_, res, ctx) => {
			return res(ctx.delay(150), ctx.status(204));
		}
	),
];

const server = setupServer(...handlers);

describe('ListCategory', () => {
	afterAll(() => server.close());
	afterEach(() => server.resetHandlers());
	beforeAll(() => server.listen());

	it('should render successfully', () => {
		const { asFragment } = renderWithProviders(<CategoryList />);
		expect(asFragment()).toMatchSnapshot();
	});

	it('should render loading state', () => {
		renderWithProviders(<CategoryList />);
		const loading = screen.getByRole('progressbar');
		expect(loading).toBeInTheDocument();
	});

	it('should render success state', async () => {
		renderWithProviders(<CategoryList />);
		await waitFor(() => {
			const name = screen.getByText('Action');
			expect(name).toBeInTheDocument();
		});
	});

	it('should render error state', async () => {
		server.use(
			rest.get(`${baseUrl}/categories`, (_, res, ctx) => {
				return res(ctx.status(500));
			})
		);
		renderWithProviders(<CategoryList />);
		await waitFor(() => {
			const error = screen.getByText('Error loading categories');
			expect(error).toBeInTheDocument();
		});
	});

	it('should handle on page change', async () => {
		renderWithProviders(<CategoryList />);
		await waitFor(() => {
			const page = screen.getByText('Action');
			expect(page).toBeInTheDocument();
		});

		const nextButton = screen.getByTestId('KeyboardArrowRightIcon');
		fireEvent.click(nextButton);

		await waitFor(() => {
			const page = screen.getByText('Anime');
			expect(page).toBeInTheDocument();
		});
	});

	it('should handle filter change', async () => {
		renderWithProviders(<CategoryList />);
		await waitFor(() => {
			const page = screen.getByText('Action');
			expect(page).toBeInTheDocument();
		});

		const input = screen.getByPlaceholderText('Search…');
		fireEvent.change(input, { target: { value: 'Drama' } });

		await waitFor(() => {
			const loading = screen.getByRole('progressbar');
			expect(loading).toBeInTheDocument();
		});
	});

	it('should handle Delete Category success', async () => {
		renderWithProviders(<CategoryList />);
		await waitFor(() => {
			const page = screen.getByText('Action');
			expect(page).toBeInTheDocument();
		});

		const deleteButton = screen.getByTestId('delete-button');
		fireEvent.click(deleteButton);

		await waitFor(() => {
			const text = screen.getByText('Category deleted successfully');
			expect(text).toBeInTheDocument();
		});
	});
});
