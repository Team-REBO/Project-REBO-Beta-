//Tạo item , lưu trữ 1 biến express
const express = require("express");
const path = require("path");
//tạo app items
const app = express();
const session = require("express-session");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const port = process.env.PORT || 3000;
// const con = mysql.createConnection({ multipleStatements: true });
const jsStringify = require("js-stringify");
const Swal = require("sweetalert2");

const dbConfig = require("../VSC.PHP/views/html/js/db.config.js");

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
  // host: "us-cdbr-iron-east-01.cleardb.net",
  // // user: "root",
  // user: "b22388f4cd38f5",
  // // password: "39339",
  // password: "6a94a90c",
  // port: "3306",
  // database: "heroku_7792f0fc80b8b3d",
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  multipleStatements: true,
});
module.exports = connection;
con.connect(function (err) {
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
  var fullname = req.body.FULLNAME;
  var email = req.body.EMAIL;
  var pass = req.body.PASS;
  var confirmpass = req.body.CONFIRMPASS;
  con.query(
    "insert into users value(?,?,?,?)",
    [fullname, email, pass, confirmpass],
    function (err) {
      if (err) throw err;
      res.render("user/completed", {
        title: "Data",
        mess: "DataSavedSuccessfull",
      });
    }
  );
  // con.end();
});

app.post("/login/check", (req, res) => {
  var email = req.body.email;
  var pass = req.body.pass;
  if (email && pass) {
    con.query(
      "SELECT * FROM users WHERE email = ? and pass=?",
      [email, pass],
      (err, rows, fields) => {
        if (rows.length > 0) {
          req.session.loggedin = true;
          req.session.EMAIL = email;
          req.session.PASS = pass;
          res.redirect("/Overview");
        } else {
          res.status(404);
        }
        res.end();
      }
    );
  }
  // con.end();
});

app.get("/Account", (req, res) => {
  con.query(
    "SELECT * FROM users WHERE email=?",
    [req.session.EMAIL],
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
  // con.end();
});
app.post("/Update_Account", (req, res) => {
  var fullname = req.body.fullname;
  var email = req.body.email;
  con.query(
    "Update users set email=?,fullname=? where email=?",
    [email, fullname, req.session.EMAIL],
    (err) => {
      if (err) throw err;
      req.session.loggedin = true;
      req.session.EMAIL = email;
      req.session.FULLNAME = fullname;
      console.log(email);
      res.redirect("/Account");
    }
  );
});
app.get("/Delete_Account", (req, res) => {
  con.query(
    "Delete from users where email=?",
    [req.session.EMAIL],
    (err, rows, fields) => {
      if (err) throw err;
      res.render("html/login_signup");
    }
  );
});
app.post("/Changes_Pass", (req, res) => {
  var passold = req.body.old;
  var passnew = req.body.new;
  var newconfirm = req.body.newconfirm;
  if (passold && passnew && newconfirm) {
    if (passnew === newconfirm) {
      con.query(
        "select*from users where pass=?",
        [passold],
        (err, rows, fields) => {
          if (rows.length > 0) {
            con.query(
              "update users set pass=?,confirmpass=? where email=?",
              [passnew, newconfirm, req.session.EMAIL],
              (err, rows, fields) => {
                if (err) throw err;
                res.redirect("/login");
              }
            );
          }
        }
      );
    }
  }
});

app.get("/Overview", (req, res) => {
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
  // con.end();
});

app.get("/Classroom", (req, res) => {
  con.query(
    "SELECT * FROM users WHERE email=?",
    [req.session.EMAIL],
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
  // con.end();
});
app.get("/Lesson", (req, res) => {
  con.query(
    "SELECT * FROM users WHERE email=?",
    [req.session.EMAIL],
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
  // con.end();
});
app.get("/Tools", (req, res) => {
  con.query(
    "SELECT * FROM users WHERE email=?",
    [req.session.EMAIL],
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
  // con.end();
});
app.get("/Gift", (req, res) => {
  con.query(
    "SELECT * FROM users WHERE email=?",
    [req.session.EMAIL],
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
  // con.end();
});

app.get("/Logout", function (req, res) {
  req.session.loggedin = false;
  res.redirect("/login");
});

app.listen(port, function () {
  console.log("Server started port !..." + port);
});
