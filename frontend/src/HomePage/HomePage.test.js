import HomePage from './HomePage';
import renderWithRouter from '../_common/renderWithRouter';

jest.mock("react-router", () => ({
    ...jest.requireActual("react-router"),
    useOutletContext: function () {
        return { currUser: null}
    }
}));

describe('HomePage component', () => {
    it('renders without crashing', () => {
        renderWithRouter(<HomePage />);
    });

    it('shows relevant links for anon', () => {
        const { queryByText } = renderWithRouter(<HomePage />);


        expect(queryByText('Trade!')).toBeInTheDocument();
        expect(queryByText('Login!')).toBeInTheDocument();
        expect(queryByText('Register!')).toBeInTheDocument();
    });
})
