import express from "express";
import { coll as connec } from "./conn.js";
const coll = connec.coll;
const app = express();
import { fileURLToPath } from "url";
import path from "path";

const cuurentModuleUrl = import.meta.url;
const __dirname = path.join(path.dirname(fileURLToPath(cuurentModuleUrl)));
const templatePath = path.join(__dirname, '../public');
const publicPath = path.join(__dirname, '../public'); 
const port = process.env.PORT || 3000;
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


app.listen(port, () => {
    console.log("Listening on port: http://localhost:3000");
});
export {app};

