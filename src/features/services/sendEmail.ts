export function makeVerificationTemplate(userId: string) {
  const baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:8080"
      : "https://iteam.vercel.app";
  const link = `${baseUrl}/api/verify/${userId}`;

  return `<div
  style="
    background-color: #041d2d;
    padding: 1rem;
  ">
<div style="max-width: 800px; display: flex; flex-direction: column;">

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
      color: black;
      padding: 1rem 2rem;
      width: fit-content;
    ">
    Confirm
  </a>
  </div>
</div>`.replace("%LINK%", link);
}

export async function sendEmail(template: string, email: string) {
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
    from: "iteamnoreply8@gmail.com",
    to: email,
    subject: "Iteam email confirmation letter",
    html: template,
  };

  return await transport.sendMail(MailOptions, (err: any, info: any) => {
    if (err) {
      console.log(err);
      throw new Error(err);
    }
    if (info) {
      console.log(info.response);
      return info.response;
    }
  });
}
