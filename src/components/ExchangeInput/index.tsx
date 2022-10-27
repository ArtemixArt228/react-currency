import React from "react";

import "./index.css";

const ExchangeInput = ({
  options,
  amount,
  selectedCurrency,
  changeOption,
  changeAmount,
}) => {
  return (
    <div className="exchange-form">
      <input
        value={amount}
        onChange={changeAmount}
        type="number"
        className="input-field"
        min="1"
      />
      <select
        onChange={changeOption}
        value={selectedCurrency}
        className="select-field"
        name="currency"
        id="curr"
      >
        {options.map((option: string) => (
          <option className="option-field" key={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ExchangeInput;
