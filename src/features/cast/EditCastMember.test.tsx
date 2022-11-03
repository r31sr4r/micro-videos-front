import { renderWithProviders } from '../../utils/test-utils';
import { EditCastMember } from './EditCastMember';

describe('EditCastMember', () => {
    it('should render successfully', () => {
        const { asFragment } = renderWithProviders(<EditCastMember />);
        expect(asFragment()).toMatchSnapshot();
    });
});