"use strict";

const {
    NotFoundError, BadRequestError,
} = require("../expressError");

const Trade = require("./cardCollection.js");

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

        expect(tradeList.rows.length).toEqual(2);
        expect(tradeList.rows[0].user1).toEqual('user1');
        expect(tradeList.rows[0].user2).toEqual('user2');
    });

    test("returns empty array if user has made no trades ", async () => {
        const tradeList = await Trade.getUserTrades(3);

        expect(tradeList.rows.length).toEqual(0);
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