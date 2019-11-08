import Mailgun from "mailgun-js";

const mailGunClient = new Mailgun({
  apiKey: process.env.MAILGUN_KEY || "",
  domain: "sandboxf81d0c8695ff4ae5b13875820f96ed27.mailgun.org"
});
