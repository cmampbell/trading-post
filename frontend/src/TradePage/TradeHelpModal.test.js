import TradeHelpModal from './TradeHelpModal';
import renderWithRouter from '../_common/renderWithRouter';

describe("TradeHelpModal Unit Tests", () => {
    it("should render without crashing", () => {
        const toggleHelpModal = jest.fn();
        renderWithRouter(<TradeHelpModal open={true} toggleHelpModal={toggleHelpModal} />);
    });
});