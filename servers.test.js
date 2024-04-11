describe("Servers Test (with setup and tear-down)", () => {
  beforeEach(() => {
    serverNameInput.value = 'Alice';
  });
  it('should add a new server to allServers on submitServerInfo()', () => {
    submitServerInfo();
    expect(Object.keys(allServers).length).toEqual(1);
    expect(allServers['server' + serverId].serverName).toEqual('Alice');
  });
  afterEach(() => {
    allServers = {};
    serverId = 0;
    for (item of serverTbody.querySelectorAll("tr")) {
      if (!item.getAttribute("id"))
        continue;
      if (item.getAttribute("id").substring(0, 6) === "server")
        item.remove();
    }
  });
});
describe("Should track multiple servers properly", () => {
  beforeEach(() => {
    serverNameInput.value = 'Alice';
    submitServerInfo();
    serverNameInput.value = 'Bob';
    submitServerInfo();
  });
  it('Should have servers appended correctly', () => {
    expect(Object.keys(allServers).length).toEqual(2);
    let serverCount = 1;
    while (serverCount != (serverId + 1))
      expect(serverTbody.querySelector("#server" + serverCount++));

    serverNameInput.value = 'Ty';
    submitServerInfo();
    expect(Object.keys(allServers).length).toEqual(3);
    serverCount = 1;
    while (serverCount != (serverId + 1))
      expect(serverTbody.querySelector("#server" + serverCount++));

    serverNameInput.value = 'Pete';
    submitServerInfo();
    expect(Object.keys(allServers).length).toEqual(4);
    serverCount = 1;
    while (serverCount != (serverId + 1))
      expect(serverTbody.querySelector("#server" + serverCount++));

    serverNameInput.value = 'NewServer';
    submitServerInfo();
    expect(Object.keys(allServers).length).toEqual(5);
    serverCount = 1;
    while (serverCount != (serverId + 1))
      expect(serverTbody.querySelector("#server" + serverCount++));
  });
  afterEach(() => {
    allServers = {};
    serverId = 0;
    for (item of serverTbody.querySelectorAll("tr")) {
      if (!item.getAttribute("id"))
        continue;
      if (item.getAttribute("id").substring(0, 6) === "server")
        removeServer(item.getAttribute("id"));
    }
  });
});

describe("Tip Pool should work properly", () => {
  beforeEach(() => {
    serverNameInput.value = 'Alice';
    submitServerInfo();
    serverNameInput.value = 'Bob';
    submitServerInfo();
    serverNameInput.value = 'Jen';
    submitServerInfo();
    serverNameInput.value = 'Ty';
    submitServerInfo();
  });
  it('should split to correct amount', () => {
    billAmtInput.value = "100";
    tipAmtInput.value = "20";
    submitPaymentInfo();
    billAmtInput.value = "100";
    tipAmtInput.value = "20";
    submitPaymentInfo();
    expect(Object.keys(allServers).length).toEqual(4);
    let serverCount = 1;
    while (serverCount != (serverId + 1)) {
      expect(document.querySelector("#server" + serverCount));
      expect(document.querySelector("#server" + serverCount++ + " > td:nth-child(2)").innerText).toEqual("$10.00");
    }
    let paymentCount = 1;
    while (paymentCount != (paymentId + 1))
      expect(paymentTbody.querySelector("#payment" + paymentCount++));
    expect(summaryTds[0].innerText).toEqual("$200");
    expect(summaryTds[1].innerText).toEqual("$40");
    expect(summaryTds[2].innerText).toEqual("20%");
  });
  afterEach(() => {
    tipAmtInput.value = "";
    billAmtInput.value = "";
    allServers = {};
    allPayments = {};
    serverId = 0;
    paymentId = 0;
    updateServerTable();
    updatePaymentTable();
    updateSummary();
  });
});