const express = require("express");
const app = express();
const port = 3000;
// const dotenv = require('dotenv')
// dotenv.config();

//for read data
app.set("view engine", "ejs");

const connection = require("./config/database");

const path = require("path");
const bodyParser = require("body-parser");
const { error } = require("console");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//show html file on browser
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));

app.get("/", (req, res) => {
  res.redirect("/index.html");
});


// data read after login button
app.get("/data", (req,res)=>{
    connection.query("select * from login", (error, rows)=>{
      if (error) {
        console.log('error')
      }else{
        res.render("read.ejs", {rows})
      }
    })
})

// data post or save on hit login button
app.post("/index", (req, res) => {
  console.log(req.body);

  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  try {
    //write query for create data in database
    connection.query(
      "INSERT INTO `login`(`name`, `email`, `password`) VALUES (?,?,?)",
      [name, email, password],
      (error, rows) => {
        if (error) {
          console.log(error);
        } else {
          res.redirect("/data");
        }
      }
    );
  } catch (error) {
    console.log("error");
  }
});

app.get("/about", (req, res) => res.send("<h1>ABOUT Page</h1>"));
app.get("/contact", (req, res) => res.send("<h1>CONTACT Page</h1>"));
app.get("/email", (req, res) => res.send("<h1>EMAIL Page</h1>"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
