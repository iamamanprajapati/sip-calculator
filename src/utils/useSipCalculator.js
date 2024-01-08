export const sipCalculator = (
    initialAmount,
    monthlyReturn,
    annualIncrease,
    numberOfMonths
  ) => {
    const calculatedResults = [];
    let totalAmount = 0;
    let currentAmount = initialAmount;
    let sipAmount = initialAmount;

    for (let month = 1; month <= numberOfMonths; month++) {
      totalAmount += currentAmount;
      currentAmount += (currentAmount * monthlyReturn) / 100;

      if (month !== 0 && month % 12 === 0) {
        currentAmount += (currentAmount * annualIncrease) / 100;
        sipAmount += (sipAmount * annualIncrease) / 100;
      }

      if (totalAmount >= sipAmount) {
        let dividend = (totalAmount * 0.007) / 12;
        let investedAmount = Math.min(dividend, sipAmount);
        let remainingInvestment = sipAmount - dividend;

        calculatedResults.push({
          month,
          sipAmount: sipAmount.toFixed(0),
          totalAmount: totalAmount.toFixed(0),
          dividendAmount: dividend.toFixed(0),
          investedAmount: investedAmount.toFixed(0),
          investAmount: remainingInvestment.toFixed(0),
        });
      }
    }

    return calculatedResults;
  }; 