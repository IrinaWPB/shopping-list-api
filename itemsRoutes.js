const express = require("express");
const router = new express.Router();
const ExpressError = require("./expressError");
const items = require("./fakeDb");

router.get("/", (req, res) => {
    res.json({items});
});

router.post("/", (req, res) => {
    const newItem = { name: req.body.name , price: req.body.price };
    items.push(newItem);
    res.status(201).json( { item: newItem });
});

router.get("/:name", (req, res) => {
    const item = items.find(i => i.name === req.params.name);
    if (item === undefined) {
        throw new ExpressError("Item not found", 404);
    }
    res.json({ item : item });
});

router.patch("/:name", (req, res) => {
    const itemToUpdate = items.find(i => i.name === req.params.name);
    if (itemToUpdate === undefined) {
        throw new ExpressError("Item not found", 404);
    }
    itemToUpdate.name = req.body.name;
    itemToUpdate.price = req.body.price;
    res.json({ item : itemToUpdate });
});

router.delete("/:name", (req, res) => {
    const itemToDelete = items.findIndex(i => i.name = req.params.name);
    if (itemToDelete === -1) {
        throw new ExpressError("Item not found", 404);
    }
    items.splice(itemToDelete, 1);
    res.json({ message : "Deleted" });
});

module.exports = router;