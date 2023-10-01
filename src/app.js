const express = require("express");
const connec = require('./conn.js');
const coll = connec.coll;
const app = express();
const path = require("path");
const hbs = require("hbs");
const templatePath = path.join(__dirname, '../Template');
const publicPath = path.join(__dirname, '../public'); 

app.use(express.json());
app.set("view engine", "hbs");
app.set("views", templatePath);
app.use(express.urlencoded({ extended: false }));
app.use(express.static(publicPath)); 

app.get("/", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

app.get("/login", (req, res) => {
    res.render("login");
});


app.post("/signup", async (req, res) => {
    console.log(coll);
    console.log(connec);
    const data = {
        email: req.body.name,
        pswd: req.body.password
    };
    await coll.insertMany([data]);
    res.render("home");
});

app.post("/login", async (req, res) => {
    try {
        const check = await coll.findOne({ email: req.body.name })
        if (check.pswd === req.body.password) {
            res.render('home');
        } else {
            res.send("Wrong password");
        }
    } catch (error) {
        res.send("User does not exist");
    }
});


export {app};
// app.listen(3000, () => {
//     console.log("Listening on port: http://localhost:3000");
// });
