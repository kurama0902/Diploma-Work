const router  = require("express").Router();
let checkedLogged = require('./api')[1];
const path = require("path");

router.route("/")
    .get((req, res) => {
        res.sendFile(path.join(__dirname, '../public/pages/index.html'));
    });
router.route("/home")
    .get((req, res) => {
        res.sendFile(path.join(__dirname, '../public/pages/index.html'));
    });
router.route("/index.html")
    .get((req, res) => {
        res.sendFile(path.join(__dirname, '../public/pages/index.html'));
    });
router.route("/login")
    .get((req, res) => {
        checkedLogged = require('./api')[1];
        if(checkedLogged == true) {
            res.redirect('/users-page');
        } else {
            res.sendFile(path.join(__dirname, '../public/pages/login.html'));
        }
    });
router.route("/shopping-bag")
    .get((req, res) => {
        res.sendFile(path.join(__dirname, '../public/pages/shopping-bag.html'));
    });
router.route("/wine")
    .get((req, res) => {
        res.sendFile(path.join(__dirname, '../public/pages/wine.html'));
    });
router.route("/users-page")
    .get((req, res) => {
        checkedLogged = require('./api')[1];
        if(checkedLogged == true) {
            console.log(checkedLogged);
            res.sendFile(path.join(__dirname, '../public/pages/user-page.html'));
        } else {
            res.redirect('/login')
        }
    });

module.exports = router;
