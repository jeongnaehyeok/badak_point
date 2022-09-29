const fs = require("fs");
const path = require("path");

const axios = require("axios").default;

const randomUserAgent = () => {
  const userAgentJSON = fs
    .readFileSync(path.resolve(__dirname, "../user_agents.json"), "utf-8")
    .toString();
  const { user_agents } = JSON.parse(userAgentJSON);

  return user_agents[Math.floor(Math.random() * user_agents.length)];
};

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
