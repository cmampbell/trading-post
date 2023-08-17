import MobileNav from './MobileNav';
import renderWithRouter from "../_common/renderWithRouter";
import { waitFor, act } from '@testing-library/react';

describe('HomePage component', () => {
    it('renders without crashing', () => {
        renderWithRouter(<MobileNav />);
    });

    it('shows buttons', () => {
        const { queryByText } = renderWithRouter(<MobileNav />);

        waitFor(() => {
            expect(queryByText('User')).toBeInTheDocument();
            expect(queryByText('Trade')).toBeInTheDocument();
            expect(queryByText('Collection')).toBeInTheDocument();
        })
    })
})