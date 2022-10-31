import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CastMemberForm } from './CastMemberForm';

const Props = {
	castMember: {
		id: '1',
		name: 'Test',
		type: 1,
		deleted_at: null,
		created_at: '2020-01-01',
		updated_at: '2020-01-01',
	},
	isDisabled: false,
	isLoading: false,
	handleSubmit: jest.fn(),
	handleChange: jest.fn(),
};

describe('CastMemberForm', () => {
	it('should render successfully', () => {
		const { asFragment } = render(<CastMemberForm {...Props} />, {
			wrapper: BrowserRouter,
		});
		expect(asFragment()).toMatchSnapshot();
	});

    it('should render loading', () => {
        const { asFragment } = render(<CastMemberForm {...Props} isLoading={true} />, {
            wrapper: BrowserRouter,
        });
        expect(asFragment()).toMatchSnapshot();
    });

    it('should render disabled', () => {
        const { asFragment } = render(<CastMemberForm {...Props} isDisabled={true} />, {
            wrapper: BrowserRouter,
        });
        expect(asFragment()).toMatchSnapshot();
    });
});
