const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
require("dotenv").config();
app.use(express.json());
const FS = require("fs");

const port = process.env.PORT || 4000;

/*===============================
    All Routes and Handlers
=================================*/

// 01. To get All random users
app.get("/GET/user/all", (req, res) => {
    FS.readFile("Data.json", "utf-8", (err, data) => {
        if (err) {
            res.send({
                status: "failed",
                message: err.message,
            });
        } else {
            const result = JSON.parse(data);
            res.send({
                status: "success",
                result,
            });
        }
    });
});

// 02. To get a single random user
app.get("/GET/user/random/:id", (req, res) => {
    const ID = req.params.id;

    FS.readFile("Data.json", "utf-8", (err, data) => {
        if (err) {
            res.send({
                status: "failed",
                message: err.message,
            });
        } else {
            const result = JSON.parse(data);
            // finding user
            const targetUser = result.find((user) => user._id === ID);
            res.send({
                status: "success",
                result: targetUser,
            });
        }
    });
});

app.get("/", (req, res) => {
    res.send("Server is Running");
});

app.listen(port, () => {
    console.log(`Listening at port: http://localhost:${port}/ `);
});
