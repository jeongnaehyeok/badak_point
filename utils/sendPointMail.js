const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const { getPoint } = require("./getPoint");
const { formatInTimeZone } = require("date-fns-tz");

dotenv.config();

const countrys = {
  usa: "미국",
  "south-korea": "한국",
};

const getMails = () => {
  const mailsJSON = fs
    .readFileSync(path.resolve(__dirname, "../mails.json"), "utf-8")
    .toString();
  const { mails } = JSON.parse(mailsJSON);
  return [...mails];
};

const generatePointContents = async (country) => {
  const { point, high, low } = await getPoint(country);
  return `오늘의 ${countrys[country]} 시장 정보입니다.\n신고가 ${high}개, 신저가 ${low}개로 오늘 ${countrys[country]} 바닥 지수는 ${point}%입니다.\n`;
};

module.exports.sendPointMail = async () => {
  const mails = getMails();
  const date = formatInTimeZone(new Date(), 'Asia/Seoul', 'yyyy년 MM월 dd일') 

  const usaInfo = await generatePointContents("usa");
  const krInfo = await generatePointContents("south-korea");
  
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
