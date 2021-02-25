/**
 * Converts an amount to a numberic representation
 *
 * @param {string} amount The amount, expected to be a string to convert
 * @returns {number} The amount as a number
 */
function normalizeAmount(amount) {
  if (typeof amount === 'string') {
    return Number(amount.replace(/,/g, ''));
  }

  return Number(amount);
}

function to2Decimals(value) {
  return Math.trunc(value * 100) / 100;
}

module.exports = { normalizeAmount, to2Decimals };
