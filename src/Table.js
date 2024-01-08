import React from 'react'
import { sortSymbols } from "./utils/constant";

const Table = ({sortConfig,handleSortWrapper,results}) =>{

    const sortedResults = [...results].sort((a, b) => {
        if (sortConfig.direction === "asc") {
          return a[sortConfig.key] - b[sortConfig.key];
        } else if (sortConfig.direction === "desc") {
          return b[sortConfig.key] - a[sortConfig.key];
        }
        return 0;
      });

    return(
        <div className="result-container">
            <table>
              <thead>
                <tr>
                  <th onClick={() => handleSortWrapper("month")}>
                    Month{" "}
                    {sortConfig.key === "month" &&
                      sortSymbols[sortConfig.direction]}
                    {!sortConfig.key && sortSymbols.asc}
                    {!sortConfig.key && sortSymbols.desc}
                  </th>
                  <th onClick={() => handleSortWrapper("sipAmount")}>
                    SIP Amount{" "}
                    {sortConfig.key === "sipAmount" &&
                      sortSymbols[sortConfig.direction]}
                    {!sortConfig.key && sortSymbols.asc}
                    {!sortConfig.key && sortSymbols.desc}
                  </th>
                  <th onClick={() => handleSortWrapper("totalAmount")}>
                    Total Amount{" "}
                    {sortConfig.key === "totalAmount" &&
                      sortSymbols[sortConfig.direction]}
                    {!sortConfig.key && sortSymbols.asc}
                    {!sortConfig.key && sortSymbols.desc}
                  </th>
                  <th onClick={() => handleSortWrapper("dividendAmount")}>
                    Dividend{" "}
                    {sortConfig.key === "dividendAmount" &&
                      sortSymbols[sortConfig.direction]}
                    {!sortConfig.key && sortSymbols.asc}
                    {!sortConfig.key && sortSymbols.desc}
                  </th>
                  <th onClick={() => handleSortWrapper("investAmount")}>
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
    )
}


export default Table;