import HomePage from './HomePage';
import renderWithRouter from '../_common/renderWithRouter';

describe('HomePage component', () => {
    it('renders without crashing', () => {
        renderWithRouter(<HomePage />);
    });

    it('shows relevant links', () => {
        const { queryByText } = renderWithRouter(<HomePage />);

        expect(queryByText('Trade!')).toBeInTheDocument();
        expect(queryByText('Register!')).toBeInTheDocument();
    })
})
