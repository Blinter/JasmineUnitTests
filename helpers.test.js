describe("Helpers test (with setup and tear-down)", () => {
    beforeEach(() => {
        billAmtInput.value = "100";
        tipAmtInput.value = "20"; //20.00
        submitPaymentInfo();
        billAmtInput.value = "110";
        tipAmtInput.value = "15"; //7.33
        submitPaymentInfo();
    });
    it("Should sum up total tip found in table", () => {
        expect(sumPaymentTotal("tipAmt")).toEqual(35);
        billAmtInput.value = "110";
        tipAmtInput.value = "15";
        submitPaymentInfo();
        expect(sumPaymentTotal("tipAmt")).toEqual(50);
    });
    it("Should sum up total bill found in table", () => {
        expect(sumPaymentTotal("billAmt")).toEqual(210);
        billAmtInput.value = "110";
        tipAmtInput.value = "15";
        submitPaymentInfo();
        expect(sumPaymentTotal("billAmt")).toEqual(320);
    });
    it("Should sum up total tip percentage found in table", () => {
        expect(sumPaymentTotal("tipAmt")).toEqual(35);
        billAmtInput.value = "110";
        tipAmtInput.value = "15";
        submitPaymentInfo();
        expect(sumPaymentTotal("tipAmt")).toEqual(50);
    });
    it("Should calculate tip percentage correctly", () => {
        expect(calculateTipPercent(100, 25)).toEqual(25);
        expect(calculateTipPercent(200, 25)).toEqual(12.5);
        expect(calculateTipPercent(10, 25)).toEqual(250);
        expect(calculateTipPercent(1, 3)).toEqual(300);
    });
    it("should generate new td with specified value", () => {
        let newTr = document.createElement("tr");
        appendTd(newTr, "newValue");
        expect(newTr.children.length).toEqual(1);
        expect(newTr.firstChild.innerHTML).toEqual("newValue");
    });
    it("should append delete button to a new tr", () => {
        let newTr = document.createElement("tr");
        appendDeleteBtn(newTr);
        expect(newTr.children.length).toEqual(1);
        expect(newTr.firstChild.innerHTML).toEqual("X");
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