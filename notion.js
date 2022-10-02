const { Client } = require("@notionhq/client");
const { formatInTimeZone } = require("date-fns-tz");
const { getPoint } = require("./utils/getPoint");

const dotenv = require("dotenv");

dotenv.config();

const countrys = {
  usa: process.env.NOTION_US_DATABASE_ID,
  "south-korea": process.env.NOTION_KR_DATABASE_ID,
};

const notion = new Client({ auth: process.env.NOTION_USER_KEY });

const addBadakPointDB = async (country) => {
  const date = formatInTimeZone(new Date(), "Asia/Seoul", "yyyy-MM-dd");
  const { point, high, low } = await getPoint(country);

  return notion.pages
    .create({
      parent: { database_id: countrys[country] },
      properties: {
        날짜: {
          title: [
            {
              type: "text",
              text: {
                content: date,
              },
            },
          ],
        },
        "바닥 지수": {
          type: "number",
          number: point,
        },
        최고가: {
          type: "number",
          number: high,
        },
        최저가: {
          type: "number",
          number: low,
        },
      },
    })
    .catch((e) => console.log(e));
};

const updateBadakPointDB = async () => {
  await addBadakPointDB("usa");
  await addBadakPointDB("south-korea");
};

updateBadakPointDB().catch((e) => {
  console.log(e);
});
