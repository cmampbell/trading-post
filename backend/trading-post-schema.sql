CREATE TABLE "cards" (
  "id" uuid PRIMARY KEY,
  "oracle_id" uuid NOT NULL,
  "name" TEXT NOT NULL,
  "art_uri" TEXT,
  "image_uri" TEXT,
  "usd_price" TEXT,
  "usd_foil_price" TEXT,
  "usd_etched_price" TEXT,
  "mana_cost" TEXT,
  "cmc" INTEGER,
  "type_line" TEXT,
  "oracle_text" TEXT,
  "power" TEXT,
  "toughness" TEXT,
  "color_identity" TEXT,
  "set_code" TEXT,
  "set_name" TEXT,
  "collector_number" TEXT,
  "rarity" TEXT,
  "variation" BOOLEAN,
  "artist" TEXT,
  "full_art" BOOLEAN,
  "textless" BOOLEAN
);

CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "username" TEXT NOT NULL,
  "password" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "created_at" DATE,
  "zip" TEXT,
  "max_distance" INTEGER
);

CREATE TABLE "card_collection" (
  "user_id" INTEGER,
  "card_id" uuid,
  "for_trade" BOOLEAN,
  "quantity" INTEGER,
  "quality" TEXT,
  "foil" TEXT
);

CREATE TABLE "card_want_list" (
  "user_id" INTEGER,
  "card_id" uuid,
  "quantity" INTEGER,
  "foil" TEXT
);

CREATE TABLE "trade_history" (
  "id" SERIAL PRIMARY KEY,
  "user1" INTEGER,
  "user2" INTEGER,
  "date_of_trade" DATE
);

CREATE TABLE "card_trade" (
  "id" SERIAL PRIMARY KEY,
  "trade_id" INTEGER,
  "card_id" uuid,
  "traded_price" TEXT,
  "original_owner" INTEGER
);

ALTER TABLE "card_collection" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE;
ALTER TABLE "card_collection" ADD FOREIGN KEY ("card_id") REFERENCES "cards" ("id");

ALTER TABLE "card_want_list" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE;
ALTER TABLE "card_want_list" ADD FOREIGN KEY ("card_id") REFERENCES "cards" ("id");

ALTER TABLE "trade_history" ADD FOREIGN KEY ("user1") REFERENCES "users" ("id") ON DELETE CASCADE;
ALTER TABLE "trade_history" ADD FOREIGN KEY ("user2") REFERENCES "users" ("id") ON DELETE CASCADE;

ALTER TABLE "card_trade" ADD FOREIGN KEY ("trade_id") REFERENCES "trade_history" ("id") ON DELETE CASCADE;
ALTER TABLE "card_trade" ADD FOREIGN KEY ("card_id") REFERENCES "cards" ("id") ON DELETE CASCADE;
ALTER TABLE "card_trade" ADD FOREIGN KEY ("original_owner") REFERENCES "users" ("id") ON DELETE CASCADE;

CREATE EXTENSION pg_trgm;
CREATE EXTENSION fuzzystrmatch;