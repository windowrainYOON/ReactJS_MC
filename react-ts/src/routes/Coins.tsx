import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet";
import { useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";

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
const CoinsList = styled.ul`
  padding: 0 20px;
`;
const Coin = styled.li`
  background-color: ${props => props.theme.cardBgColor};
  color: ${props => props.theme.textColor};
  margin-bottom: 10px;
  border-radius: 15px;
  border: 1px solid white;
  a{
    display: flex;
    align-items: center;
    padding: 20px;
    transition: color 0.2s ease-in;
  }
  &:hover {
    a{
      color:${props => props.theme.accentColor}
    }
  }
`;

const Title = styled.h1`
font-size: 48px;
  color: ${props => props.theme.accentColor}
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

const Loader = styled.span`
  text-align: center;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

function Coins(){
  const {isLoading, data} = useQuery<ICoin[]>("allCoins", fetchCoins);
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => {setDarkAtom((prev) => !prev)};
  return (
    <Container>
      <Helmet>
        <title>코인</title>
      </Helmet>
      <Header>
        <Title>코인</Title>
        <button onClick={toggleDarkAtom}>Toggle Mode</button>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : <CoinsList>
        {data?.slice(0, 100).map(coin => 
          <Coin key={coin.id}>
            <Link to={`/${coin.id}`} state={{name:coin.name, rank:coin.rank}}>
              <Img src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}/>
              {coin.name} &rarr;
            </Link>
          </Coin>
        )}
      </CoinsList>}
    </Container>
  );
}

export default Coins;