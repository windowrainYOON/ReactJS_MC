import {BrowserRouter, Route, Routes} from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";
import Price from "./routes/Coin";
import Chart from "./routes/Coin";

function Router(){
  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<Coins/>}></Route>
      <Route path="/:coinId" element={<Coin/>}>
        <Route path="price" element={<Price/>}/>
        <Route path="chart" element={<Chart />}/>
      </Route>
    </Routes>
  </BrowserRouter>
}

export default Router