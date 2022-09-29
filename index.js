const { sendPointMail } = require("./utils/sendPointMail");

sendPointMail().catch((e) => {
  console.log(e);
});
