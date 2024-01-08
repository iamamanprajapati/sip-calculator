export const getTotalInvestment = (calculatedResults) => {
    if (calculatedResults.length === 0) {
      return null; // or any default value you prefer
    }
    return calculatedResults
      .reduce(
        (sum, calculatedResults) =>
          sum + parseFloat(calculatedResults.sipAmount),
        0
      )
      .toFixed(0);
  };

  