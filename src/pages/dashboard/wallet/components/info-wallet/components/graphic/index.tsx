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
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useCoinCrypto } from 'src/contexts/CoinCrypto';

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


export function Graphic() {
  const { cryptos } = useCoinCrypto()

  const [index, setIndex] = useState(0)

  useEffect(() => {
    // if(!cryptos.length) {
    //   return
    // }

    // setInterval(() => {
    //   if (index === cryptos.length - 1) {
    //     return setIndex(0)
    //   }
  
    //   setIndex((prevState) => prevState++)
    // }, 5000)
    
  }, [cryptos])


  const data = {
    labels: ['', ''],
    datasets: [
      {
        label: "",
        data: [cryptos[index]?.quote?.USD?.price || 0, cryptos[index]?.quote?.USD?.percent_change_24h || 0],
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