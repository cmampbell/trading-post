import { act } from "@testing-library/react";
import UserRegisterForm from "./UserRegisterForm";
import renderWithRouter from '../_common/renderWithRouter'
import userEvent from '@testing-library/user-event'
import { waitFor } from "@testing-library/react";

jest.mock("react-router", () => ({
    ...jest.requireActual("react-router"),
    useOutletContext: function() {
        return {
            register: jest.fn(() => 'registered')
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
            userEvent.type(getByLabelText('Email *'), 'test@email.com');
        })

        await waitFor(()=> {
            expect(getByLabelText('Username *')).toHaveValue('test');
            expect(getByLabelText('Password *')).toHaveValue('password');
            expect(getByLabelText('Email *')).toHaveValue('test@email.com');
        })
    });

    it('should send form data on submit', async () => {

        const { queryByLabelText, queryByRole } = renderWithRouter(<UserRegisterForm />);
 
        act(() => {
            userEvent.type(queryByLabelText('Username *'), 'test');
            userEvent.type(queryByLabelText('Password *'), 'password');
            userEvent.type(queryByLabelText('Email *'), 'test@email.com');
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
            expect(getByLabelText('Email *')).toBeInvalid();
        })
    })
});