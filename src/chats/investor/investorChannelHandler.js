// Explicit order strategies for executing multi-leg options orders.
const STRATEGIES = {
  IRON_CONDOR: "IRON_CONDOR",
  CALENDAR: "CALENDAR",
  SINGLE: "SINGLE",
  // COVERED: "COVERED",
  // VERTICAL: "VERTICAL",
  // BACK_RATIO: "BACK_RATIO",
  // DIAGONAL: "DIAGONAL",
  // STRADDLE: "STRADDLE",
  // STRANGLE: "STRANGLE",
  // COLLAR_SYNTHETIC: "COLLAR_SYNTHETIC",
  // BUTTERFLY: "BUTTERFLY",
  // CONDOR: "CONDOR",
  // VERTICAL_ROLL: "VERTICAL_ROLL",
  // COLLAR_WITH_STOCK: "COLLAR_WITH_STOCK",
  // DOUBLE_DIAGONAL: "DOUBLE_DIAGONAL",
  // UNBALANCED_BUTTERFLY: "UNBALANCED_BUTTERFLY",
  // UNBALANCED_CONDOR: "UNBALANCED_CONDOR",
  // UNBALANCED_IRON_CONDOR: "UNBALANCED_IRON_CONDOR",
  // UNBALANCED_VERTICAL_ROLL: "UNBALANCED_VERTICAL_ROLL",
  // CUSTOM: "CUSTOM",
};

// Map each parsing strategy to its corresponding handler module
const handlers = {
  [STRATEGIES.IRON_CONDOR]: require("./handlers/ironCondorOrder"),
  [STRATEGIES.CALENDAR]: require("./handlers/calendarOrder"),
  [STRATEGIES.SINGLE]: require("./handlers/singleOrder").default,
};

/**
 * Parses an order string in the Thinkorswim format and returns an object with the relevant information.
 * @param {string} orderString - The order string to parse.
 * @returns {Object} - An object containing the parsed order information.
 * @throws {Error} - Throws an error if the order string is invalid or cannot be parsed.
 */
function parseOrderString(orderString) {
  // Define the regular expression patterns for each part of the order string
  const rgx = {
    orderType: "(BUY|BOT|Buy|SELL|Sell|sell)", // Order type (buy or sell)
    quantity: "([+-]?\\d+)", // Quantity of shares
    symbol: "([A-Z]+)", // Ticker symbol of the stock or option
    shares: "(\\d+)", // Number of shares in the order
    expirationDate: "(\\d{1,2} [A-Z]{3} \\d{2})", // Expiration date of the option
    strike: "(0|[1-9]\\d*)(\\.\\d+)?", // Strike price of the option
    optionType: "(CALL|PUT)", // Type of option (call or put)
    price: "(\\@-?(0|[1-9]\\d*)?(\\.\\d+)?(?<=\\d))", // Limit price or stop price
    orderCondition: "(STPLMT|LMT|STP)", // Order condition (stop limit, limit, or stop)
    orderTime: "(?: (GTC))?", // Order time (Good Till Cancelled)
  };

  // Define a helper function to create the regular expression for a specific strategy
  const makeOrderRegex = (strategy, extraRegex) => {
    const strategyPattern = strategy.length
      ? `(${regexEscape(strategy)}) `
      : "";

    return new RegExp(
      `${rgx.orderType} ${rgx.quantity} ${strategyPattern}` +
        `${rgx.symbol} ${rgx.shares} ${rgx.expirationDate}` +
        `${extraRegex}` +
        ` ${rgx.price} ${rgx.orderCondition}${rgx.orderTime}$`
    );
  };

  // Define the regular expressions for each strategy, including any additional regex required
  const regexes = {
    [STRATEGIES.IRON_CONDOR]: makeOrderRegex(
      "IRON CONDOR",
      ` ${rgx.strike}\/${rgx.strike}\/${rgx.strike}\/${rgx.strike} ${rgx.optionType}\/${rgx.optionType}`
    ),
    [STRATEGIES.CALENDAR]: makeOrderRegex(
      "CALENDAR",
      `\/${rgx.expirationDate} ${rgx.strike} ${rgx.optionType}`
    ),
    [STRATEGIES.SINGLE]: makeOrderRegex("", ` ${rgx.strike} ${rgx.optionType}`),
  };

  // Iterate over the defined regexes and determine the order type.
  for (const [type, regex] of Object.entries(regexes)) {
    if (regex.test(orderString)) {
      // Call the appropriate handler function for the order type.
      return handlers[type](type, orderString.match(regex));
    }
  }

  // If the order type cannot be determined, log an error.
  console.log(
    "WASN'T ABLE TO PARSE THE STRING, THUS STRATEGY TYPE IS UNKNOWN",
    orderString
  );
}

function isValidTosAction(action) {
  if (!action || action.length < 10) return false;

  const trimmedAction = action.trim();
  const actionType = trimmedAction.split(" ")[0];

  return ["BUY", "SELL"].includes(actionType);
}

function investorsChannelHandler(sock) {
  return function (event) {
    const { message, date } = event.message;
    const logTimestamps = `Received at ${new Date().toLocaleString()} | Posted at ${new Date(
      date * 1000
    ).toLocaleString()}`;

    console.log(`From Investors Channel | ${logTimestamps}`);
    console.log(`Message content: ${message}\n${"-".repeat(35)}\n\n`);

    if (!message || !message.includes("TOS:")) {
      console.log("Empty message or missing TOS string, skipping...");
      return;
    }

    const messageLines = message.split("\n").map((s) => s.trim());

    let tosActionIndex = messageLines.findIndex((s) => s.startsWith("TOS:"));

    // Find a valid TOS action
    while (
      tosActionIndex < messageLines.length &&
      !isValidTosAction(messageLines[tosActionIndex])
    ) {
      console.log(
        "Invalid TOS action, searching next line:",
        messageLines[tosActionIndex]
      );
      tosActionIndex++;
    }

    if (tosActionIndex === messageLines.length) {
      console.log("No valid TOS action found, skipping...");
      return;
    }

    const tosAction = messageLines[tosActionIndex];
    console.log("Valid TOS action line found:", tosAction);

    const parsedString = parseOrderString(
      tosAction
        .replace(/ \(Weeklys\)| \(Quarterlys\)/g, "")
        .replace("@ ", "@")
        .replace("  ", " ")
        .trim()
    );

    console.log(`Sending parsed string: IV%% ${parsedString}`);
    sock.send(`IV%% ${parsedString}`);
  };
}

export default {
  investorsChannelHandler,
};
