const { randomUserAgent } = require("../utils/randomUserAgent");
const axios = require("axios").default;

module.exports.api = axios.create({
  baseURL: "https://www.investing.com/",
  headers: {
    "User-Agent": randomUserAgent(),
    "X-Requested-With": "XMLHttpRequest",
    Accept: "text/html",
    "Accept-Encoding": "gzip, deflate",
    Connection: "keep-alive",
  },
});