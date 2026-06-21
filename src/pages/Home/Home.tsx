import { useEffect, useState } from "react";
import { getCurrencies } from "../../services/http/currencyService";
import { getLatestRates } from "../../services/http/exchangeRateService";

type Currency = {
  code: string;
  name: string;
  flag: string;
};

export default function Home() {
  const [currencies, setCurrencies] = useState<Currency[]>([]);

  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  // 1. تحميل العملات عند بدء التطبيق
  useEffect(() => {
    async function loadCurrencies() {
      try {
        const data = await getCurrencies();
        
        // التعديل هنا: بما أن data هي مصفوفة مباشرة نمررها فوراً للـ State
        if (Array.isArray(data)) {
          setCurrencies(data);
        }
      } catch (error) {
        console.error("Failed to load currencies:", error);
      } finally {
        setLoading(false);
      }
    }

    loadCurrencies();
  }, []);

  // 2. حساب التحويل عند تغيير العملات أو القيمة
  useEffect(() => {
    async function convert() {
      // حماية: لا تبدأ الحساب وقائمة العملات ما زالت فارغة
      if (currencies.length === 0) return;

      try {
        const data = await getLatestRates(from);
        if (!data) return;

        // التعامل المرن مع الـ Keys للحماية من حالة الأحرف (كبيرة أو صغيرة)
        const baseKey = data[from] ? from : from.toLowerCase();
        const targetKey = data[baseKey]?.[to] ? to : to.toLowerCase();
        
        // محاولة جلب السعر بأكثر من طريقة متوقعة من الـ API
        const rate = data[baseKey]?.[targetKey] || data[to] || data[to.toLowerCase()];

        if (rate !== undefined && rate !== null) {
          setResult(amount * rate);
        } else {
          setResult(null);
        }
      } catch (error) {
        console.error("Failed to fetch rates:", error);
        setResult(null);
      }
    }

    convert();
  }, [from, to, amount, currencies]);

  const swapCurrencies = () => {
    setFrom(to);
    setTo(from);
  };

  // شاشة التحميل لمنع رندر الـ Selects قبل امتلاء المصفوفة بالبيانات
  if (loading) {
    return (
      <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
        <h3>Loading Currencies...</h3>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>FX Checker</h1>

      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <input
          type="number"
          min="0"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          style={{ padding: "5px", width: "80px" }}
        />

        <select
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          style={{ padding: "5px" }}
        >
          {currencies.map((currency) => (
            <option key={currency.code} value={currency.code}>
              {currency.code} - {currency.name}
            </option>
          ))}
        </select>

        <button onClick={swapCurrencies} style={{ padding: "5px 10px" }}>
          Swap
        </button>

        <select
          value={to}
          onChange={(e) => setTo(e.target.value)}
          style={{ padding: "5px" }}
        >
          {currencies.map((currency) => (
            <option key={currency.code} value={currency.code}>
              {currency.code} - {currency.name}
            </option>
          ))}
        </select>
      </div>

      <h2>
        Result:{" "}
        {result !== null ? (
          <span style={{ color: "green" }}>{result.toFixed(2)}</span>
        ) : (
          "Calculating..."
        )}
      </h2>
    </div>
  );
}