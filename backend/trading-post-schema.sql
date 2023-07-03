CREATE TABLE "cards" (
  "id" uuid PRIMARY KEY,
  "oracle_id" uuid NOT NULL,
  "name" TEXT NOT NULL,
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
  "id" INTEGER PRIMARY KEY,
  "username" TEXT,
  "password" TEXT,
  "email" TEXT,
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
  "foil" BOOLEAN
);

CREATE TABLE "card_want_list" (
  "user_id" INTEGER,
  "card_id" uuid,
  "quantity" INTEGER
);

ALTER TABLE "card_collection" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "card_collection" ADD FOREIGN KEY ("card_id") REFERENCES "cards" ("id");

ALTER TABLE "card_want_list" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "card_want_list" ADD FOREIGN KEY ("card_id") REFERENCES "cards" ("id");
