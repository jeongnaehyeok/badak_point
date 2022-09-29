const { sendPointMail } = require("./utils/sendPointMail");
const { updateBadakPointDB } = require("./utils/notion");

sendPointMail().catch((e) => {
  console.log(e);
});

updateBadakPointDB().catch((e) => {
  console.log(e);
});
