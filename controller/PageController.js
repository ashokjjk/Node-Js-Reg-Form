const express = require('express')
const fileSys = require('fs')
const dbService = require("./DbService")

const app = express()

app.use(express.json());
app.use(express.urlencoded());

app.get("/", function (req, res) {
    fileSys.readFile("../pages/signup.html", function (err, data) {
        if (err) {
            res.send(err);
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
    })
})

app.post("/controller/register", function (req, res) {
    var uname = req.body.username;
    var email = req.body.email;
    var paswd = req.body.password;
    var con_pwd = req.body.confirm_password;
    var result = dbService.register(uname, email, paswd, con_pwd);
    res.send(result);
    return res.end();
})

app.get('/signin.html', function (req, res) {
    fileSys.readFile("../pages/signin.html", function (err, data) {
        if (err) {
            res.send(err);
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
    })
})

app.post('/controller/signin', function (req, res) {
    var unId = req.body.email;
    var pwd = req.body.password;
    dbService.auth(unId, pwd);
    res.send("verification done check console");
    return res.end();
})

app.listen(8085)
