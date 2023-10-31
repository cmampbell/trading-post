"use strict";

const {
    NotFoundError, BadRequestError,
} = require("../expressError");

const Trade = require("./trade.js");

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

/************************************** getUserTrades */

describe("getUserTrades", function () {
    test("works", async function () {
        const tradeList = await Trade.getUserTrades(1);

        expect(tradeList.length).toEqual(1); 

        const trade1 = tradeList[0]
        expect(trade1.original_owners_and_cards).toEqual(expect.any(Object));

        expect(trade1.original_owners_and_cards).toHaveProperty('1');
        
        const user1TradedAway = trade1.original_owners_and_cards['1'];

        expect(user1TradedAway).toEqual(expect.any(Array));
        expect(user1TradedAway[0]).toHaveProperty('card_id');
        console.log(user1TradedAway);

        // expect(tradeList[0].cards.length).toEqual(2);
        // expect(tradeList[0].cards[0].original_owner).toEqual(1);
        // expect(tradeList[0].cards[1].original_owner).toEqual(2);

        // You need to return an array of trade objects for the specified user.
        // Each trade object should include the Trade date, the users involved
        // Each user should include an array of card objects, that includes the cards that user traded away
    });

    test("returns empty array if user has made no trades ", async () => {
        const tradeList = await Trade.getUserTrades(3);

        expect(tradeList.length).toEqual(0);
    })

    test("not found if no such user", async function () {
        try {
            await Trade.getUserTrades(0);
            fail();
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy();
        }
    });
});

/************************************** recordTrade */
// describe("recordTrade", function () {
//     test("works", async function () {
//         const collection = await Trade.recordTrade(user1, user2, user1Cards, user2Cards);

//         expect(collection.rows.length).toEqual(2);
//         expect(collection.owner).toEqual('user1');
//     });

//     test("returns empty array if user has made no trades ", async () => {
//         const collection = await Trade.getUserTrades(1);

//         expect(collection.rows.length).toEqual(0);
//         expect(collection.owner).toEqual('user3');
//     })

//     test("not found if no such user", async function () {
//         try {
//             await Trade.getUserTrades(0);
//             fail();
//         } catch (err) {
//             expect(err instanceof NotFoundError).toBeTruthy();
//         }
//     });
// });