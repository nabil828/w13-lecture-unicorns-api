const express = require("express")
const app = express()


// 1
// getting-started.js
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/test');

    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
    // 2
    const unicornSchema = new mongoose.Schema({
        name: String,
        weight: Number,
        dob: Date,
        loves: [String],
        vampires: Number,
        vaccinated: Boolean
    });

    // 3
    const unicornModel = mongoose.model('unicorns', unicornSchema);



    app.get("/", (req, res) => {
        res.send("hi!")
    })


    app.listen(3000, () => {
        console.log("all good!");
    })

    // Method	Endpoint	Description
    // GET / unicorns	Returns all unicorns.
    // POST / unicorns	Adds a new unicorn.
    // DELETE / unicorns /:name	Deletes a unicorn by name.
    // PATCH / unicorns /:name	Updates a unicorn by name.It should only update the fields that are passed in the request body.
    // PUT / unicorns /:name	Replaces a unicorn by name.It should replace the entire document with the new document passed in the request body.
    // GET / unicorns /:name	Returns a unicorn by name.
    // GET / unicorns / search ? name =...	Returns a unicorn by name.

    app.get("/unicorns", async (req, res) => {
        try {
            const results = await unicornModel.find();
            res.json(results)
        } catch (error) {
            console.log(error);
        }

    })

    app.get("/unicorns/:name", async (req, res) => {
        try {
            const results = await unicornModel.find(
                {
                    "name": req.params.name
                }
            );
            res.json(results)
        } catch (error) {
            console.log(error);
        }
    })

    app.delete("/unicorns/:name", async (req, res) => {
        try {
            const results = await unicornModel.deleteOne(
                {
                    "name": req.params.name
                }
            );
            res.json(results)
        } catch (error) {
            console.log(error);
        }
    })

    app.use(express.json())
    app.patch("/unicorns/:name", async (req, res) => {
        console.log(req.body);
        try {
            const results = await unicornModel.updateOne(
                {
                    "name": req.params.name
                },
                {
                    $set: req.body
                }
            );
            res.json(results)
        } catch (error) {
            console.log(error);
        }
    })

    app.put("/unicorns/:name", async (req, res) => {
        console.log(req.body);
        try {
            const results = await unicornModel.replaceOne(
                {
                    "name": req.params.name
                },
                req.body
            );
            res.json(results)
        } catch (error) {
            console.log(error);
        }
    })

    app.post("/unicorns", async (req, res) => {
        console.log(req.body);
        try {
            const results = await unicornModel.insertMany([
                req.body
            ]);
            res.json(results)
        } catch (error) {
            console.log(error);
        }
    })
}


