require("dotenv").config();

const router = require("express").Router();
const nodemailer = require("nodemailer");
const { popularWines } = require("../db/index");

const adminEmail = process.env.ADMIN_EMAIL;
const adminPass = process.env.ADMIN_PASS;

/* GET api listing. */
router.route("/feedback").post((req, res, next) => {
  if(req.cookies['m_k']) {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "creepysimbaplay@gmail.com",
        pass: "bghukinhhzxyfimp",
      },
    });
  
    let mailOptions = {
      from: "creepysimbaplay@gmail.com",
      to: "hrynchuk.dmytro.clg@chnu.edu.ua",
      subject: "Your order",
      html: `${req.body.info}`,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.statusCode = 405;
        return res.send(error);
      }
      console.log(mailOptions.html);
    });
  } else {
    res.redirect('/login');
  }
});

router.route("/login").post((req, res) => {
  const { email, pass } = req?.body;
  if (email === adminEmail && pass === adminPass) {
    console.log("You succsessfully logged");
    res.cookie("m_k", `user_${email}`, { maxAge: 99999 * 1000, httpOnly: true });
    res.redirect('/users-page');
  } else {
    console.log("Not registered");
    return res.status(200).redirect("/login");
  }
});

router.route("/logout").post((req, res) => {
  res.clearCookie('m_k');
  console.log('Deleted cookie');
  // res.redirect('/'); // Redirect is not working
  res.redirect('/');
});


router.route("/popular-wines").get((req, res) => {
  res.send(popularWines);
});

module.exports = router;
