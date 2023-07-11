import UserPage from "./UserPage";
import renderWithRouter from './renderWithRouter'

describe("UserPage tests", ()=> {
    it('should render without crashing', ()=> {
        renderWithRouter(<UserPage/>)
    })
})