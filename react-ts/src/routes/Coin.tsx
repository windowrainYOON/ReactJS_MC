import { useQuery } from "react-query";
import { Link, useMatch } from "react-router-dom";
import { useLocation, useParams, Outlet } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
import { Helmet } from "react-helmet";

const Title = styled.h1`
  font-size: 48px;
  font-weight: bold;
  color: ${props => props.theme.accentColor}
`;

const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.div`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loader = styled.span`
  text-align: center;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0,0,0,0.5);
  padding: 20px 20px;
  border-radius: 10px;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

const Description = styled.p`
  margin: 20px 9px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-top: 20px;
  gap: 10px;
`;

const Tab = styled.div<{ isActive : boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0,0,0,0.5);
  padding: 15px;
  border-radius: 10px;
  width: 100%;
  color: ${props => props.isActive ? props.theme.accentColor : props.theme.textColor};
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    font-weight: 400;
    text-transform: uppercase;
  }
`;

interface RouteState {
  state: {
    name:string;
    rank:number;
  }
}

interface IInfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
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

interface IPriceData {
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
    }
  }
}

function Coin(){
  const {coinId} = useParams();
  const {state} = useLocation() as RouteState;
  const priceMatch = useMatch(`/:coinId/price`);
  const chartMatch = useMatch(`/:coinId/chart`);
  const {isLoading:infoLoading, data:infoData} = useQuery<IInfoData>(["info", coinId], () => fetchCoinInfo(coinId));
  const {isLoading:tickersLoading, data:tickersData} = useQuery<IPriceData>(["tickers", coinId], () => fetchCoinTickers(coinId), {refetchInterval:5000,});
  const loading = infoLoading || tickersLoading
  return (
    <Container>
      <Helmet>
        <title>{state?.name ? state.name : loading ? "Loading" : infoData?.name}</title>
      </Helmet>
      <Link to={`/`}>
        <Header>
          <Title>{state?.name ? state.name : loading ? "Loading" : infoData?.name}</Title>
        </Header>
      </Link>

      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol</span>
              <span>${infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price</span>
              <span>{tickersData?.quotes?.USD?.price?.toFixed(3)}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply</span>
              <span>{tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply</span>
              <span>{tickersData?.max_supply}</span>
            </OverviewItem>
          </Overview>
          <Tabs>
            <Link to={`/${coinId}/chart`}>
              <Tab isActive={chartMatch !== null}>
                <span>Chart</span>
              </Tab>
            </Link>
            <Link to={`/${coinId}/price`}>
              <Tab isActive={priceMatch !== null}>
                <span>Price</span>
              </Tab>
            </Link>
          </Tabs>
          <Outlet context={{coinId}}/>
        </>
      )}
    </Container>
  );
}

export default Coin;