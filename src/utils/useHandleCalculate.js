import { sipCalculator } from "./useSipCalculator";
import { getTotalWealth } from "./getTotalWealth";
import { getTotalInvestment } from "./getTotalInvestment";

export const handleCalculate = (
  initialAmount,
  monthlyReturn,
  annualIncrease,
  numberOfMonths,
  data,
  setChartData,
  setResults,
  setError
) => {
  if (
    isNaN(initialAmount) ||
    isNaN(monthlyReturn) ||
    isNaN(annualIncrease) ||
    isNaN(numberOfMonths)
  ) {
    setError("Please enter valid numbers for all fields.");
    return;
  }

  const calculatedResults = sipCalculator(
    parseFloat(initialAmount),
    parseFloat(monthlyReturn),
    parseFloat(annualIncrease),
    parseInt(numberOfMonths)
  );

  data.push(["Total Wealth", parseInt(getTotalWealth(calculatedResults))]);
  data.push([
    "Total Investment",
    parseInt(getTotalInvestment(calculatedResults)),
  ]);
  setChartData(data);
  setResults(calculatedResults);
  setError("");
};
