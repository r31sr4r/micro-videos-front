import { render } from '@testing-library/react';
import { Header } from './Header';

describe('Header', () => {
	it('should render successfully', () => {
		const { asFragment } = render(
			<Header
				toggle={() => {}}
				theme="dark"
				handleDwawerToggle={() => {}}
			/>
		);
		expect(asFragment()).toMatchSnapshot();
	});
});
