export function makeVerificationTemplate(userId: string) {
  const baseUrl = window.location.origin;
  const link = `${baseUrl}/api/verify/${userId}`;

  return `<div
  style="
    background-color: #041d2d;
    padding: 1rem;
    display: flex;
    flex-direction: column;
  "
>
  <h1 style="font-size: 3rem; color: #75d9ff; font-weight: bold">
    Thanks for choosing our service!
  </h1>

  <p style="font-size: 2rem; color: #fff; font-weight: 300">
    Please, click a link below to confirm your email.
  </p>

  <a
    href="%LINK%"
    style="
      background-color: #94f8ff;
      color: white;
      :hover {
        background-color: '#281DC4';
      }
      padding: 1rem 2rem;
    "
  >
    Confirm
  </a>
</div>`.replace("%LINK%", link);
}

export function sendEmail(template: string, email: string) {
  const nodemailer = require("nodemailer");

  const transport = nodemailer.createTransport({
    host: "smtp.elasticemail.com",
    port: 2525,
    secure: false,
    auth: {
      user: process.env.NODEMAILER_USERNAME,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });

  const MailOptions = {
    from: "Iteam",
    to: email,
    subject: "Iteam email confirmation letter",
    html: template,
  };

  return transport.sendMail(MailOptions, (err: any, info: any) => {
    if (err) throw new Error(err);
    if (info) return info.response;
  });
}
