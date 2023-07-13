import { act } from "@testing-library/react";
import UserRegisterForm from "./UserRegisterForm";
import renderWithRouter from './renderWithRouter'
import userEvent from '@testing-library/user-event'
import { waitFor } from "@testing-library/react";

jest.mock("react-router", () => ({
    ...jest.requireActual("react-router"),
    useOutletContext: function() {
        return {
            register: jest.fn(() => 'logged in')
        }
}
}));

describe("UserRegisterForm tests", () => {
    it('should render without crashing', () => {
        renderWithRouter(<UserRegisterForm />);
    });

    it('should handle user input', async () => {
        const { getByLabelText } = renderWithRouter(<UserRegisterForm />);

        act(() => {
            userEvent.type(getByLabelText('Username *'), 'test');
            userEvent.type(getByLabelText('Password *'), 'password');
        })

        await waitFor(()=> {
            expect(getByLabelText('Username *')).toHaveValue('test');
            expect(getByLabelText('Password *')).toHaveValue('password');
        })
    });

    it('should send form data on submit', async () => {
        const { queryByLabelText, queryByRole } = renderWithRouter(<UserRegisterForm />);
 
        act(() => {
            userEvent.type(queryByLabelText('Username *'), 'test');
            userEvent.type(queryByLabelText('Password *'), 'password');
            userEvent.click(queryByRole('button'));
        })

        //TODO: figure out a way to test if register got called
    });

    it('should display error if fields not complete', async ()=> {
        const {queryByRole, getByLabelText} = renderWithRouter(<UserRegisterForm />);

        act(() => {
            userEvent.click(queryByRole('button'));
        })

        await waitFor(()=> {
            expect(getByLabelText('Username *')).toBeInvalid();
            expect(getByLabelText('Password *')).toBeInvalid();
        })

    })
});