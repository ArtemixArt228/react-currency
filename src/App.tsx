import React, { useEffect, useState } from "react";

import "./App.css";
import Header from "./components/Header";
import ExchangeInput from "./components/ExchangeInput";

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [amount, setAmount] = useState<number>(1);
  const [exchangeRate, setExchangeRate] = useState<number>(0);
  const [convertFromCurr, setConvertFromCurr] = useState<string>("");
  const [convertToCurr, setConvertToCurr] = useState<string>("");
  const [amountFromOrTo, setAmountFromOrTo] = useState(true);

  let fromAmount,
    toAmount = 0;

  if (amountFromOrTo) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  const myHeaders = new Headers();
  myHeaders.append("apikey", "10nemMV8bvcLpMP3XK0AQdsSwJVGqCBQ");

  const requestOptions: object = {
    method: "GET",
    redirect: "follow",
    headers: myHeaders,
  };

  const fetchCurrency = async () => {
    const res = await fetch(
      `https://api.apilayer.com/exchangerates_data/latest?symbols=USD%2C%20EUR%2C%20GBP%2C%20PLN&base=UAH`,
      requestOptions
    );

    const data = await res.json();

    const firstRatesCurrency: string = Object.keys(data.rates)[0];

    // @ts-ignore
    setCurrencyOptions([data.base, ...Object.keys(data.rates)]);

    setConvertFromCurr(data.base);
    setConvertToCurr(firstRatesCurrency);
    setExchangeRate(data.rates[firstRatesCurrency]);
  };

  const handleFromChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(parseFloat(e.target.value));
    setAmountFromOrTo(true);
  };
  const handleToChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(parseFloat(e.target.value));
    setAmountFromOrTo(false);
  };

  useEffect(() => {
    fetchCurrency();
  }, []);

  useEffect(() => {
    if (convertToCurr != "" && convertFromCurr != "") {
      fetch(
        `https://api.apilayer.com/exchangerates_data/latest?symbols=${convertToCurr}&base=${convertFromCurr}`,
        requestOptions
      )
        .then((res) => res.json())
        .then((data) => setExchangeRate(data.rates[convertToCurr]));
    }
  }, [convertToCurr, convertFromCurr]);

  return (
    <div>
      <Header />
      <div className="main">
        <ExchangeInput
          options={currencyOptions}
          amount={fromAmount}
          selectedCurrency={convertFromCurr}
          changeOption={(e: React.ChangeEvent<HTMLInputElement>) => {
            setConvertFromCurr(e.target.value);
          }}
          changeAmount={handleFromChangeAmount}
        />
        Convert Currency
        <ExchangeInput
          changeOption={(e: React.ChangeEvent<HTMLInputElement>) => {
            setConvertToCurr(e.target.value);
          }}
          options={currencyOptions}
          amount={toAmount}
          selectedCurrency={convertToCurr}
          changeAmount={handleToChangeAmount}
        />
      </div>
    </div>
  );
}

export default App;
