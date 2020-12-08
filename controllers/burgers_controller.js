// Setting up express dependency and importing model //

const express = require("express");
const router = express.Router();

const burger = require("../models/burger.js");

router.get("/", function(req, res) {
    burger.all(function(data) {
        const undevoured = data.filter(burger => burger.devoured === 0); 
        const devoured = data.filter(burger => burger.devoured === 1);

        const hbsObject = {
            undevoured: undevoured,
            devoured: devoured
        };
        res.render("index", hbsObject);
    });
});

router.post("/api/burgers", function(req,res) {
    console.log("API burger route")
    burger.insert(["burger_name"], [req.body.burger_name], function(result) {
        res.json({ id: result.insertId });
    });
});

router.put("/api/burgers/:id", function(req, res) {
    const condition = "id = " + req.params.id;

    console.log("condition", condition);

    burger.update(
        {
            devoured: req.body.devoured
        },
        condition, 
        function(result) {
            if (result.changedRows === 0) {
                return res.status(404).end();
            }
            res.status(200).end();
        }
    );
});

router.delete("/api/burgers/:id", function(req, res) {
    const condition = "id = " + req.params.id;

    console.log("condition", condition);

    burger.delete(
        condition, 
        function(result) {
            if (result.affectedRows === 0) {
                return res.status(404).end();
            }
            res.status(200).end();
        }
    );
});

// Exporting routes for server.js //
module.exports = router;
