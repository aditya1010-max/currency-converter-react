import React, { useState } from 'react';

interface ExchangeRateResponse {
  conversion_rates: {
    [key: string]: number;
  };
}

const currencies = ['USD', 'INR', 'EUR', 'GBP', 'JPY'];

const Converter: React.FC = () => {
  const [amount, setAmount] = useState<number>(0);
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('INR');
  const [converted, setConverted] = useState<number | null>(null);

  const API_KEY = '4e03759ab4d6420757b0382e';

  const handleConvert = async () => {
    try {
      const res = await fetch(
        `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${fromCurrency}`
      );

      const data: ExchangeRateResponse = await res.json();
      console.log("API response:", data);

      if (!data.conversion_rates || !data.conversion_rates[toCurrency]) {
        throw new Error("Invalid response or currency not found");
      }

      const rate = data.conversion_rates[toCurrency];
      const result = amount * rate;
      setConverted(result);
    } catch (err) {
      console.error("Conversion error:", err);
      alert("Error fetching exchange rate. Please check currencies.");
    }
  };

  return (
    <div>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(parseFloat(e.target.value))}
        placeholder="Amount"
      />

      <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
        {currencies.map((cur) => (
          <option key={cur} value={cur}>{cur}</option>
        ))}
      </select>

      <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
        {currencies.map((cur) => (
          <option key={cur} value={cur}>{cur}</option>
        ))}
      </select>

      <button onClick={handleConvert}>Convert</button>

      {converted !== null && (
        <p>
          {amount} {fromCurrency} = {converted.toFixed(2)} {toCurrency}
        </p>
      )}
    </div>
  );
};

export default Converter;
