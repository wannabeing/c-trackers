import ApexChart from "react-apexcharts";
import loadingGif from "../img/loading.gif";
import styled from "styled-components";
import { useQuery } from "react-query";
import { fetchChart } from "../api";
import { useRecoilValue } from "recoil";
import { themeAtom } from "../atoms";

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30vh;
`;
interface ChartProps {
  id: string;
  won: number;
}
interface IChartData {
  close: string;
  high: string;
  low: string;
  market_cap: number;
  open: string;
  time_close: number;
  time_open: number;
  volume: string;
}

function Chart({ id, won }: ChartProps) {
  const theme = useRecoilValue(themeAtom);
  console.log(theme);

  const { isLoading: chartLoading, data: chartData } = useQuery<IChartData[]>(
    ["chart", id],
    () => fetchChart(id)
  );

  return (
    <div>
      {chartLoading ? (
        <Loader>
          <img src={loadingGif} alt="loading" />
        </Loader>
      ) : (
        <ApexChart
          type="line"
          series={[
            {
              name: "가격",
              data: chartData?.map(
                (price) => price.close
              ) as unknown as number[],
            },
          ]}
          options={{
            chart: {
              width: 500,
              height: 500,
              toolbar: { show: false },
            },
            tooltip: { x: { show: false }, marker: { show: false } },
            yaxis: {
              show: false,
              labels: {
                formatter: function (val) {
                  const price = (val * won)
                    .toFixed(0)
                    .toString()
                    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
                  return price + "원";
                },
              },
            },
            xaxis: {
              axisTicks: { show: false },
              axisBorder: { show: false },
              labels: {
                show: false,
              },
            },
            theme: {
              mode: theme ? "light" : "dark",
              palette: "palette10",
            },
            colors: ["#7D02EB", "#5653FE", "#00B1F2", "#A300D6", "#7D02EB"],
            fill: {
              type: "gradient",
              gradient: { gradientToColors: ["#2983FF"], stops: [0, 100] },
            },
          }}
        />
      )}
    </div>
  );
}
export default Chart;
