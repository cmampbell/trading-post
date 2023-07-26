import CardBinder from './CardBinder';
import renderWithRouter from '../_common/renderWithRouter';

jest.mock("react-router", () => ({
    ...jest.requireActual("react-router"),
    useOutletContext: function () {
        return {
            currUser: { username: 'test', id: 1 }
        }
    },
    useParams: function () {
        return { userId: 1 }
    }
}));

const serviceMock = {
    addCard: jest.fn(),
    editCard: jest.fn(),
    removeCard: jest.fn(),
    addFields: [],
    editFields: []
}


describe('CardBinder component', () => {
    it('renders without crashing', () => {
        renderWithRouter(
            <CardBinder
                binderType={'collection'}
                service={serviceMock}
            />);
    });

    it('shows relevant links', () => {
        const { queryByText } = renderWithRouter(
            <CardBinder
                binderType={'collection'}
                service={serviceMock}
            />);

        expect(queryByText(`test's collection`)).toBeInTheDocument();
        expect(queryByText('Add card to collection')).toBeInTheDocument();
    })
})