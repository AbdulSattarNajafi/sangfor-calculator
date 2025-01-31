import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

type DonutChartProps = {
  background: string;
  color: string;
  label: string;
  children: React.ReactNode;
  totalValue: number;
  value: number;
};

function DonutChart({
  background,
  color,
  label,
  children,
  value,
  totalValue,
}: DonutChartProps) {
  const data = {
    labels: ["Red", "Blue"],
    datasets: [
      {
        label: "Dataset",
        data: [value, totalValue],
        backgroundColor: [background, color],
        borderColor: ["#ffffff", "#ffffff"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    // responsive: true,
    plugins: {
      legend: {
        display: false, // Hide default legend
      },
      tooltip: {
        enabled: true, // Show tooltips
      },
    },
    cutout: "78%", // Size of the center hole
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <div className="relative h-[160px] w-[224px] px-8">
          <Doughnut data={data} options={options} width={140} height={140} />

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {children}
          </div>
        </div>
        <p className="w-full max-w-[224px] text-center text-sm font-semibold">
          {label}
        </p>
      </div>
    </div>
  );
}

export default DonutChart;
