"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

type FinancialChartProps = {
  benefits: number[];
  costs: number[];
  titleFontSize: number;
  height?: number;
};

const FinancialChart = ({
  benefits,
  costs,
  titleFontSize,
  height,
}: FinancialChartProps) => {
  // Define data for the chart
  const data = {
    labels: ["1", "2", "3"], // X-axis labels (e.g., quarters)
    datasets: [
      {
        label: "Total Benefits",
        data: benefits, // Example benefit data
        backgroundColor: "rgba(75, 192, 192, 0.6)", // Light green color
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Total Costs",
        data: costs, // Example cost data
        backgroundColor: "rgba(255, 99, 132, 0.6)", // Light red color
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Define chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const, // Position of the legend
      },
      title: {
        display: true,
        text: "Financial Analysis (Risk Adjusted)",
        padding: 20,
        font: {
          size: titleFontSize,
          weight: 500,
        },
      },
      tooltip: {
        callbacks: {
          title: (index: { label: string }[]) => {
            console.log(index, " chart index");
            return "Year " + index[0].label;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: false,
          text: "Quarters", // X-axis label
        },
      },
      y: {
        title: {
          display: false,
          text: "Amount ($)", // Y-axis label
        },
        fontSixe: 26,
        beginAtZero: true, // Start Y-axis at 0
        ticks: {
          callback: function (value: string | number) {
            return `$${value.toLocaleString()}`; // Add dollar sign and format numbers
          },
        },
      },
    },
  };

  return (
    <div className="mx-auto w-full max-w-6xl">
      <Bar data={data} options={options} height={height ? height : ""} />
    </div>
  );
};

export default FinancialChart;
