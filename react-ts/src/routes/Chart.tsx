import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

interface ChartProps {
  coinId:string;
}

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

function Chart () {
  const isDark = useRecoilValue(isDarkAtom);
  const {coinId} = useOutletContext<ChartProps>();
  const {isLoading, data} = useQuery<IHistorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId), {refetchInterval:10000});
  return(
    <>
      {isLoading ? "Loading..." : <ApexChart 
        type="line" 
        options={{
          theme: {
            mode: isDark ? "dark" : "light"
          },
          chart:{
            height: 300,
            width: 500,
            toolbar: {
              show: false
            },
            background: "transparency"
          },
          grid: {show:false},
          stroke: {
            curve: "smooth",
            width: 5,
          },
          yaxis:{
            show:false
          },
          xaxis:{
            axisBorder: {
              show:false
            },
            axisTicks: {
              show:false
            },
            labels: {
              show:false
            },
            categories: data?.map((price) => price.time_close),
            type: "datetime"
          },
          fill: {
            type: "gradient",
            gradient: {
              gradientToColors: ["#0be881"],
              stops: [0, 100],
            }
          },
          colors: ["#0fbcf9"],
          tooltip: {
            y:{
              formatter:(value) => `$ ${value.toFixed(3)}` 
            }
          }
        }}
        series={
          [
            {
              name:"price",
              data: data?.map(price => price.close)as number[],
            },
          ]
        }
      />}
    </>
  );
}

export default Chart;