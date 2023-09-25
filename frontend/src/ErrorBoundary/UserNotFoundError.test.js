import UserNotFoundError from './UserNotFoundError';
import renderWithRouter from '../_common/renderWithRouter';

describe("Unit test for <UserNotFoundError/>, logged in user", () => {
    it("should render without crashing", () => {
        renderWithRouter(<UserNotFoundError/>);
    });

    it("should render correct error message when user id can't be find", () => {
        const {queryByText} = renderWithRouter(<UserNotFoundError/>)

        expect(queryByText("Sorry, there is no such user with that id.")).toBeInTheDocument();
    });
})