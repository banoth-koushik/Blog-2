import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));

let data = {
    subject: [],
    context: [],
};

app.get("/", (req, res) => {
    res.render("index.ejs", data);
});

app.get("/home", (req, res) => {
    res.redirect("/");
});

app.get("/edit", (req, res) => {
    res.render("edit.ejs");
});

app.post("/edit", (req, res) => {
    const index = req.body.index;
    if (index >= 0 && index < data["subject"].length) {
        const subjectValue = data["subject"][index];
        const contextValue = data["context"][index];
        data["subject"].splice(index, 1); // Remove the item at the specified index
        data["context"].splice(index, 1);
        res.render("edit.ejs", { subjectValue, contextValue });
    } else {
        res.status(400).send("Invalid index");
    }
});

app.post("/submit", (req, res) => {
    console.log(req.body);
    data["subject"].push(req.body["subject"]);
    data["context"].push(req.body["context"]);
    res.redirect("/");
});

app.post("/delete", (req, res) => {
    const index = req.body.index;
    if (index >= 0 && index < data["subject"].length) {
        data["subject"].splice(index, 1); // Remove the item at the specified index
        data["context"].splice(index, 1);
        res.redirect("/"); // Redirect to the homepage to refresh the list
    } else {
        res.status(400).send("Invalid index");
    }
});

app.get("/about", (req, res) => {
    res.render("about.ejs");
});

app.get("/contact", (req, res) => {
    res.render("contact.ejs");
});

app.listen(port, () => {
    console.log("Website is running.....");
});