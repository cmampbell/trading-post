CREATE TABLE "cards" (
  "id" uuid PRIMARY KEY,
  "name" string NOT NULL,
  "image_uri" string,
  "usd_price" string,
  "usd_foil_price" string,
  "usd_etched_price" string,
  "mana_cost" string,
  "cmc" integer,
  "type_line" string,
  "oracle_text" string,
  "power" integer,
  "toughness" integer,
  "color_identity" string,
  "set_code" string,
  "set_name" string,
  "collector_number" string,
  "rarity" string,
  "variation" boolean,
  "artist" string,
  "full_art" boolean,
  "textless" boolean
);

CREATE TABLE "users" (
  "id" integer PRIMARY KEY,
  "username" string,
  "password" string,
  "email" string,
  "created_at" timestamp,
  "zip" string,
  "max_distance" integer
);

CREATE TABLE "card_collection" (
  "user_id" integer,
  "card_id" integer,
  "for_trade" boolean,
  "quantity" integer,
  "quality" string,
  "foil" boolean
);

CREATE TABLE "card_want_list" (
  "user_id" integer,
  "card_id" integer,
  "quantity" integer
);

ALTER TABLE "card_collection" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "card_collection" ADD FOREIGN KEY ("card_id") REFERENCES "cards" ("id");

ALTER TABLE "card_want_list" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "card_want_list" ADD FOREIGN KEY ("card_id") REFERENCES "cards" ("id");
