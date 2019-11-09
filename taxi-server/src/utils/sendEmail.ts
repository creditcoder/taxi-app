import Mailgun from "mailgun-js";

const mailGunClient = new Mailgun({
  apiKey: process.env.MAILGUN_KEY || "",
  domain: "sandboxf81d0c8695ff4ae5b13875820f96ed27.mailgun.org"
});

const sendEmail = (subject: string, html: string) => {
  const emailData = {
    from: "ar2r.pv@gmail.com",
    to: "ar2r.pv@gmail.com",
    subject,
    html
  };
  return mailGunClient.messages().send(emailData);
};

export const sendVerificationEmail = (fullName: string, key: string) => {
  const emailSubject = `Hello, ${fullName}! Please, verify your email`;
  const emailBody = `Verify your email by clicking <a href="taxi.com/verification/${key}>here</a>"`;
  return sendEmail(emailSubject, emailBody);
};
