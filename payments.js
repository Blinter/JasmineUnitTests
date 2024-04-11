let billAmtInput = document.getElementById('billAmt');
let tipAmtInput = document.getElementById('tipAmt');
let paymentForm = document.getElementById('paymentForm');
let paymentTbody = document.querySelector('#paymentTable tbody');
let summaryTds = document.querySelectorAll('#summaryTable tbody tr td');
var allPayments = {};
var paymentId = 0;
paymentForm.addEventListener('submit', submitPaymentInfo);
/**
 * Checks payment form for valid input and updates DOM and global variables. Clears the form.
 * @param {Event} e
 * @returns {void}
 */
function submitPaymentInfo(e) {
  if (e) e.preventDefault(); // when running tests there is no event
  const payment = createCurPayment();
  if (!payment)
    return;
  allPayments['payment' + ++paymentId] = payment;
  updatePaymentTable();
  updateServerTable();
  updateSummary();
  billAmtInput.value = '';
  tipAmtInput.value = '';
}
/**
 * Creates a payment array object based on input values on the payment form
 * @returns {array} { billAmt, tipAmt, tipPercent }
 */
function createCurPayment() {
  let billAmt = billAmtInput.value;
  let tipAmt = tipAmtInput.value;
  if (billAmt === '' || tipAmt === '') return;
  if (Number(billAmt) > 0 && Number(tipAmt) >= 0)
    return {
      billAmt: billAmt,
      tipAmt: tipAmt,
      tipPercent: calculateTipPercent(billAmt, tipAmt),
    }
}
/**
 * Removes a unique payment from the payment table by recreating the global 2D array containing payments
 * @param  {string} paymentId unique payment ID
 * @returns {void}
 */
function removePayment(paymentId) {
  let tempPayments = [];
  let tempPaymentId = 1;
  for (item in allPayments)
    if (item && item != paymentId)
      tempPayments['payment' + tempPaymentId++] = {
        billAmt: allPayments[item].billAmt,
        tipAmt: allPayments[item].tipAmt,
        tipPercent: calculateTipPercent(allPayments[item].billAmt, allPayments[item].tipAmt)
      };
  allPayments = tempPayments;
}
/**
 * Clears and updates the payment table based on a global two-dimensional array
 * @return {void}
 */
function updatePaymentTable() {
  paymentTbody.innerHTML = '';
  for (let key in allPayments) {
    let curPayment = allPayments[key];
    let newTr = document.createElement('tr');
    newTr.id = key;
    appendTd(newTr, "$" + curPayment.billAmt);
    appendTd(newTr, "$" + curPayment.tipAmt);
    appendTd(newTr, curPayment.tipPercent + "%");
    appendDeleteBtn(newTr);
    paymentTbody.append(newTr);
  }
}
/**
 * Updates the Shift Summary Statistics
 * @return {void}
 */
function updateSummary() {
  let tipPercentAvg;
  let paymentTotal = sumPaymentTotal('tipPercent');
  let numberOfPayments = Object.keys(allPayments).length;
  if (paymentTotal === 0 && numberOfPayments === 0)
    tipPercentAvg = 0;
  else
    tipPercentAvg = paymentTotal / Object.keys(allPayments).length;
  summaryTds[0].innerHTML = '$' + sumPaymentTotal('billAmt');
  summaryTds[1].innerHTML = '$' + sumPaymentTotal('tipAmt');
  summaryTds[2].innerHTML = Math.round(tipPercentAvg) + '%';
}