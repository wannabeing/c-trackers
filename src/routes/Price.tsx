import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchTickers } from "../api";

interface IProps {
  id: string;
  won: number;
}
interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.0784313725);
  margin-top: 20px;
  border-radius: 12px;
  padding: 20px;
  color: ${(props) => props.theme.accentColor};
  font-size: 18px;
  font-weight: 600;
`;
const PriceDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 10px 0;
  #accent {
    color: #8c7ae6;
  }
`;

function Price({ id, won }: IProps) {
  const { isLoading, data } = useQuery<PriceData>(
    ["price", id],
    () => fetchTickers(id),
    {
      refetchInterval: 900000,
    }
  );
  return (
    <PriceContainer>
      <PriceDetails>
        <span>15분 전</span>
        <span id="accent">{data?.quotes.USD.percent_change_15m}%</span>
      </PriceDetails>
      <hr />
      <PriceDetails>
        <span>1시간 전</span>
        <span id="accent">{data?.quotes.USD.percent_change_1h}%</span>
      </PriceDetails>
      <hr />
      <PriceDetails>
        <span>24시간 전</span>
        <span id="accent">{data?.quotes.USD.percent_change_24h}%</span>
      </PriceDetails>
      <hr />
      <PriceDetails>
        <span>30일 전</span>
        <span id="accent">{data?.quotes.USD.percent_change_30d}%</span>
      </PriceDetails>
      <hr />
      <PriceDetails>
        <span>1년 전</span>
        <span id="accent">{data?.quotes.USD.percent_change_1y}%</span>
      </PriceDetails>
      <hr />
      <PriceDetails>
        <span>ATH</span>
        <span id="accent">
          {Math.imul(
            data?.quotes.USD.ath_price.toFixed(0) as unknown as number,
            won.toFixed(0) as unknown as number
          )
            .toString()
            .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
          원
        </span>
      </PriceDetails>
    </PriceContainer>
  );
}
export default Price;
