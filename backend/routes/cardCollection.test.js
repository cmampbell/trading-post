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
    test("works for same user", async function () {
      const resp = await request(app)
          .post(`/collection/${user1}/addCard`)
          .set("authorization", `Bearer ${user1Token}`);
      expect(resp.body).toEqual({
        user: {
          id: expect.any(Number),
          username: "user1",
          email: "test@gmail.com",
        },
      });
    });
  
    test("works for any user", async function () {
      const resp = await request(app)
          .get(`/users/user1`)
          .set("authorization", `Bearer ${user2Token}`);
      expect(resp.body).toEqual({
        user: {
          id: expect.any(Number),
          username: "user1",
          email: "test@gmail.com",
        },
      });
    });
  
    test("unauth for anon", async function () {
      const resp = await request(app)
          .get(`/users/user1`);
      expect(resp.statusCode).toEqual(401);
    });
  
    test("not found if user not found", async function () {
      const resp = await request(app)
          .get(`/users/nope`)
          .set("authorization", `Bearer ${user1Token}`);
      expect(resp.statusCode).toEqual(404);
    });
  });