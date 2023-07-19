"use strict";

const request = require("supertest");

const app = require("../app");
const User = require("../models/user");

const {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
    user1Token,
    user2Token
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** POST /collection/:userId/addCard */

describe("POST /collection/:userId/addCard", function () {

    const newCard = {
        userID: 1,
        cardID: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
        foil: "No",
        forTrade: true,
        quality: "Near Mint",
        quantity: 1
    }

    test("works for same user", async function () {
        const resp = await request(app)
            .post(`/collection/1/addCard`)
            .send(newCard)
            .set("authorization", `Bearer ${user1Token}`);
        expect(resp.body).toEqual({ "message": `Succesfully added testCard to user1 collection` });
    });

    test("unauthorized for other users", async function () {
        const resp = await request(app)
            .post(`/collection/1/addCard`)
            .send(newCard)
            .set("authorization", `Bearer ${user2Token}`);
        expect(resp.statusCode).toEqual(401);
    });

    test("unauth for anon", async function () {
        const resp = await request(app)
            .post(`/collection/1/addCard`)
            .send(newCard)
        expect(resp.statusCode).toEqual(401);
    });

    test("not found if user not found", async function () {
        const resp = await request(app)
            .get(`/collection/0/addCard`)
            .set("authorization", `Bearer ${user1Token}`);
        expect(resp.statusCode).toEqual(404);
    });

    test("not found if cardId not found", async function () {
        const resp = await request(app)
            .get(`/collection/1/addCard`)
            .send({ ...newCard, cardID: 'a6erbc00-9c0b-4ef8-aa1a-6bb9bd380a11' });
        expect(resp.statusCode).toEqual(404);
    })
});