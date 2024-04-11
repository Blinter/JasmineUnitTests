/**
 * Accepts 'tipAmt', 'billAmt', 'tipPercent' and sums total from allPayments objects
 * @param {string} type Identifier in Payments object
 * @return {number} Sum of total from data object selected
 */
function sumPaymentTotal(type) {
  let total = 0;
  for (let key in allPayments) {
    let payment = allPayments[key];
    total += Number(payment[type]);
  }
  return total;
}

/**
 * Converts the bill and tip amount into a tip percent
 * @param {number} billAmt Bill Amount
 * @param {number} tipAmt Tip Amount
 * @return {number} Tip percentage of bill rounded
 */
function calculateTipPercent(billAmt, tipAmt) {
  return Math.round(100 / (billAmt / tipAmt));
}

// expects a table row element, appends a newly created td element from the value

/**
 * Appends a new column to a table that allows the user to delete a newly added row by classifying the same ID of the element.
 * @param {Element} tr Parent Element
 * @param {string} value Text which will be applied to the newly created column
 * @returns {void}
 */
function appendTd(tr, value) {
  let newTd = document.createElement('td');
  newTd.innerText = value;
  tr.append(newTd);
}
/** 
* Appends a new column to a table that allows the user to delete a newly added row by classifying the same ID of the element.
* @param {Element} tr Parent Element
* @returns {void}
*/
function appendDeleteBtn(tr){
 const newXButton = document.createElement("td");
 newXButton.innerText = "X";
 newXButton.setAttribute("id",tr.getAttribute("id"));  
 newXButton.className = "DELETE";
 tr.append(newXButton);
}
