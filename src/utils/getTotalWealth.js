export const getTotalWealth = (calculatedResults) => {
    console.log(calculatedResults.length);
    if (calculatedResults.length === 0) {
      return null; // or any default value you prefer
    }
    return calculatedResults[calculatedResults.length - 1].totalAmount;
  };