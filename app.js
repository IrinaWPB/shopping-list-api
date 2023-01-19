const express = require("express");
const itemsRoutes = require("./itemsRoutes");
const ExpressError = require("./expressError");

const app = express();

app.use(express.json());
app.use("/items", itemsRoutes);

// ------- 404 Handler (invalid route)------------
app.use((req, res, next) => {
    return new ExpressError("Page not found", 404);
});

// -------- Error Handler -------------------------

app.use((err, req, res, next) => {
    let status = err.status;
    let message = err.msg;
    return res.status(err.status || 500).json ({
        error: { message, status }
    });
});

module.exports = app;