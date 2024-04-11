
it('should calculate the monthly rate correctly', () => {
  expect(calculateMonthlyPayment({amount: 250000, rate: 0.25, years: 15})).toEqual("5338.82");
  expect(calculateMonthlyPayment({amount: 5000000, rate: 0.30, years: 2.5})).toEqual("238888.20");
  expect(calculateMonthlyPayment({amount: 2000, rate: 0.2999, years: 0.5})).toEqual("363.09");
  expect(calculateMonthlyPayment({amount: 1, rate: 0.0001, years: 3})).toEqual("0.03");
  expect(calculateMonthlyPayment({amount: 2000, rate: 0.2999, years: 0.5})).toEqual("363.09");
  expect(calculateMonthlyPayment({amount: 999999, rate: 0.99, years: 100})).toEqual("82499.92");
  expect(calculateMonthlyPayment({amount: 987654231.99, rate: 5.6848, years: 89})).toEqual("467884731.50");
});

it("should round properly", () => {
  expect(calculateMonthlyPayment({amount: 8336.10, rate: 1.00, years: 8})).toEqual("694.99");
  expect(calculateMonthlyPayment({amount: 8336.11, rate: 1.00, years: 8})).toEqual("695.00");
  expect(calculateMonthlyPayment({amount: 8336.23, rate: 1.00, years: 8})).toEqual("695.01");
  expect(calculateMonthlyPayment({amount: 8336.34, rate: 1.00, years: 8})).toEqual("695.01");
  expect(calculateMonthlyPayment({amount: 8336.35, rate: 1.00, years: 8})).toEqual("695.02");
});

it("should handle high amounts", () => {
  expect(calculateMonthlyPayment({amount: 9999999999999999999.99, rate: 10.000, years: 99.9999})).toEqual("8333333333333334016.00");
});

it("should return a result with 2 decimal places", () => {
  expect(calculateMonthlyPayment({amount: 8336.11, rate: 1.00, years: 8})).toEqual("695.00");
});

it("should set Default UI values correctly", () => {  
  const amount = "100000";
  const years = "30";
  const rate = "0.06";
  expect(getCurrentUIValues()).toEqual({amount: +amount, years: +years,rate: +rate});
});

it("should Get UI values correctly", () => {  
  const amount = "100000";
  const years = "30";
  const rate = "0.06";
  document.getElementById("loan-amount").value = amount;
  document.getElementById("loan-years").value = years;
  document.getElementById("loan-rate").value = rate;
  expect(getCurrentUIValues()).toEqual({amount: +amount, years: +years,rate: +rate});
});

it("should process getRateMonthly correctly", () => {
  expect(getRateMonthly(0.05)).toEqual(0.004166666666666667);
  expect(getRateMonthly(0.01)).toEqual(0.0008333333333333334);
  expect(getRateMonthly(0.03)).toEqual(0.0025);
  expect(getRateMonthly(0.06)).toEqual(0.005);
  expect(getRateMonthly(0.09)).toEqual(0.0075);
  expect(getRateMonthly(0.12)).toEqual(0.01);
  expect(getRateMonthly(0.24)).toEqual(0.02);
  expect(getRateMonthly(0.36)).toEqual(0.03);
  expect(getRateMonthly(0.48)).toEqual(0.04);
  expect(getRateMonthly(0.68)).toEqual(0.05666666666666667);
});

it("should round properly", () => {
  expect(+rounding(100.9999)).toEqual(+101.00);
  expect(+rounding(100.99599)).toEqual(+101.00);
  expect(+rounding(100.99499)).toEqual(+100.99);
});

it("should calculate total months properly from years", () => {
  expect(totalMonthlyPayments(200)).toEqual(2400);
  expect(totalMonthlyPayments(12)).toEqual(144);
  expect(totalMonthlyPayments(1)).toEqual(12);
  expect(totalMonthlyPayments(0.5)).toEqual(6);
  expect(totalMonthlyPayments(0.25)).toEqual(3);
  expect(totalMonthlyPayments(0.125)).toEqual(1.5);
});

it("should calculate bottom half of monthly payment formula properly", () => {
  expect(getTotalMonthlyPayment(0.09999, 225)).toEqual(0.9999999998138627);
  expect(getTotalMonthlyPayment(300, 2.26)).toEqual(1);
  expect(getTotalMonthlyPayment(30, 0.06)).toEqual(0.5942383404963658);
  expect(getTotalMonthlyPayment(15, 0.03)).toEqual(0.2531828312614577);
  expect(getTotalMonthlyPayment(5, 0.01)).toEqual(0.04093536046738089);
  expect(getTotalMonthlyPayment(1, 0.005)).toEqual(0.004791048596709979);
});

describe("it should process calculated data correctly", () => {
  beforeEach(() => {    
  const amount = "100000";
  const years = "30";
  const rate = "0.06";
  document.getElementById("loan-amount").value = amount;
  document.getElementById("loan-years").value = years;
  document.getElementById("loan-rate").value = rate;
  });
  it("should update DOM properly", () => {    
    let amount = "10000";
    let years = "3";
    let rate = "0.1999";
    document.getElementById("loan-amount").value = amount;
    document.getElementById("loan-years").value = years;
    document.getElementById("loan-rate").value = rate;
    update();
    expect(document.getElementById("monthly-payment").innerHTML).toEqual("$371.58<br><br>Yearly: $4458.96<br>Total: $13376.88<br>Interest: $3376.88 (33.7688%)");
    amount = "8898.848";
    years = "3.21";
    rate = "0.05898";
    document.getElementById("loan-amount").value = amount;
    document.getElementById("loan-years").value = years;
    document.getElementById("loan-rate").value = rate;
    update();
    expectedOutput = "$254.14<br><br>Yearly: $3049.68<br>Total: $9789.47<br>Interest: $890.62 (10.0083%)";
    expect(document.getElementById("monthly-payment").innerHTML).toEqual(expectedOutput);
  });
  afterEach(() => {
    document.getElementById("monthly-payment").value = "";
    const amount = "100000";
    const years = "30";
    const rate = "0.06";
    document.getElementById("loan-amount").value = amount;
    document.getElementById("loan-years").value = years;
    document.getElementById("loan-rate").value = rate;
    document.getElementById("monthly-payment").innerText = "";
  });
});
