import { renderWithProviders } from '../../utils/test-utils';
import { CreateCastMember } from './CreateCastMember';

describe('CreateCastMember', () => {
    it('should render successfully', () => {
        const { asFragment } = renderWithProviders(<CreateCastMember />);
        expect(asFragment()).toMatchSnapshot();
    });
});