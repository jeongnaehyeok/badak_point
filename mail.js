const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const { getPoint } = require("./utils/getPoint");
const { formatInTimeZone } = require("date-fns-tz");
const { generateTodayPointContents } = require("./utils/generateContents");

dotenv.config();

const getMails = () => {
  const mailsJSON = fs
    .readFileSync(path.resolve(__dirname, "./mails.json"), "utf-8")
    .toString();
  const { mails } = JSON.parse(mailsJSON);
  return [...mails];
};

const sendPointMail = async () => {
  const mails = getMails();
  const date = formatInTimeZone(new Date(), "Asia/Seoul", "yyyy년 MM월 dd일");

  const usaVestData = await getPoint("usa");
  const krVestData = await getPoint("south_korea");

  const usaInfo = await generateTodayPointContents({
    country: "usa",
    ...usaVestData,
  });
  const krInfo = await generateTodayPointContents({
    country: "south_korea",
    ...krVestData,
  });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.SEND_EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const info = await transporter.sendMail({
    from: process.env.SEND_EMAIL,
    to: mails,
    subject: `💸 ${date} 바닥 지수 정보 💸 `,
    text: `${usaInfo}\n${krInfo}`,
  });

  console.log("Message sent: %s", info.messageId);
};

sendPointMail().catch((e) => {
  console.log(e);
});
