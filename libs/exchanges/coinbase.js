const https = require("https");

const getMarketPrice = (base, currency) => {
  return new Promise((resolve, reject) => {
    https
      .get(
        `https://api.coinbase.com/v2/prices/${base}-${currency}/spot`,
        (response) => {
          if (response.statusCode >= 400) {
            // Ensure the response is not kept in memory, causing memory leaks.
            response.resume();
            reject(
              Error(
                `Coinbase API: api responded error status code (${response.statusCode})`
              )
            );
          }

          let body = "";
          response.on("data", (chunk) => {
            body += chunk;
          });

          response.on("end", () => {
            try {
              const amount = parseFloat(JSON.parse(body).data.amount);
              resolve(amount);
            } catch (error) {
              reject(
                Error(
                  `Coinbase API: api response has invalid format (${error.toString()})`
                )
              );
            }
          });
        }
      )
      .on("error", (error) => {
        reject(Error(`Coinbase API: unexpected error (${error.toString()})`));
      });
  });
};

module.exports = {
  getMarketPrice,
};
