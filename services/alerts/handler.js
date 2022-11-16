const alerts = require("../../config/alerts.json");
const coinbase = require("../../libs/exchanges/coinbase");
const messages = require("../../libs/messages");
const transporter = require("../../libs/emails/transporter");

const checker = async () => {
  try {
    transporter.setTransporter();

    for (const { alert, base, currency, condition, limit } of alerts) {
      const price = await coinbase.getMarketPrice(currency, base);

      if (
        (condition === "above" && price > limit) ||
        (condition === "below" && price < limit)
      ) {
        await transporter.sendEmail(
          alert.email || process.env.ALERT_EMAIL_TO,
          messages.alertToEmailSubject({ base, currency }),
          messages.alertToEmailBody({ base, currency, price, condition, limit })
        );
      }
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  checker,
};
