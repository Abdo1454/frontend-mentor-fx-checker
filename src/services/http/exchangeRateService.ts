// تأكد من وجود كلمة export في بداية الدالة وتطابق الاسم تماماً بحروف كبيرة وصغيرة
export async function getLatestRates(baseCurrency: string) {
  try {
    // تأكد من أن هذا هو المسار الصحيح لملف أسعار العملات في مجلد الـ mock عندك
    const response = await fetch("/mock/currencies.json"); 
    
    if (!response.ok) {
      throw new Error(`Failed to fetch rates: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error inside exchangeRateService:", error);
    return null;
  }
}