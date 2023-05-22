const router  = require("express").Router();
const path = require("path");

router.route("/")
    .get((req, res) => {
        res.sendFile(path.join(__dirname, '../public/pages/index.html'));
    });
router.route("/login")
    .get((req, res) => {
        res.sendFile(path.join(__dirname, '../public/pages/login.html'));
    });
router.route("/shopping-bag")
    .get((req, res) => {
        res.sendFile(path.join(__dirname, '../public/pages/shopping-bag.html'));
    });
router.route("/wine")
    .get((req, res) => {
        res.sendFile(path.join(__dirname, '../public/pages/wine.html'));
    });

module.exports = router;
