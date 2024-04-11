describe("Payments test (with setup and tear-down)", () => {
    beforeEach(() => {
        billAmtInput.value = "100";
        tipAmtInput.value = "20";
    });

    it('should add new payment', () => {
        submitPaymentInfo();
        expect(Object.keys(allPayments).length).toEqual(1);
        expect(allPayments["payment1"].billAmt).toEqual("100");
        expect(allPayments["payment1"].tipAmt).toEqual("20");
    });

    it('input empty should not allow adding payment', () => {
        tipAmtInput.value = "";
        billAmtInput.value = "";
        submitPaymentInfo();
        expect(Object.keys(allPayments).length).toEqual(0);
    });

    it('input empty should not create payment object', () => {
        tipAmtInput.value = "";
        billAmtInput.value = "";
        expect(createCurPayment()).toEqual(undefined);
    });

    it('should append payment to table', () => {
        let curPayment = createCurPayment();
        allPayments['payment1'] = curPayment;
        updatePaymentTable();
        expect(paymentTbody.querySelector("#payment1")).not.toEqual(false);
        let currentPaymentsList = document.querySelectorAll('#paymentTable tbody tr td');
        expect(currentPaymentsList.length).toEqual(4);
        expect(currentPaymentsList[0].innerText).toEqual("$100");
        expect(currentPaymentsList[1].innerText).toEqual("$20");
        expect(currentPaymentsList[2].innerText).toEqual("20%");
        expect(currentPaymentsList[3].innerText).toEqual("X");
    });

    it("Should create a curPayment table", () => {
        expect(createCurPayment()).toEqual({ billAmt: "100", tipAmt: "20", tipPercent: 20 });
    });

    afterEach(() => {
        allPayments = {};
        allServers = {};
        tipAmtInput.value = "";
        billAmtInput.value = "";
        updateServerTable();
        updatePaymentTable();
        updateSummary();
    });
});