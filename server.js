const express = require("express")
const app = express()

let unicorns = require('./data.js')



app.get("/", (req, res) => {
    res.send("hi!")
})


app.listen(3000, () => {
    console.log("all good!");
})

app.get("/unicorns", async (req, res) => {
    try {
        const results = await unicorns.filter(unicorn => true);
        res.json(results)
    } catch (error) {
        console.log(error);
    }

})

app.get("/unicorns/:name", async (req, res) => {
    try {
        const results = await unicorns.filter(aUnicorn => aUnicorn.name==req.params.name)
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



