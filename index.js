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

// 03. To get Limited random users
app.get("/GET/user", (req, res) => {
    const limitValue = req.query.limitUser;
    // const {limitValue}=req.query;
    // at sending end: url?user=5&page=4

    FS.readFile("Data.json", "utf-8", (err, data) => {
        if (err) {
            res.send({
                status: "failed",
                message: err.message,
            });
        } else {
            const result = JSON.parse(data);
            limitedUser = result.slice(0, limitValue);
            res.send({
                status: "success",
                result: limitedUser,
            });
        }
    });
});

// 04. Add a random user
app.post("/POST/user/save", (req, res) => {
    const newUserData = req.body;

    const { _id, gender, name, contact, address, photoUrl } = newUserData;
    if (_id && gender && name && contact && address && photoUrl) {
        // To Read Data
        FS.readFile("Data.json", "utf-8", (err, data) => {
            if (err) {
                res.send({
                    status: "falied",
                    message: err.message,
                });
            } else {
                const dataInJson = JSON.parse(data);
                const updatedData = [...dataInJson, newUserData];
                const updatedDataInString = JSON.stringify(updatedData);

                FS.writeFile("Data.json", updatedDataInString, (err) => {
                    if (err) {
                        res.send({
                            status: "falied",
                            message: err.message,
                        });
                    } else {
                        res.send({
                            status: "success",
                            message: "User added successfully",
                        });
                    }
                });
            }
        });
    } else {
        res.send({
            status: "failed",
            message: "All fields are required",
        });
    }
});

app.get("/", (req, res) => {
    res.send("Server is Running");
});

app.listen(port, () => {
    console.log(`Listening at port: http://localhost:${port}/ `);
});
