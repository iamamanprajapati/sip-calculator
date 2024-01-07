import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [initialAmount, setInitialAmount] = useState(1000);
  const [monthlyReturn, setMonthlyReturn] = useState(1.5);
  const [annualIncrease, setAnnualIncrease] = useState(10);
  const [numberOfMonths, setNumberOfMonths] = useState(300);
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "",
    direction: "",
  });

  const sipCalculator = (
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

  const sortSymbols = {
    asc: "\u2191", // Up arrow
    desc: "\u2193", // Down arrow
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleCalculate = () => {
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

    setResults(calculatedResults);
    setError("");
  };

  const handleDownload = () => {
    if (results.length === 0) {
      setError("No results to download.");
      return;
    }

    const csvData = results
      .map((result) => Object.values(result).join(","))
      .join("\n");
    const blob = new Blob([csvData], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "sip_results.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setError("");
  };

  const sortedResults = [...results].sort((a, b) => {
    if (sortConfig.direction === "asc") {
      return a[sortConfig.key] - b[sortConfig.key];
    } else if (sortConfig.direction === "desc") {
      return b[sortConfig.key] - a[sortConfig.key];
    }
    return 0;
  });

  return (
    <div className="App">
      <header className="App-header">
        <h1>SIP Calculator</h1>
        <div className="calculator-container">
          <div className="inputs-div">
            <div className="input-group">
              <label htmlFor="initialAmount" className="label">
                Initial Amount:
              </label>
              <input
                className="input-type"
                id="initialAmount"
                type="text"
                value={initialAmount}
                onChange={(e) => setInitialAmount(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label className="label">Monthly Return (%):</label>
              <input
                className="input-type"
                type="text"
                value={monthlyReturn}
                onChange={(e) => setMonthlyReturn(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label className="label">Annual Increase (%):</label>
              <input
                className="input-type"
                type="text"
                value={annualIncrease}
                onChange={(e) => setAnnualIncrease(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label className="label">Number of Months:</label>
              <input
                className="input-type"
                type="text"
                value={numberOfMonths}
                onChange={(e) => setNumberOfMonths(e.target.value)}
              />
            </div>
            <button className="calculate-button" onClick={handleCalculate}>Calculate</button>
          </div>
          {error && <p className="error">{error}</p>}
        </div>
      </header>
      {results.length > 0 ? (
        <div className="table-wrap">
          <div className="result">
            <h2>Result:</h2>
            <button className="download-button" onClick={handleDownload}>Download CSV</button>
          </div>
          <div className="result-container">
            <table>
              <thead>
                <tr>
                  <th onClick={() => handleSort("month")}>
                    Month{" "}
                    {sortConfig.key === "month" &&
                      sortSymbols[sortConfig.direction]}
                    {!sortConfig.key && sortSymbols.asc}
                    {!sortConfig.key && sortSymbols.desc}
                  </th>
                  <th onClick={() => handleSort("sipAmount")}>
                    SIP Amount{" "}
                    {sortConfig.key === "sipAmount" &&
                      sortSymbols[sortConfig.direction]}
                    {!sortConfig.key && sortSymbols.asc}
                    {!sortConfig.key && sortSymbols.desc}
                  </th>
                  <th onClick={() => handleSort("totalAmount")}>
                    Total Amount{" "}
                    {sortConfig.key === "totalAmount" &&
                      sortSymbols[sortConfig.direction]}
                    {!sortConfig.key && sortSymbols.asc}
                    {!sortConfig.key && sortSymbols.desc}
                  </th>
                  <th onClick={() => handleSort("dividendAmount")}>
                    Dividend{" "}
                    {sortConfig.key === "dividendAmount" &&
                      sortSymbols[sortConfig.direction]}
                    {!sortConfig.key && sortSymbols.asc}
                    {!sortConfig.key && sortSymbols.desc}
                  </th>
                  <th onClick={() => handleSort("investAmount")}>
                    Invested Amount{" "}
                    {sortConfig.key === "investAmount" &&
                      sortSymbols[sortConfig.direction]}
                    {!sortConfig.key && sortSymbols.asc}
                    {!sortConfig.key && sortSymbols.desc}
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedResults.map((result, index) => (
                  <tr key={index}>
                    <td>{result.month}</td>
                    <td>{result.sipAmount}</td>
                    <td>{result.totalAmount}</td>
                    <td>{result.dividendAmount}</td>
                    <td>{result.investAmount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <br />
      )}
    </div>
  );
};

export default App;
