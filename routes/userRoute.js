const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const nodeMailer = require("nodemailer");

function capitalize(s) {
  return s[0].toUpperCase() + s.slice(1);
}

// Send user an email when they are registered successfully
function sendRegistrationEmail(user) {
  async function main() {
    const transporter = nodeMailer.createTransport({
      service: "hotmail",
      auth: {
        user: "harborpizza@outlook.com",
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: "Harbor Pizza <harborpizza@outlook.com>",
      to: user.email,
      subject: `Registration Confirmation`,
      html: `

      <h2>Dear ${capitalize(user.name)},</h2>
      <p>Thank you for registering! Use <b>${
        user.email
      }<b/> and your <b>password</b> to login at <a href="https://www.harborpizza.app/login">harborpizza.app</a>.</p> 
      <br> 
      <br>  
      <div>
        <h2>Thank you!</h2>
        <div><b>Harbor Pizza</b></div>
        <div>13917 Harbor Blvd, Garden Grove, CA 92843</div>
        <div>(714)554-0084</div>
      </div>
      `,
    });

    console.log("Message Sent: " + info.messageId);
  }

  main().catch((e) => console.log(e));
}

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User Already Exists" });
    }

    // Generate salt and hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user with hashed password
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    sendRegistrationEmail(newUser);

    res.send("User Registered Successfully");
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const curerntUser = {
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          _id: user._id,
        };
        res.send(curerntUser);
      } else {
        return res.status(400).json({ message: "User Login Failed" });
      }
    } else {
      return res.status(400).json({ message: "User Login Failed" });
    }
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong" });
  }
});

module.exports = router;
