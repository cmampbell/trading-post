import CollectionPage from './CollectionPage';
import renderWithRouter from './renderWithRouter';

jest.mock("react-router", () => ({
    ...jest.requireActual("react-router"),
    useOutletContext: function() {
        return {
            currUser: {username: 'test', id: 1}
        }
}
}));

describe('CollectionPage component', () => {
    it('renders without crashing', () => {
        renderWithRouter(<CollectionPage />);
    });

    it('shows relevant links', () => {
        const { queryByText } = renderWithRouter(<CollectionPage />);

        expect(queryByText(`test's collection`)).toBeInTheDocument();
        expect(queryByText('Add card to collection')).toBeInTheDocument();
    })
})