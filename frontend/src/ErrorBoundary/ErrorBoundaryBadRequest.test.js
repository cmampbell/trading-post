import ErrorBoundary from './ErrorBoundary';
import renderWithRouter from '../_common/renderWithRouter';

jest.mock("react-router", () => ({
    ...jest.requireActual("react-router"),
    useRouteError: function () {
        return [
            {status: 401}
        ]
    },
    useOutletContext: function () {
        return {}
    },
}));

describe("Unit tests for <ErrorBoundary/>", ()=> {
    it("should render without crashing", () => {
        renderWithRouter(<ErrorBoundary/>);
    });

    it("should render correct error message for 401 code", () => {
        const {queryByText} = renderWithRouter(<ErrorBoundary/>)

        expect(queryByText("Sorry, you must be logged in to view user profiles. Log in or create an account with the buttons below.")).toBeInTheDocument();
    });
});