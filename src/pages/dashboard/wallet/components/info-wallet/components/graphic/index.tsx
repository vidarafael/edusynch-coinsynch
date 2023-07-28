import Chart from 'react-apexcharts'

const options = {
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    foreColor: 'transparent',
    width: '100%',
    height: '100%',
  },
  grid: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    enabled: false,
  },
  xaxis: {
    // type: 'datetime',
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false,
    },
    // categories: [
     
    // ],
  },
  colors: ['transparent'],
  fill: {
    type: 'gradient',
    colors: ['#FBAB34'],
    gradient: {
      shade: 'transparent',
      opacityFrom: 1,
      opacityTo: 0.5,
    }
  },
} as ApexCharts.ApexOptions;

const series = [
  { name: 'series1', data: [150, 180, 10, 120] }
]

export function Graphic() {
  return (
    <Chart options={options} series={series} type="area"  />
  )
}