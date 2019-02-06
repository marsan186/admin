const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const mongoose = require('mongoose');
const config = require("./config");
const AdminUser = require("./models/admin");
const authenticate = require("./authenticate");
mongoose.Promise = global.Promise;
mongoose.connect(
    config.mongoURL,
    { useNewUrlParser: true }
);

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../dist')));

app.post("/register", function (req, res) {

    const newUser = new AdminUser({
        name: req.body.name,
        username: req.body.user_name
    });
    newUser.password = newUser.generateHash(req.body.password);
    newUser.save().then(rec => {
        res.status(201).json(rec);
    });

});


app.post("/login", function (req, res) {

    AdminUser.findOne({ username: req.body.user_name }).then(loginUser => {
        if (!loginUser) {
            return res.status(401).json("Invalid user name and password");
        }

        if (!loginUser.validatePassword(req.body.password)) {
            return res.status(401).json("Invalid password");
        }

        // const withTokem ={...loginUser}
        const withTokem = { username: loginUser.username, _id: loginUser._id }
        withTokem.token = loginUser.generateJWT();
        res.status(200).json(withTokem);
    })

});


app.get("/getusers",authenticate, function (req, res) {

    AdminUser.find().then(adminUser => {
        res.status(200).json(adminUser);
    })

});


app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});


app.listen(3000, () => console.log("Listening on Port 3000"));
