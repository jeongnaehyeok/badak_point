const { api } = require("../api");
const cheerio = require("cheerio");

const get52WeekHighLength = (country) =>
  api.get(`/equities/52-week-high?country=${country}`).then((res) => {
    const $ = cheerio.load(res.data);
    try {
      return $(
        "#stockPageInnerContent > table > tbody > tr > td.left.bold.plusIconTd.elp > a"
      ).toArray().length;
    } catch (e) {
      console.log(e);
    }
  });

const get52WeekLowLength = (country) =>
  api.get(`/equities/52-week-low?country=${country}`).then((res) => {
    const $ = cheerio.load(res.data);
    try {
      return $(
        "#stockPageInnerContent > table > tbody > tr > td.left.bold.plusIconTd.elp > a"
      ).toArray().length;
    } catch (e) {
      console.log(e);
    }
  });

module.exports.getPoint = async (country) => {
  const high = await get52WeekHighLength(country);
  const low = await get52WeekLowLength(country);
  const point = Number(((high / (high + low)) * 100).toFixed(3));
  return { point, high, low };
};
