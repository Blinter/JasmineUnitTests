let serverNameInput = document.getElementById('serverName');
let serverForm = document.getElementById('serverForm');
let serverTbody = document.querySelector('#serverTable tbody');
let allServers = {};
let serverId = 0;
serverForm.addEventListener('submit', submitServerInfo);
document.addEventListener("click", registerClick);
/**
 * Checks add server form for valid input and updates the DOM and global variables. Clears the form.
 * @param {Event} e
 * @returns {void}
 */
function submitServerInfo(e) {
  if (e) e.preventDefault();
  let serverName = serverNameInput.value;
  if (!serverName)
    return;
  allServers['server' + ++serverId] = { serverName };
  updateServerTable();
  serverNameInput.value = '';
}
/**
 * Clears and updates the server table based on a global two-dimensional array
 * @return {void}
 */
function updateServerTable() {
  serverTbody.innerHTML = '';
  for (let key in allServers) {
    let curServer = allServers[key];
    let newTr = document.createElement('tr');
    newTr.setAttribute('id', key);
    let tipAverage = sumPaymentTotal('tipAmt') / Object.keys(allServers).length;
    appendTd(newTr, curServer.serverName);
    appendTd(newTr, '$' + tipAverage.toFixed(2));
    appendDeleteBtn(newTr);
    serverTbody.append(newTr);
  }
}
/**
 * Removes a unique payment from the payment table by recreating the global 2D array containing servers
 * @param  {string} serverId unique Server ID
 * @returns {void}
 */
function removeServer(serverId) {
  let tempServers = [];
  let tempServerId = 1;
  for (item in allServers)
    if (item && item != serverId)
      tempServers['server' + tempServerId++] = allServers[item];
  allServers = tempServers;
}
/**
 * Callback function used to listen for clicks specifically for deleting a registered server or payment
 * @param {Event} e
 * @returns {void}
 */
function registerClick(e) {
  if (e.target.className === "DELETE")
    switch (e.target.id[0]) {
      case "s":
        removeServer(e.target.id);
        updateServerTable();
        break;
      case "p":
        removePayment(e.target.id);
        updatePaymentTable();
        updateSummary();
        updateServerTable();
        break;
      default:
        break;
    }
};