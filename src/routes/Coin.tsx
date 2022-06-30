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
import Price from "./Price";
import Chart from "./Chart";
import { useQuery } from "react-query";
import { fetchInfo, fetchKrw, fetchTickers } from "../api";
import { Helmet } from "react-helmet";

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
  color: ${(props) => props.theme.bgColor};
  font-size: 64px;
  font-weight: 800;
  text-transform: uppercase;
  margin: 0;
  line-height: 47px;
  letter-spacing: 2px;
  transform: skew(-10deg);
  text-shadow: #533d4a 1px 1px, #533d4a 2px 2px, #533d4a 3px 3px,
    #533d4a 4px 4px, #533d4a 5px 5px, #533d4a 6px 6px;
  min-width: 10px;
  min-height: 10px;
`;
const DesContainer = styled.div`
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.0784313725);
  margin-top: 20px;
  border-radius: 12px;
  border: 1px solid ${(props) => props.theme.textColor};
  width: 100%;
  padding: 20px;
`;
const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  #description {
    margin-top: 15px;
    color: ${(props) => props.theme.textColor};
    font-size: 16px;
  }
`;
const InfoDetails = styled.div`
  color: ${(props) => props.theme.textColor};
  span {
    font-size: 16px;
    font-weight: 600;
  }
  #Accent {
    color: #c23616;
    font-weight: 800;
  }
`;
const Img = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 10px;
`;
const Tabs = styled.div`
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.0784313725);
  border-radius: 6px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0;
  background-color: ${(props) => props.theme.textColor};
`;
const Tab = styled.span<{ isActive: Boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-weight: 800;
  font-size: 14px;
  padding: 20px 0px;
  border-radius: 6px;
  cursor: pointer;
  background-color: ${(props) => props.theme.textColor};
  color: ${(props) => (props.isActive ? "#e1b12c" : props.theme.bgColor)};

  a {
    display: block;
  }
  &:hover {
    color: #e1b12c;
  }
`;
const Home = styled.div`
  display: flex;
  justify-content: center;
  font-size: 28px;
  font-weight: 800;
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
function Coin() {
  const { id } = useParams<RouteParams>();
  const { state } = useLocation<RouteState>();
  const priceMatch = useRouteMatch("/:id/price");
  const chartMatch = useRouteMatch("/:id/chart");

  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ["info", id],
    () => fetchInfo(id),
    {
      refetchInterval: 900000,
    }
  );
  const { isLoading: tickerLoading, data: tickerData } = useQuery<PriceData>(
    ["tickers", id],
    () => fetchTickers(id)
  );

  // 달러->원화 가격 API 및 코인가격 원화로 계산
  const { isLoading: krwLoading, data: krwData } = useQuery<number>(
    ["krw", id],
    () => fetchKrw()
  );

  const loading = infoLoading || tickerLoading;

  return (
    <Container>
      <Helmet>
        <title>
          {state?.name ? state.name : loading ? "Loading" : infoData?.name}
        </title>
      </Helmet>
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
          <Home>
            <Link to="/">&larr;</Link>
          </Home>
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
                  {Math.imul(
                    krwData?.toFixed(0) as unknown as number,
                    tickerData?.quotes.USD.price.toFixed(3) as unknown as number
                  )
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
              <Link to={`/${id}/price`}>변동률</Link>
            </Tab>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${id}/chart`}>차트</Link>
            </Tab>
          </Tabs>
          <Switch>
            <Route path={`/${id}/price`}>
              <Price id={id} won={krwData ? krwData : 1000} />
            </Route>
            <Route path={`/${id}/chart`}>
              <Chart id={id} won={krwData ? krwData : 1000} />
            </Route>
          </Switch>
        </>
      )}
    </Container>
  );
}
export default Coin;
