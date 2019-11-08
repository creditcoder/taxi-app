import Mailgun from "mailgun-js";

const mailGunClient = new Mailgun({
  apiKey: process.env.MAILGUN_KEY || "",
  domain: "sandboxf81d0c8695ff4ae5b13875820f96ed27.mailgun.org"
});

const sendEmail = (to: string, subject: string, html: string) => {
  const emailData = {
    from: "ai@thebesttaxi.com",
    to,
    subject,
    html
  };
  return mailGunClient.messages().send(emailData);
};

export const sendVerificationEmail = (
  to: string,
  fullName: string,
  key: string
) => {
  const emailSubject = `Hello, ${fullName}! Please, verify your email`;
  const emailBody = `Verify your email by clicking <a href="taxi.com/verification/${key}>here</a>"`;
  return sendEmail(to, emailSubject, emailBody);
};
