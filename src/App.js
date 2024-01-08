import React, { useState, useEffect } from "react";
import "./App.css";
import { data } from "./utils/constant";
import { handleCalculate } from "./utils/useHandleCalculate";
import { handleSort } from "./utils/useHandleSort";
import Header from "./Header";
import Table from "./Table";
import CalculateForm from "./CalculateForm";
import Result from "./Result";
import PieChart from "./PieChart";

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
  const [chartData, setChartData] = useState(data);

  const handleSortWrapper = (key) => {
    handleSort(sortConfig, setSortConfig, key);
  };

  const handleCalculateWrapper = () => {
    handleCalculate(
      initialAmount,
      monthlyReturn,
      annualIncrease,
      numberOfMonths,
      data,
      setChartData,
      setResults,
      setError
    );
  };

  const tableProps = {
    handleSortWrapper,
    sortConfig,
    results,
  };

  const formProps = {
    initialAmount,
    setInitialAmount,
    monthlyReturn,
    setMonthlyReturn,
    annualIncrease,
    setAnnualIncrease,
    numberOfMonths,
    setNumberOfMonths,
    handleCalculateWrapper,
    error,
  };

  return (
    <div className="App">
      <Header />
      <CalculateForm {...formProps} />
      {/* <div className="chart-wrapper">
        <div>
          {results.length > 0 ? <PieChart chartData={chartData} /> : <br />}
        </div>
        <div>
          {results.length > 0 ? <PieChart chartData={chartData} /> : <br />}
        </div>
      </div> */}
      {results.length > 0 ? (
        <div className="table-wrap">
          <Result results={results} />
          <Table {...tableProps} />
        </div>
      ) : (
        <h1></h1>
      )}
    </div>
  );
};

export default App;
