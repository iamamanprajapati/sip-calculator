import React from "react";
import { Chart } from "react-google-charts";
import { options } from "./utils/constant";

const PieChart = ({chartData}) => {
  return (
    <Chart
      chartType="PieChart"
      data={chartData}
      options={options}
    />
  );
};

export default PieChart;
