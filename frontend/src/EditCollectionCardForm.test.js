import EditCollectionCardForm from "./EditCollectionCardForm";
import renderWithRouter from "./renderWithRouter";

const testCard = {
    artist: "Aleksi Briclot",
    card_id: "9464a820-65de-44f2-9895-46a35e8621a0",
    cmc: 11,
    collector_number: "3",
    color_identity: "",
    foil: "Yes",
    for_trade: false,
    id: "9464a820-65de-44f2-9895-46a35e8621a0",
    image_uri: "https://cards.scryfall.io/large/front/9/4/9464a820-65de-44f2-9895-46a35e8621a0.jpg?1673146911",
    mana_cost: "{11}",
    name: "Ulamog, the Infinite Gyre",
    oracle_id: "b817bc56-9b4d-4c50-bafa-3c652b99578f",
    oracle_text: "When you cast this spell, destroy target permanent.\nIndestructible\nAnnihilator 4 (Whenever this creature attacks, defending player sacrifices four permanents.)\nWhen Ulamog, the Infinite Gyre is put into a graveyard from anywhere, its owner shuffles their graveyard into their library.",
    power: "10",
    price: "25.47",
    quality: "Lightly Played",
    quantity: 1,
    rarity: "mythic",
    set_code: "2x2",
    set_name: "Double Masters 2022",
    textless: false,
    toughness: "10",
    type_line: "Legendary Creature — Eldrazi",
    usd_etched_price: null,
    usd_foil_price: "25.47",
    usd_price: "23.26",
    user_id: 4,
    variation: false,
}

describe("CollectionCardItem", () => {

    const setEditOpen = jest.fn();
    it("should render without crashing", () => {
        renderWithRouter(<EditCollectionCardForm card={testCard} editCard={true} setEditOpen={setEditOpen} />)
    })
})