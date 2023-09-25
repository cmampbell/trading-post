import PageNotFoundError from './PageNotFoundError';
import renderWithRouter from '../_common/renderWithRouter';

describe("Unit tests for <PageNotFoundError/>", ()=> {
    it("should render without crashing", () => {
        renderWithRouter(<PageNotFoundError/>);
    });

    it("should render correct message", () => {
        const {queryByText} = renderWithRouter(<PageNotFoundError/>)

        expect(queryByText("Sorry, looks like this page doesn't exist.")).toBeInTheDocument();
    });
});