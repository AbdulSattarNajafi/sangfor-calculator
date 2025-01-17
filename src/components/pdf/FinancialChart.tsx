'use client';

import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register required components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const FinancialChart = () => {
  // Define data for the chart
  const data = {
    labels: ['1', '2', '3'], // X-axis labels (e.g., quarters)
    datasets: [
      {
        label: 'Total Benefits',
        data: [5000, 7000, 8000], // Example benefit data
        backgroundColor: 'rgba(75, 192, 192, 0.6)', // Light green color
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Total Costs',
        data: [3000, 4000, 3500], // Example cost data
        backgroundColor: 'rgba(255, 99, 132, 0.6)', // Light red color
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Define chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const, // Position of the legend
      },
      title: {
        display: true,
        text: 'Financial Analysis (Risk Adjusted)', // Chart title
        font: {
          size: 24,
          color: 'red',
        },
      },
    },
    scales: {
      x: {
        title: {
          display: false,
          text: 'Quarters', // X-axis label
        },
      },
      y: {
        title: {
          display: false,
          text: 'Amount ($)', // Y-axis label
        },
        beginAtZero: true, // Start Y-axis at 0
      },
    },
  };

  return (
    <div className='w-full max-w-5xl mx-auto'>
      <Bar data={data} options={options} />
    </div>
  );
};

export default FinancialChart;
