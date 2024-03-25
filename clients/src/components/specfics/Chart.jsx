import React from "react";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Tooltip,
  Filler,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  Legend,
  LineElement,
} from "chart.js";
import { orange, purple, purpleLight } from "../../constants/Color";
import { getLast7Days } from "../../lib/feather";

ChartJS.register(
  Tooltip,
  Filler,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  Legend,
  LineElement
);

const labels = getLast7Days();

const LineChartOptions = {
  responsive: true,
  plugins: {
    Legend: {
      display: false,
    },
    title: { display: false },
  },

  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        display: false,
      },
    },
  },
};

const LineChart = ({ value = [] }) => {
  const data = {
    labels,
    datasets: [
      {
        data: value,
        label: "Revenue",
        fill: true,
        backgroundColor: purpleLight,
        borderColor: purple,
      },
    ],
  };

  return <Line data={data} options={LineChartOptions} />;
};

const doughnutOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
    title: {
      display: false,
    },
  },
  cutout: 80,
};

const DoughnutChat = ({ value = [], labels = [] }) => {
  const data = {
    labels,
    datasets: [
      {
        data: value,
        label: "Total Chats vs Group Chats",
        fill: true,
        backgroundColor: [purpleLight, orange],
        borderColor: [purple, orange],
        offset: 20,
      },
    ],
  };
  return (
    <Doughnut style={{ zIndex: 10 }} data={data} options={doughnutOptions} />
  );
};
export { LineChart, DoughnutChat };
