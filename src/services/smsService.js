const axios = require("axios");

const CONTACTS = [
    "8190989198"
];

async function sendSMS(message) {
  try {
    await axios.post(
      "https://www.fast2sms.com/dev/bulkV2",
      {
        route: "q",
        language: "english",
        message: message,
        numbers: CONTACTS.join(","),
      },
      {
        headers: {
          authorization: process.env.FAST2SMS_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("SMS Sent Successfully");
  } catch (error) {
    console.error("SMS Failed:", error.response?.data || error.message);
  }
}

module.exports = { sendSMS };
