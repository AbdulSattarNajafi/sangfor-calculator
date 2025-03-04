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
import { FinancialData } from "@/utils/types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

type FinancialChartProps = {
  benefits: FinancialData;
  costs: FinancialData;
  titleFontSize: number;
  height?: number;
};

const FinancialChart = ({
  benefits,
  costs,
  titleFontSize,
  height,
}: FinancialChartProps) => {
  const benefit = [
    benefits.year1 - costs.year1,
    benefits.year2 - costs.year2,
    benefits.year3 - costs.year3,
  ];

  const cost = [costs.year1, costs.year2, costs.year3];

  const data = {
    labels: ["1", "2", "3"],
    datasets: [
      {
        label: "Total Benefits",
        data: benefit,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Total Costs",
        data: cost, // Example cost data
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
        // barThickness: 40,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          font: {
            size: 26, // Increase legend font size
          },
          boxWidth: 100,
        },
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
            return "Year " + index[0].label;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: false,
          text: "Quarters",
        },
        ticks: {
          font: {
            size: 24, // Increase X-axis labels font size
          },
        },
      },
      y: {
        title: {
          display: false,
          text: "Amount ($)",
        },
        fontSixe: 26,
        beginAtZero: true,
        ticks: {
          callback: function (value: string | number) {
            return `$${value.toLocaleString()}`;
          },
          font: {
            size: 24, // Increase X-axis labels font size
          },
        },
      },
    },
  };

  return <Bar data={data} options={options} height={height ? height : ""} />;
};

export default FinancialChart;
