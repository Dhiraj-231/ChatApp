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
import {
  orange,
  orangeLight,
  purple,
  purpleLight,
} from "../../constants/Color";
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

/**
 * LineChart component for displaying revenue data
 *
 * @param {array} value - array of numbers representing revenue data
 *
 * @returns {JSX.Element} Line chart component
 */
const LineChart = ({ value = [] }) => {
  /**
   * Data object for Chart.js line chart
   * @type {object}
   */
  const data = {
    labels, // array of day of week strings
    datasets: [
      {
        data, // array of numbers representing revenue data
        label: "Revenue", // x-axis label
        fill: true, // fill the area under the line
        backgroundColor: purpleLight, // area fill color
        borderColor: purple, // line color
      },
    ],
  };

  /**
   * Returns a line chart component
   * @returns {JSX.Element} Chart.js line chart
   */
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
        backgroundColor: [purpleLight, orangeLight],
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
