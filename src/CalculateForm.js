import React from "react"

const CalculateForm = ({
    initialAmount,
    setInitialAmount,
    monthlyReturn,
    setMonthlyReturn,
    annualIncrease,
    setAnnualIncrease,
    numberOfMonths,
    setNumberOfMonths,
    handleCalculateWrapper,
    error
  }) =>{
    return(
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
            <button
              className="calculate-button"
              onClick={handleCalculateWrapper}
            >
              Calculate
            </button>
          </div>
          {error && <p className="error">{error}</p>}
        </div>
    )
}


export default CalculateForm