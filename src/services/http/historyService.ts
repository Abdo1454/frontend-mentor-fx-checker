const KEY = "fx_history";

export function getHistory() {
  const data = localStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
}

export function addToHistory(item: any) {
  const history = getHistory();

  history.unshift(item);

  localStorage.setItem(KEY, JSON.stringify(history));
}