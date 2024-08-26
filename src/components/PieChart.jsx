import React from "react";
import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const totalValuePlugin = {
  id: 'totalValuePlugin',
  beforeDraw: function(chart) {
    const { ctx, data, chartArea: { width, height } } = chart;
    ctx.save();
    
    const total = data.datasets[0].data.reduce((acc, value) => acc + value, 0);

    
    ctx.font = 'bold 20px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    
    ctx.fillText(total, width / 2, height / 2 - 10);  
    ctx.font = 'normal 14px Arial';
    ctx.fillText('Total', width / 2, height / 2 + 10); 

    ctx.restore();
  }
};
ChartJS.register(totalValuePlugin);


const PieChart = ({ data }) => {
  const pieData = {
    labels: Object.keys(data).map((key) => `${key}: ${data[key]}`),
    datasets: [
      {
        data: Object.values(data),
        backgroundColor: ["#4BC0C0", "#9966FF", "#FF9F40", "#808080"],
        hoverBackgroundColor: ["#4BC0C0", "#9966FF", "#FF9F40", "#808080"],
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
        labels: {
          generateLabels: (chart) => {
            const data = chart.data;
            return data.labels.map((label, i) => ({
              text: label,
              fillStyle: data.datasets[0].backgroundColor[i],
              hidden: false,
              lineCap: "butt",
              lineDash: [],
              lineDashOffset: 0,
              lineJoin: "miter",
              strokeStyle: "rgb(255, 255, 255)",
              pointStyle: "circle",
              rotation: 0,
            }));
          },
        },
      },
      datalabels: {
        display: false,
        color: "#000",
        font: {
          size: 10,
          weight: "bold",
        },
        formatter: (value, context) => {
          const label = context.chart.data.labels[context.dataIndex];
          return label;
        },
        anchor: "end",
        align: "start",
        offset: 10,
        padding: 5,
      },
    },
  };

  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', height:'100%' }}>
      <div style={{ flex: 1, width:'100%', height:'100%', }}>
        <Doughnut data={pieData} options={pieOptions} />
      </div>
    </div>
  );
};

export default PieChart;

