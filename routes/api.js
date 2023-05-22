const router = require("express").Router();
const nodemailer = require("nodemailer");

const adminEmail = process.env.ADMIN_EMAIL;
const adminPass = process.env.ADMIN_PASS;

/* GET api listing. */
router.route("/feedback").post((req, res, next) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    secure: false,
    port: 25,
    auth: {
      user: "warcraft.beluy845@gmail.com",
      pass: "beluy625436",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  let mailOptions = {
    from: "Messages on Node server",
    to: "o.d.bilyi@gmail.com",
    subject: "New Messages",
    text: `
        name : ${req.body.name}
        email: ${req.body.email}`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.statusCode = 405;
      return res.send(error);
    }
    res.send("ok");
  });
});

router.route("/login").post((req, res) => {
  const { email, pass } = req?.body;
	if (email === adminEmail && pass === adminPass) {
		return res.send('ok');
	}
	res.redirect('/');
});

module.exports = router;
