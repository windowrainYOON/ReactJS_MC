import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";

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
  background-color: #fff;
  color: ${props => props.theme.bgColor};
  margin-bottom: 10px;
  border-radius: 15px;
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

  return (
    <Container>
      <Header>
        <Title>코인</Title>
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