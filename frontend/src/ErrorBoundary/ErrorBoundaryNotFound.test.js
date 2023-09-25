import ErrorBoundary from './ErrorBoundary';
import renderWithRouter from '../_common/renderWithRouter';

jest.mock("react-router", () => ({
    ...jest.requireActual("react-router"),
    useRouteError: function () {
        return [
            {status: 404}
        ]
    },
    useOutletContext: function () {
        return {
            currUser: { username: 'test', id: 1 }
        }
    },
    useParams: function () {
        return {
            userId: 5,
        }
    }
}));

describe("Unit tests for <ErrorBoundary/>", ()=> {
    it("should render without crashing", () => {
        renderWithRouter(<ErrorBoundary/>);
    });

    it("should render correct error message for 404 code", () => {
        const {queryByText} = renderWithRouter(<ErrorBoundary/>)

        expect(queryByText(`Sorry, there is no such user with that id.`)).toBeInTheDocument();
    });
});