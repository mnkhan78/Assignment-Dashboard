import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale);

const LineChart = ({ data }) => {
  const lineData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: "Data",
        data: Object.values(data),
        borderColor: "#36A2EB",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: true,
      },
    ],
  };

  const barOptions = {
    indexAxis: "y",
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: true, // Hide the legend if not needed
      },
    },
  };

  return <Bar data={lineData} options={barOptions} />;
};

export default LineChart;
