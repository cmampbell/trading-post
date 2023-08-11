import { act } from "@testing-library/react";
import UserLoginForm from "./UserRegisterForm";
import renderWithRouter from '../_common/renderWithRouter'
import userEvent from '@testing-library/user-event'
import { waitFor } from "@testing-library/react";

jest.mock("react-router", () => ({
    ...jest.requireActual("react-router"),
    useOutletContext: function() {
        return {
            login: jest.fn()
        }
}
}));

describe("UserRegisterForm tests", () => {
    it('should render without crashing', () => {
        renderWithRouter(<UserLoginForm />);
    });

    it('should handle user input', async () => {
        const { getByLabelText } = renderWithRouter(<UserLoginForm />);

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
        const { queryByLabelText, queryByRole } = renderWithRouter(<UserLoginForm />);
 
        act(() => {
            userEvent.type(queryByLabelText('Username *'), 'test');
            userEvent.type(queryByLabelText('Password *'), 'password');
            userEvent.click(queryByRole('button'));
        })
    });

    it('should display error if fields not complete', async ()=> {
        const {queryByRole, getByLabelText} = renderWithRouter(<UserLoginForm />);

        act(() => {
            userEvent.click(queryByRole('button'));
        })

        await waitFor(()=> {
            expect(getByLabelText('Username *')).toBeInvalid();
            expect(getByLabelText('Password *')).toBeInvalid();
        })
    })
});