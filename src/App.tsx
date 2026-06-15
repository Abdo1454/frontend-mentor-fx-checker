import { useEffect, useState } from "react";
import { getCurrencies, Currencies } from "./services/fxServices";

function App() {
  const [currencies, setCurrencies] = useState<Currencies[]>([]);

  useEffect(() => {
    const loadCurrencies = async () => {
      const data = await getCurrencies();
      setCurrencies(data);
    };

    loadCurrencies();
  }, []);

  return (
    <div>
      {currencies.map((currency) => (
        <p key={currency.code}>
          {currency.code} - {currency.name}
        </p>
      ))}
    </div>
  );
}

export default App;