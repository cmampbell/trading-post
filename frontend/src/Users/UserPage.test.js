import UserPage from "./UserPage";
import renderWithRouter from '../_common/renderWithRouter'
import { screen } from '@testing-library/react';

jest.mock("react-router", () => ({
    ...jest.requireActual("react-router"),
    useLoaderData: function () {
        return {
                username: 'test',
                id: 1,
                created_at: '2023-07-13T04:00:00.000Z',
                email: 'test@gmail.com'
        }
    },
    useOutletContext: function () {
        return {
            currUser: { username: 'test', id: 1 }
        }
    },
}));

describe("UserPage tests", () => {
    it('should render without crashing', () => {
        renderWithRouter(<UserPage />);
    })

    it('should display user info', () => {
        const { queryByText } = renderWithRouter(<UserPage />);

        expect(queryByText('test')).toBeInTheDocument();
        expect(queryByText('2023-07-13')).toBeInTheDocument();
        expect(queryByText('test@gmail.com')).toBeInTheDocument();
    })
})