document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById("calc-form");
  if (form) {
    setupIntialValues();
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      update();
    });
  }
});
/**
 * Grab current form input data for calculator
 * @returns {array} {amount, years, rate}
 */
function getCurrentUIValues() {
  return {
    amount: +rounding(+document.getElementById("loan-amount").value),
    years: +(document.getElementById("loan-years").value),
    rate: +(document.getElementById("loan-rate").value),
  }
}
/**
 * Set default values of monthly payment calculator
 * Modifies the DOM and sets the preset values.
 * @returns {void}
 */
function setupIntialValues() {
  const amount = "100000";
  const years = "30";
  const rate = "0.06";

  document.getElementById("loan-amount").value = amount;
  document.getElementById("loan-years").value = years;
  document.getElementById("loan-rate").value = rate;
}
/**
 * Get the current values from the UI
 * Update the monthly payment
 * @returns {void}
 */
function update() {
  updateMonthly(calculateMonthlyPayment(getCurrentUIValues()));
}
/**
 * Get the monthly rate
 * @param {number} rate Percentage (i.e. 12% is 0.12)
 * @returns {number} rate / 12
 */
function getRateMonthly(rate){
  return rate / 12;
}
/**
 * Round a decimal so it can be presented in dollars
 * @param {number} total Amount to be rounded
 * @returns {number} Rounded Number
 */
function rounding(total){
  return total.toFixed(2);
}
/**
 * Calculate total monthly amount of payments from years
 * @param {number} years Quantity of years to calculate total months in
 * @returns {number} Total Months
 */
function totalMonthlyPayments(years){
  return years * 12;
}
/**
 * Calculate the denominator for monthly payment formula as a decimal based on rate and years only
 * @param {number} rate Quantity of years to calculate total months in
 * @param {number} years Quantity of years to calculate total months in
 * @returns {number} Total monthly payment without rounding
 */
function getTotalMonthlyPayment(rate, years){
  return 1 - Math.pow(1 + getRateMonthly(rate), -totalMonthlyPayments(years));
}
/**
 * Calculate Monthly Payment from the formula, rounded
 * @param {array} values Array containing {amount, rate, years} values
 * @returns {number} Total monthly payment 
 */
function calculateMonthlyPayment(values) {
  return rounding(
    (values.amount * getRateMonthly(values.rate)) /
    getTotalMonthlyPayment(values.rate, values.years));
}
/**
 * Updates the DOM and populates the calculator to present results
 * @param {number} monthly Total Monthly Payment
 * @returns {void}
 */
function updateMonthly(monthly) {
  document.getElementById("monthly-payment").innerHTML = "$" + monthly + 
  "<br/><br/>Yearly: $" + rounding(monthly*12) + 
  "<br/>Total: $" + rounding(monthly*12*getCurrentUIValues().years) + 
  "<br/>Interest: $" + rounding((monthly*12*getCurrentUIValues().years)-getCurrentUIValues().amount) +
  " (" + ((((monthly*12*getCurrentUIValues().years)-getCurrentUIValues().amount) / getCurrentUIValues().amount) * 100).toFixed(4) + "%)";
}
