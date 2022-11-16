const alertToEmailSubject = ({ base, currency }) =>
  `New price alert on ${currency}/${base}`;

const alertToEmailBody = ({ base, currency, price, condition, limit }) =>
  `<h1>New price alert on ${currency}/${base}</h1><p>${currency} price is ${condition} ${limit} ${base}. Current price is ${price} ${base}.</p>`;

module.exports = {
  alertToEmailSubject,
  alertToEmailBody,
};
