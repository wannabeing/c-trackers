const BASE_URL = "https://api.coinpaprika.com/v1";

// Coins.tsx
export async function fetchCoins() {
  const response = await (await fetch(`${BASE_URL}/coins`)).json();
  return response;
}

// Coin.tsx
export async function fetchInfo(id: string) {
  const response = await (await fetch(`${BASE_URL}/coins/${id}`)).json();
  return response;
}
export async function fetchTickers(id: string) {
  const response = await (await fetch(`${BASE_URL}/tickers/${id}`)).json();
  return response;
}
// Chart.tsx
export async function fetchChart(id: string) {
  const response = await (
    await fetch(`https://ohlcv-api.nomadcoders.workers.dev/?coinId=${id}`)
  ).json();
  return response;
}

export async function fetchKrw() {
  const response = await (
    await fetch(
      "https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRWUSD"
    )
  ).json();
  return response[0].basePrice;
}
