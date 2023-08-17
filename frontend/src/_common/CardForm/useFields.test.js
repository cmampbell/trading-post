import useFields from "./useFields";
import FoilSelectField from "./FormInputs/FoilSelectField";
import QuantitySelectField from "./FormInputs/QuantitySelectField";
import ForTradeField from "./FormInputs/ForTradeField";
import SetSelectField from "./FormInputs/SetSelectField";

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
    usd_price: "25.48"
};

describe(" Unit Tests for useFields", () => {
    it("should return an object", () => {
        expect(useFields([])).toEqual({});
    });

    it("should return an object with keys based on fields entered", () => {
        const result = useFields([FoilSelectField, QuantitySelectField, ForTradeField, SetSelectField], testCard1);

        expect(result).toEqual(expect.any(Object));

        expect(result).toHaveProperty('foil');
        expect(result).not.toHaveProperty('set');
        expect(result).toHaveProperty('quantity');
        expect(result).toHaveProperty('forTrade');

        expect(result.foil).toEqual("No");
        expect(result.quantity).toEqual(1);
        expect(result.forTrade).toEqual(false);
    });
});