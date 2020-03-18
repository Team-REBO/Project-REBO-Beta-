//Tạo item , lưu trữ 1 biến express
const express = require("express");
const path = require("path");
//tạo app items
const app = express();
const session = require("express-session");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const port = 3000;
// const con = mysql.createConnection({ multipleStatements: true });
const jsStringify = require("js-stringify");

//server static files
app.use(express.static(path.join("REBO")));
// app.use(express.static("REBO"));
app.use(bodyParser.urlencoded({ extended: false }));

//template engine
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "./views")); //app.set("views","./views"));

//for body parser
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "39339",
  port: "3306",
  database: "mydb",
  multipleStatements: true,
});
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
app.get("/", (req, res) => {
  res.render("html/Homepage");
});
app.get("/login", (req, res) => {
  // res.sendFile("./REBO/html/login_signup.html", { root: __dirname });
  res.render("html/login_signup");
});

app.post("/login/signup", (req, res) => {
  var sql =
    "insert into users value('" +
    req.body.FULLNAME +
    "','" +
    req.body.EMAIL +
    "','" +
    req.body.PASS +
    "','" +
    req.body.CONFIRMPASS +
    "')";
  con.query(sql, function(err) {
    if (err) throw err;
    res.render("user/completed", {
      title: "Data",
      mess: "DataSavedSuccessfull",
    });
  });
  // con.end();
});

app.post("/login/check", (req, res) => {
  var email = req.body.EMAIL;
  var pass = req.body.PASS;
  if (email && pass) {
    con.query(
      "SELECT * FROM users WHERE email = ? and pass=?",
      [email, pass],
      function(err, rows, fields) {
        if (rows.length > 0) {
          req.session.loggedin = true;
          req.session.EMAIL = email;
          req.session.PASS = pass;
          res.redirect("/Overview");
        } else {
          res.send("Incorrect PASS or EMAIL");
        }
        res.end();
      }
    );
  } else {
    res.send("Please enter EMAIL and PASS");
    res.end();
  }
  // con.end();
});

// app.get("/", function(req, res) {
//   if (req.session.loggedin) {
//     // res.send("Welcome back, " + req.session.ID + "!");
//     // res.sendFile("./REBO/html/Classroom.html", { root: __dirname });
//     res.redirect("/Overview");
//   } else {
//     res.send("Please login to view this page!");
//   }
//   // res.end();
// });
app.get("/Account", (req, res) => {
  if (req.session.loggedin) {
    con.query(
      "SELECT * FROM users WHERE email='" + req.session.EMAIL + "'",
      (err, rows, fields) => {
        if (err) throw err;
        var items = {
          fullname: rows[0].fullname,
          email: rows[0].email,
        };
        res.render("html/Account", {
          item: items, //file pug : each item in items
        });
      }
    );
  }
  // con.end();
});
app.get("/Overview", (req, res) => {
  if (req.session.loggedin) {
    con.query(
      "select*from users inner join test on test.email=users.email where users.email='" +
        req.session.EMAIL +
        "';select*from test;select*from test order by c3 desc limit 5",
      (err, rows, fields) => {
        if (err) throw err;
        var items = {
          fullname: rows[0][0].fullname,
          c1: rows[0][0].c1,
        };
        var ranks = rows[2];
        res.render("html/Overview", {
          item: items,
          rank: ranks,
          jsStringify,
          rows,
        });
      }
    );
  }
  // con.end();
});

app.get("/Classroom", (req, res) => {
  if (req.session.loggedin) {
    con.query(
      "SELECT * FROM users WHERE email='" + req.session.EMAIL + "'",
      (err, rows, fields) => {
        if (err) throw err;
        var items = {
          fullname: rows[0].fullname,
        };
        res.render("html/Classroom", {
          item: items, //file pug : each item in items
        });
      }
    );
  }
  // con.end();
});
app.get("/Lesson", (req, res) => {
  if (req.session.loggedin) {
    con.query(
      "SELECT * FROM users WHERE email='" + req.session.EMAIL + "'",
      (err, rows, fields) => {
        if (err) throw err;
        var items = {
          fullname: rows[0].fullname,
        };
        res.render("html/Lesson", {
          item: items, //file pug : each item in items
        });
      }
    );
  }
  // con.end();
});
app.get("/Tools", (req, res) => {
  if (req.session.loggedin) {
    con.query(
      "SELECT * FROM users WHERE email='" + req.session.EMAIL + "'",
      (err, rows, fields) => {
        if (err) throw err;
        var items = {
          fullname: rows[0].fullname,
        };
        res.render("html/Tools", {
          item: items, //file pug : each item in items
        });
      }
    );
  }
  // con.end();
});
app.get("/Gift", (req, res) => {
  if (req.session.loggedin) {
    con.query(
      "SELECT * FROM users WHERE email='" + req.session.EMAIL + "'",
      (err, rows, fields) => {
        if (err) throw err;
        var items = {
          fullname: rows[0].fullname,
        };
        res.render("html/Gift", {
          item: items, //file pug : each item in items
        });
      }
    );
  }
  // con.end();
});

app.listen(port, function() {
  console.log("Server started port !..." + port);
});
