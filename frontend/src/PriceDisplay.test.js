import { render } from "@testing-library/react";
import PriceDisplay from "./PriceDisplay";

const testCard1 = {
    art_uri: "https://cards.scryfall.io/art_crop/front/c/b/cbc085e9-bbb2-463a-b35c-bee13008a2c6.jpg?1682718882",
    artist: "Thomas M. Baxa",
    collector_number: "337",
    id: "cbc085e9-bbb2-463a-b35c-bee13008a2c6",
    name: "Ulamog, the Infinite Gyre",
    oracle_id: "b817bc56-9b4d-4c50-bafa-3c652b99578f",
    set_code: "2x2",
    set_name: "Double Masters 2022",
    usd_etched_price: null,
    usd_foil_price: "32.03",
    usd_price: "25.48",
    foil: 'No'
}

describe("Price Display Unit Tests", () => {
    it("should render without crashing", ()=> {
        render(<PriceDisplay />)
    })

    it("should display the price of a card from card", ()=> {
        const {getByText} = render(<PriceDisplay card={testCard1}/>)

        expect(getByText('$25.48')).toBeInTheDocument();
    });

    it("should display the price of a card from formData", ()=> {
        const {getByText} = render(<PriceDisplay card={{usd_price: '2.00'}} formData={{ foil: "No"}}/>);

        expect(getByText('$2.00')).toBeInTheDocument();
    });

    it("should use quantity if given in formData", () => {
        const {getByText} = render(<PriceDisplay card={{usd_price: '2.00', quantity: 3}} formData={{ foil: "No"}}/>);

        expect(getByText('$6.00')).toBeInTheDocument();
    })

    it("should use quantity if given in card", () => {
        const {getByText} = render(<PriceDisplay card={{...testCard1, quantity: 3, foil: "Yes"}}/>);

        expect(getByText('$96.09')).toBeInTheDocument();
    })

    it("should display the total price of a list of cards", ()=> {
        const {getByText} = render(<PriceDisplay cards={[{usd_price: '2.00', quantity: 3, foil: "No"}, {usd_price: '5.00', quantity: 10, foil: "No"}]}/>);

        expect(getByText('$56.00')).toBeInTheDocument();
    });
})