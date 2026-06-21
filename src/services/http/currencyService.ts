export interface Currency {
  code: string;
  name: string;
  flag?: string;
}

export async function getCurrencies(): Promise<Currency[]> {
  const res = await fetch("/mock/currencies.json");

  if (!res.ok) {
    throw new Error("Failed to load currencies");
  }

  return res.json();
}