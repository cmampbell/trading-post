"use strict";

/** Express app for trading-post. */
console.log("Starting Server")
const express = require("express");
const cors = require("cors");

const { NotFoundError } = require("./expressError");
const { authenticateJWT } = require("./middleware/auth");

const cardsRoutes = require("./routes/cards");
const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");
const collectionRoutes = require("./routes/cardCollection");
const wantListRoutes = require("./routes/wantList");

const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(authenticateJWT);

app.use("/cards", cardsRoutes);
app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/collection", collectionRoutes);
app.use("/want-list", wantListRoutes);


/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
    console.log(NotFoundError);
    return next(new NotFoundError());
});

/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
    if (process.env.NODE_ENV !== "test") console.error(err.stack);
    const status = err.status || 500;
    const message = err.message;

    return res.status(status).json({
        error: { message, status },
    });
});

module.exports = app;