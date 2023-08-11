import WebcamCardReader from "./WebcamCardReader";
import renderWithRouter from "../renderWithRouter";
import { waitFor, act, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

jest.mock('tesseract.js');
jest.mock('image-js');

describe("WebcamCardReader unit tests", () => {
    it('should render without crashing', () => {
        const getCardWithCamera = jest.fn();
        const closeCameraModal = jest.fn();
        renderWithRouter(<WebcamCardReader getCardWithCamera={getCardWithCamera} closeCameraModal={closeCameraModal} />)
    });

    it('should call getCardWithCamera and closeCameraModal on button click', async () => {
        const getCardWithCamera = jest.fn();
        const closeCameraModal = jest.fn();
        const { queryByText } = renderWithRouter(<WebcamCardReader getCardWithCamera={getCardWithCamera} closeCameraModal={closeCameraModal} />)

        await act( async()=> {
            userEvent.click(queryByText('Take Photo'))
        })

        await waitFor( async () => {
            expect(getCardWithCamera).toHaveBeenCalled();
            expect(closeCameraModal).toHaveBeenCalled();
        })
    });
});