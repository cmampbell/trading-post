"use strict";

const {
  NotFoundError, BadRequestError,
} = require("../expressError");

const CardCollection = require("./cardCollection.js");

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

describe("getCollection", function () {
  test("works", async function () {
    const collection = await CardCollection.getCollection(1);

    expect(collection.length).toEqual(2);
  });

  test("returns empty array if user has no cards in collection", async () => {
    const collection = await CardCollection.getCollection(2);

    expect(collection.length).toEqual(0);
  })

  test("not found if no such user", async function () {
    try {
      await CardCollection.getCollection(0);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

/************************************** getCardInCollection */

describe("getCardInCollection", function () {
  test("works", async function () {
    const card = await CardCollection.getCardInCollection(1, 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11');

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

  test("not found if card not in collection", async () => {
    try {
      await CardCollection.getCardInCollection(1, '1111579f-7b35-4ed3-b44c-db2a538066fe');
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  })
});

/**************************************** getCardsForTrade */
describe("getCardsForTrade", function () {
  test("works", async function () {
    const forTrade = await CardCollection.getCardsForTrade(1)

    expect(forTrade.length).toEqual(1);

    const card = forTrade[0]

    expect(card.id).toEqual('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11');
  })

  test("returns empty array if user has no cards marked for trade", async () => {
    const collection = await CardCollection.getCardsForTrade(2);

    expect(collection.length).toEqual(0);
  })

  test("not found if no such user", async function () {
    try {
      await CardCollection.getCardsForTrade(0);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
})


/************************************** addCardToCollection */

describe("addCardToCollection", function () {

  const newCard = {
    userID: 1,
    cardID: '0000579f-7b35-4ed3-b44c-db2a538066fe',
    forTrade: true,
    quantity: 2,
    foil: true,
  }

  test("works", async function () {
    await CardCollection.addCardToCollection(newCard);

    const collection = await CardCollection.getCollection(1);

    expect(collection.length).toEqual(3);
  });

  test("not found if no such user", async function () {
    try {
      await CardCollection.addCardToCollection({...newCard, userID: 3});
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

/************************************** updateCardInCollection */

describe("updateCardInCollection", function() {

  test("works", async function() {
    const updatedCard = await CardCollection.updateCardInCollection(1, 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', { foil: "Yes", quantity: 4});

    expect(updatedCard.quantity).toEqual(4);
    expect(updatedCard.foil).toEqual("Yes");
  })

  test("BadRequest trying to update cardID", async function(){
    try{
      await CardCollection.updateCardInCollection(1, 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', {cardID: 'yu-gi-oh'});
      fail();
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  })

  test("BadRequest trying to update userID", async function(){
    try{
      await CardCollection.updateCardInCollection(1, 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', {userID: 10});
      fail();
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  })

  test("not found if user doesn't exist", async function(){
    try{
      await CardCollection.updateCardInCollection(10, 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', { foil: true, quantity: 4});
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  })

  test("not found if card doesn't exist", async function(){
    try{
      await CardCollection.updateCardInCollection(10, '0000bc99-9c0b-4ef8-bb6d-6bb9bd380a11', { foil: true, quantity: 4});
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  })
})


/************************************** removeCardFromCollection */

describe("removeCardFromCollection", function () {

  const cardToRemove = {
    userId: 1,
    cardId: '0000579f-7b35-4ed3-b44c-db2a538066fe',
  }

  test("works", async function () {
    await CardCollection.removeCardFromCollection(cardToRemove);

    const collection = await CardCollection.getCollection(1);

    expect(collection.length).toEqual(1);

    const card = collection[0]

    expect(card.id).toEqual('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11')
  });

  // test("not found if no such user", async function () {
  //   try {
  //     await CardCollection.removeCardFromCollection({...cardToRemove, userID: 3});
  //     fail();
  //   } catch (err) {
  //     expect(err instanceof NotFoundError).toBeTruthy();
  //   }
  // });

  // test("not found if no such card", async function () {
  //   try {
  //     await CardCollection.removeCardFromCollection({...cardToRemove, cardID: '1111375f-7b35-4ed3-b44c-db2a538066fe'});
  //     fail();
  //   } catch (err) {
  //     expect(err instanceof NotFoundError).toBeTruthy();
  //   }
  // });
});