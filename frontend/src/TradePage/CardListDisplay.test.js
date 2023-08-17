import CardListDisplay from "./CardListDisplay";
import renderWithRouter from "../_common/renderWithRouter"

// To-Do: write unit tests for list navigation
// To-Do: write integration tests

describe("Card list display unit tests", ()=> {
    it("should render without crashing", ()=> {
        renderWithRouter(<CardListDisplay />);
    });
});