import { renderWithProviders } from '../../utils/test-utils';
import { CategoryEdit } from './EditCategory';

describe('EditCategory', () => {
    it('should render successfully', () => {
        const { asFragment } = renderWithProviders(<CategoryEdit />);
        expect(asFragment()).toMatchSnapshot();
    });
});