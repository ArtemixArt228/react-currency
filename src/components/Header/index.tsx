import React, { useEffect, useState } from "react";

import "./index.css";

import { Currency } from "../../interfaces";

import { AiFillDollarCircle, AiFillEuroCircle } from "react-icons/ai";

const Header = () => {
  const [usdCourse, setUsdCourse] = useState<Currency | null>(null);
  const [eurCourse, setEurCourse] = useState<Currency | null>(null);

  const getPrivatApi = async () => {
    const res = await fetch(
      "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=11"
    );
    const data = await res.json();

    setUsdCourse(data[0]);
    setEurCourse(data[1]);
  };

  useEffect(() => {
    getPrivatApi();
  }, []);

  return (
    <header className="header">
      <div className="header_container">
        <div className="header_body">
          <div className="header_title">
            <h1>Artemix's Currency Convertor</h1>
          </div>
          <div className="header_currency">
            {usdCourse !== null && eurCourse !== null ? (
              <div className="header_currency-body">
                <div className="header_currency-item">
                  <AiFillDollarCircle />
                  <p>
                    {parseFloat(usdCourse.buy).toFixed(2)} /{" "}
                    {parseFloat(usdCourse.sale).toFixed(2)}
                  </p>
                </div>
                <div className="header_currency-item">
                  <AiFillEuroCircle />
                  <p>
                    {parseFloat(eurCourse.buy).toFixed(2)} /{" "}
                    {parseFloat(eurCourse.sale).toFixed(2)}
                  </p>
                </div>
              </div>
            ) : (
              <p>'loading'</p>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
