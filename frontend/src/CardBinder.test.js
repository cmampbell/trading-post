import CardBinder from './CardBinder';
import renderWithRouter from './renderWithRouter';

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


describe('CardBinder component', () => {
    it('renders without crashing', () => {
        renderWithRouter(
            <CardBinder
                binderType={'collection'}
                addCard={jest.fn()}
                editCard={jest.fn()}
                removeCard={jest.fn()}
                addFields={[]}
                editFields={[]}
            />);
    });

    it('shows relevant links', () => {
        const { queryByText } = renderWithRouter(
            <CardBinder
                binderType={'collection'}
                addCard={jest.fn()}
                editCard={jest.fn()}
                removeCard={jest.fn()}
                addFields={[]}
                editFields={[]} />);

        expect(queryByText(`test's collection`)).toBeInTheDocument();
        expect(queryByText('Add card to collection')).toBeInTheDocument();
    })
})