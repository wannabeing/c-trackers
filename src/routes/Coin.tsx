import {
  Switch,
  Route,
  useLocation,
  useRouteMatch,
  useParams,
  Link,
} from "react-router-dom";
import styled from "styled-components";
import loadingGif from "../img/loading.gif";
import { useEffect, useState } from "react";
import Price from "./Price";
import Chart from "./Chart";
import { useQuery } from "react-query";
import { fetchInfo, fetchTickers } from "../api";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 10px auto;
`;
const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30vh;
`;
const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 48px;
  font-weight: 800;
`;
const DesContainer = styled.div`
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.0784313725);
  margin-top: 20px;
  border-radius: 12px;
  width: 100%;
  padding: 20px;
`;
const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  #description {
    margin-top: 15px;
    color: ${(props) => props.theme.accentColor};
    font-size: 16px;
  }
`;
const InfoDetails = styled.div`
  color: ${(props) => props.theme.accentColor};
  span {
    font-size: 16px;
    font-weight: 600;
  }
  #Accent {
    color: ${(props) => props.theme.textColor};
    font-weight: 800;
  }
`;
const Img = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 10px;
`;
const Tabs = styled.div`
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.0784313725);
  border-radius: 6px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0;
  background-color: #353b48;
`;
const Tab = styled.span<{ isActive: Boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-weight: 800;
  font-size: 14px;
  padding: 20px 0px;
  border-radius: 6px;
  cursor: pointer;
  color: ${(props) => (props.isActive ? "#e1b12c" : props.theme.bgColor)};

  a {
    display: block;
  }
  &:hover {
    color: #e1b12c;
  }
`;

interface RouteState {
  name: string;
}
interface RouteParams {
  id: string;
}
interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  contract: string;
  platform: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
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
interface KrwData {
  code: string;
  currencyCode: string;
  currencyName: string;
  country: string;
  name: string;
  date: string;
  time: string;
  recurrenceCount: number;
  basePrice: number;
  openingPrice: number;
  highPrice: number;
  lowPrice: number;
  change: string;
  changePrice: number;
  cashBuyingPrice: number;
  cashSellingPrice: number;
  ttBuyingPrice: number;
  ttSellingPrice: number;
  tcBuyingPrice: null;
  fcSellingPrice: null;
  exchangeCommission: number;
  usDollarRate: number;
  high52wPrice: number;
  high52wDate: string;
  low52wPrice: number;
  low52wDate: string;
  currencyUnit: number;
  provider: string;
  timestamp: number;
  id: number;
  createdAt: string;
  modifiedAt: string;
  signedChangePrice: number;
  signedChangeRate: number;
  changeRate: number;
}
function Coin() {
  const [krw, setKrw] = useState(Number);
  const { id } = useParams<RouteParams>();
  const { state } = useLocation<RouteState>();
  const priceMatch = useRouteMatch("/:id/price");
  const chartMatch = useRouteMatch("/:id/chart");

  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ["info", id],
    () => fetchInfo(id)
  );
  const { isLoading: tickerLoading, data: tickerData } = useQuery<PriceData>(
    ["tickers", id],
    () => fetchTickers(id)
  );

  // 달러->원화 가격 API 및 코인가격 원화로 계산
  (async () => {
    const response = await (
      await fetch(
        "https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRWUSD"
      )
    ).json();
    const krwPrice = await response[0].basePrice;
    if (tickerData) {
      const basePrice = tickerData?.quotes.USD.price;
      setKrw(krwPrice * basePrice);
    }
  })();

  const loading = infoLoading || tickerLoading;

  return (
    <Container>
      <Header>
        <Title>
          <Img
            src={`https://coinicons-api.vercel.app/api/icon/${infoData?.symbol.toLowerCase()}`}
            alt="symbol"
          />
          {state?.name ? state.name : loading ? "Loading" : infoData?.name}
        </Title>
      </Header>
      {loading ? (
        <Loader>
          <img src={loadingGif} alt="loading" />
        </Loader>
      ) : (
        <>
          <DesContainer>
            <InfoContainer>
              <InfoDetails>
                <span>RANK</span>
                <span>{infoData?.rank}</span>
              </InfoDetails>
              <InfoDetails>
                <span id="Accent">
                  {tickerData?.quotes.USD.percent_change_12h}
                </span>
              </InfoDetails>
              <InfoDetails>
                <span>
                  {krw
                    .toFixed(0)
                    .toString()
                    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
                  원
                </span>
              </InfoDetails>
            </InfoContainer>
            <InfoContainer>
              <span id="description">{infoData?.description}</span>
            </InfoContainer>
          </DesContainer>
          <Tabs>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${id}/price`}>가격</Link>
            </Tab>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${id}/chart`}>차트</Link>
            </Tab>
          </Tabs>
          <Switch>
            <Route path={`/${id}/price`}>
              <Price />
            </Route>
            <Route path={`/${id}/chart`}>
              <Chart />
            </Route>
          </Switch>
        </>
      )}
    </Container>
  );
}
export default Coin;
