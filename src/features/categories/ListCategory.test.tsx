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
		console.log(res);
		if (req.url.searchParams.get('page') === '2') {
			return res(ctx.json(categoryResponsePage2), ctx.delay(150));
		}

		return res(ctx.json(categoryResponse), ctx.delay(150));
	}),
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
});
