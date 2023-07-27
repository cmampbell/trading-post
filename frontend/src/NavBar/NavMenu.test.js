import NavMenu from "./NavMenu";
import renderWithRouter from "../_common/renderWithRouter";
import userEvent from '@testing-library/user-event';
import { waitFor,  act } from '@testing-library/react';

describe("Unit Tests for NavMenu", () => {
    it("should render without crashing", () => {
        renderWithRouter(<NavMenu token='test' logout={jest.fn()} currUser={{username: 'test', id:1}}/>)
    })

    it("should display login and signup with no user", ()=> {
        const {queryByText, queryByRole} = renderWithRouter(<NavMenu logout={jest.fn()}/>)

        act(()=> {
            userEvent.click(queryByRole('button'));
        })

        waitFor(()=> {
            expect(queryByText('Trade')).toBeInTheDocument();
            expect(queryByText('Login')).toBeInTheDocument();
            expect(queryByText('Register')).toBeInTheDocument();
        })
    })
})