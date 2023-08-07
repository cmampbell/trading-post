"use strict";

const {
    NotFoundError, BadRequestError,
} = require("../expressError");

const WantList = require("./wantList.js");

const {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** getCardCollection */

describe("getWantList", function () {
    test("works", async function () {
        const wantList = await WantList.getWantList(1);

        expect(wantList.length).toEqual(1);
    });

    test("returns empty array if user has no cards in wantList", async () => {
        const wantList = await WantList.getWantList(2);

        expect(wantList.length).toEqual(0);
    })

    test("not found if no such user", async function () {
        try {
            await WantList.getWantList(0);
            fail();
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy();
        }
    });
});

/************************************** getCardInCollection */

describe("getCardInWantList", function () {
    test("works", async function () {
        const card = await WantList.getCardInWantList(1, 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11');

        expect(card).toHaveProperty('id');
        expect(card).toHaveProperty('oracle_id');
        expect(card).toHaveProperty('image_uri');
        expect(card).toHaveProperty('usd_price');
        expect(card).toHaveProperty('mana_cost');
        expect(card).toHaveProperty('oracle_text')
        expect(card).toHaveProperty('power');
        expect(card).toHaveProperty('toughness');
        expect(card).toHaveProperty('set_name');
        expect(card).toHaveProperty('set_code');
        expect(card).toHaveProperty('collector_number');
        expect(card).toHaveProperty('artist');
    });

    test("not found if card not in want list", async () => {
        try {
            await WantList.getCardInWantList(1, '1111579f-7b35-4ed3-b44c-db2a538066fe');
            fail();
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy();
        }
    })
});

/************************************** addCardToCollection */

describe("addCardToWantList", function () {

    const newCard = {
        userID: 1,
        cardID: '0000579f-7b35-4ed3-b44c-db2a538066fe',
        forTrade: true,
        quantity: 2,
        foil: "Yes",
    }

    test("works", async function () {
        await WantList.addCardToWantList(newCard);

        const collection = await WantList.getWantList(1);

        expect(collection.length).toEqual(2);
    });

    test("not found if no such user", async function () {
        try {
            await WantList.addCardToWantList({ ...newCard, userID: 0 });
            fail();
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy();
        }
    });
});

/************************************** updateCardInWantList */

describe("updateCardInWantList", function () {

    test("works", async function () {
        const updatedCard = await WantList.updateCardInWantList(1, 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', { quantity: 5 });

        expect(updatedCard.quantity).toEqual(5);
    })

    test("BadRequest trying to update cardID", async function () {
        try {
            await WantList.updateCardInWantList(1, 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', { cardID: 'yu-gi-oh' });
            fail();
        } catch (err) {
            expect(err instanceof BadRequestError).toBeTruthy();
        }
    })

    test("BadRequest trying to update userID", async function () {
        try {
            await WantList.updateCardInWantList(1, 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', { userID: 10 });
            fail();
        } catch (err) {
            expect(err instanceof BadRequestError).toBeTruthy();
        }
    })

    test("not found if user doesn't exist", async function () {
        try {
            await WantList.updateCardInWantList(0, 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', { foil: true, quantity: 4 });
            fail();
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy();
        }
    })

    test("not found if card doesn't exist", async function () {
        try {
            await WantList.updateCardInWantList(1, '0000bc99-9c0b-4ef8-bb6d-6bb9bd380a11', { foil: true, quantity: 4 });
            fail();
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy();
        }
    })
})


/************************************** removeCardFromWantList */

describe("removeCardFromWantList", function () {

    const userID = 1;
    const cardID = '0000579f-7b35-4ed3-b44c-db2a538066fe';

    test("works", async function () {
        await WantList.removeCardFromWantList(userID, cardID);

        const collection = await WantList.getWantList(1);

        expect(collection.length).toEqual(1);

        const card = collection[0]

        expect(card.id).toEqual('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11')
    });
});