import React, {useEffect, useState} from 'react';
import './App.css';

import CurrencyRow from './components/CurrencyRow/CurrencyRow';

const BASE_URL = 'https://api.exchangeratesapi.io/latest';

function App() {

  const [currencyOptions, setcurrencyOptions] = useState([])
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();

  useEffect(() => {
    fetch(BASE_URL)
    .then(res => res.json())
    .then(data => {
      const firstCurrency = Object.keys(data.rates)[0]
      console.log(firstCurrency)
      setcurrencyOptions([data.base, ...Object.keys(data.rates)])
      setFromCurrency(data.base)
      setToCurrency(firstCurrency)

    })
  }, [])

  return (
    <div className="App">
     <h1>Convert</h1>
     <CurrencyRow 
     currencyOptions={currencyOptions}
     selectedtCurrency={fromCurrency}
     onChangeCurrency={e => setFromCurrency(e.target.value)}
     />
     <div className="equals">=</div>
     <CurrencyRow
     currencyOptions={currencyOptions}
     selectedtCurrency={toCurrency}
     onChangeCurrency={e => setToCurrency(e.target.value)}
     />
    </div>
  );
}

export default App;
