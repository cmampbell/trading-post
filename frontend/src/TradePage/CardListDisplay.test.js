import CardListDisplay from "./CardListDisplay";
import renderWithRouter from "../_common/renderWithRouter"

describe("Card list display unit tests", ()=> {
    it("should render without crashing", ()=> {
        renderWithRouter(<CardListDisplay />)
    })
})