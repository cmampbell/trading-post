import UnauthorizedError from './UnauthorizedError';
import renderWithRouter from '../_common/renderWithRouter';

jest.mock("react-router", () => ({
    ...jest.requireActual("react-router"),
    useOutletContext: function () {
        return {}
    },
}));

describe("Unit tests for <UnauthorizedError/>", ()=> {
    it("should render without crashing", () => {
        renderWithRouter(<UnauthorizedError/>);
    });

    it("should render correct error message when no current user", () => {
        const {queryByText} = renderWithRouter(<UnauthorizedError/>)

        expect(queryByText("Sorry, you must be logged in to view user profiles. Log in or create an account with the buttons below.")).toBeInTheDocument();
    });
});