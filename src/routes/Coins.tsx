import styled from "styled-components";
import { Link } from "react-router-dom";
import loadingGif from "../img/loading.gif";
import { useQuery } from "react-query";
import { fetchCoins } from "../api";
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
  margin: 40px 0;
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
const CoinList = styled.ul``;
const Coin = styled.li`
  background-color: white;
  color: ${(props) => props.theme.textColor};
  margin-bottom: 10px;
  padding: 20px;
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.0784313725);
  border-radius: 12px;
  font-weight: 600;
  &:hover {
    color: ${(props) => props.theme.accentColor};
    cursor: pointer;
    font-weight: 800;
  }
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.2s ease-in;
  }
`;
const Img = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 10px;
`;

interface Icoins {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}
function Coins() {
  const { isLoading, data } = useQuery<Icoins[]>("coins", fetchCoins);

  return (
    <Container>
      <Helmet>
        <title>C-Trackers</title>
      </Helmet>
      <Header>
        <Title>C-Trackers</Title>
      </Header>
      {isLoading ? (
        <Loader>
          <img src={loadingGif} alt="loading" />
        </Loader>
      ) : (
        <CoinList>
          {data?.slice(0, 20).map((coin) => (
            <Coin key={coin.id}>
              <Link
                to={{
                  pathname: coin.id,
                  state: { name: coin.name },
                }}
              >
                <Img
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                  alt="symbol"
                />
                {coin.name}
              </Link>
            </Coin>
          ))}
        </CoinList>
      )}
    </Container>
  );
}
export default Coins;
