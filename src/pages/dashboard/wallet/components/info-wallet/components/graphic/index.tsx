import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  ChartOptions,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { ICrypto } from 'src/contexts/CoinCrypto';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options = {
  scales: {
    x: {
      display: false,
      ticks: {
        display: false
      }
    },
    y: {
      display: true,
      ticks: {
        display: false
      }
    }
  }
} as ChartOptions<'line'>;


interface GraphicProps {
  crypto: ICrypto
}

export function Graphic({ crypto }: GraphicProps) {
  const differencePercentInValue = crypto?.quote?.USD?.percent_change_24h * crypto?.quote?.USD?.price

  // if percentage is negative, then subtract else sum
  const result = crypto?.quote?.USD?.percent_change_24h < 0 ? crypto?.quote?.USD?.price - differencePercentInValue : crypto?.quote?.USD?.price + differencePercentInValue

  const data = {
    labels: ['', ''],
    datasets: [
      {
        label: "",
        data: [result || 0, crypto?.quote?.USD?.price || 0],
        borderColor: "transparent",
        backgroundColor: "transparent",
        fill: {
          target: "origin", // Set the fill options
          above: "rgba(251, 171, 52, 0.5)"
        }
      },
    ],
  };


  return (
    <Line options={options} data={data} />
  )
}