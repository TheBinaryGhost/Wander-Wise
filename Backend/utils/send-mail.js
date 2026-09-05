import transporter from "../config/mail.js";
import path from "path";
import fs from "fs";

const escapeHtml = (str) => {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

const sendMail = async (to, subject, data) => {
    const templatePath = path.join(
        process.cwd(),
        "templates",
        "accept-invite.html"
    );

    let html = fs.readFileSync(templatePath, "utf8");

    html = html
        .replace("{{ link }}", escapeHtml(data.link))
        .replace("{{ title }}", escapeHtml(data.title))
        .replace("{{ startDate }}", escapeHtml(data.startDate))
        .replace("{{ endDate }}", escapeHtml(data.endDate))
        .replace("{{ userName }}", escapeHtml(data.name));

    await transporter.sendMail({
        from: process.env.SMTP_USER,
        to,
        subject,
        html
    });
}

export default sendMail;
