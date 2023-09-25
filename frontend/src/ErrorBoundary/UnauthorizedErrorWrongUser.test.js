import UnauthorizedError from './UnauthorizedError';
import renderWithRouter from '../_common/renderWithRouter';

jest.mock("react-router", () => ({
    ...jest.requireActual("react-router"),
    useOutletContext: function () {
        return {currUser : { username: 'test', id: 1 }}
    },
    useParams: function () {
        return {userId: 5}
    }
}));

describe("Unit test for <UnauthorizedError/>, logged in user", () => {
    it("should render without crashing", () => {
        renderWithRouter(<UnauthorizedError/>);
    });
    
    it("should render correct error message when logged in user doesn't match url param user", () => {
        const {queryByText} = renderWithRouter(<UnauthorizedError/>)

        expect(queryByText("Sorry, you only have access to your own collection. However, you can view this users For Trade and Want List with the buttons below.")).toBeInTheDocument();
    });
})