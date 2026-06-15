// src/services/fxServices.ts

export interface Currency {
  code: string;
  name: string;
  flag?: string;
}

export interface CurrenciesResponse {
  currencies: Currency[];
}

export const getCurrencies = async (): Promise<Currency[]> => {
  try {
    const response = await fetch("/mock/currencies.json");

    if (!response.ok) {
      throw new Error(
        `Failed to fetch currencies: ${response.status}`
      );
    }

    const data: CurrenciesResponse = await response.json();

    return data.currencies;
  } catch (error) {
    console.error("Error fetching currencies:", error);
    throw error;
  }
};