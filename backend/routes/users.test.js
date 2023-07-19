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
  user2Token,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** GET /users/:username */

describe("GET /users/:userId", function () {
  test("works for same user", async function () {
    const resp = await request(app)
        .get(`/users/1`)
        .set("authorization", `Bearer ${user1Token}`);
    expect(resp.body).toEqual({
      user: {
        id: 1,
        username: "user1",
        email: "test@gmail.com",
        created_at: expect.any(String)
      },
    });
  });

  test("works for any user", async function () {
    const resp = await request(app)
        .get(`/users/1`)
        .set("authorization", `Bearer ${user2Token}`);
    expect(resp.body).toEqual({
      user: {
        id: expect.any(Number),
        username: "user1",
        email: "test@gmail.com",
        created_at: expect.any(String)
      },
    });
  });

  test("unauth for anon", async function () {
    const resp = await request(app)
        .get(`/users/1`);
    expect(resp.statusCode).toEqual(401);
  });

  test("not found if user not found", async function () {
    const resp = await request(app)
        .get(`/users/0`)
        .set("authorization", `Bearer ${user1Token}`);
    expect(resp.statusCode).toEqual(404);
  });
});

/************************************** PATCH /users/:userId */

describe("PATCH /users/:userId", () => {
  test("works for same user", async function () {
    const resp = await request(app)
        .patch(`/users/1`)
        .send({
          email: "changed@hotmail.com",
        })
        .set("authorization", `Bearer ${user1Token}`);
    expect(resp.body).toEqual({
      user: {
        username: "user1",
        email: "changed@hotmail.com",
        id: 1,
      },
    });
  });

  test("unauth if not same user", async function () {
    const resp = await request(app)
        .patch(`/users/1`)
        .send({
          email: "changed@hotmail.com",
        })
        .set("authorization", `Bearer ${user2Token}`);
    expect(resp.statusCode).toEqual(401);
  });

  test("unauth for anon", async function () {
    const resp = await request(app)
        .patch(`/users/1`)
        .send({
          email: "changed@hotmail.com",
        });
    expect(resp.statusCode).toEqual(401);
  });

  test("bad request if invalid data", async function () {
    const resp = await request(app)
        .patch(`/users/1`)
        .send({
          email: 27
        })
        .set("authorization", `Bearer ${user1Token}`);
    expect(resp.statusCode).toEqual(400);
  });

  test("works: can set new password", async function () {
    const resp = await request(app)
        .patch(`/users/1`)
        .send({
          password: "new-password",
        })
        .set("authorization", `Bearer ${user1Token}`);
    expect(resp.body).toEqual({
      user: {
        username: "user1",
        email: "test@gmail.com",
        id: 1,
      },
    });
    const isSuccessful = await User.authenticate("user1", "new-password");
    expect(isSuccessful).toBeTruthy();
  });
});

/************************************** DELETE /users/:username */

describe("DELETE /users/:username", function () {
  test("works for same user", async function () {
    const resp = await request(app)
        .delete(`/users/1`)
        .set("authorization", `Bearer ${user1Token}`);
    expect(resp.body).toEqual({ deleted: "user1" });
  });

  test("unauth if not same user", async function () {
    const resp = await request(app)
        .delete(`/users/1`)
        .set("authorization", `Bearer ${user2Token}`);
    expect(resp.statusCode).toEqual(401);
  });

  test("unauth for anon", async function () {
    const resp = await request(app)
        .delete(`/users/1`);
    expect(resp.statusCode).toEqual(401);
  });
});