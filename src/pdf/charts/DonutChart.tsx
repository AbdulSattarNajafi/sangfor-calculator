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
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    cutout: "78%",
  };

  return (
    <div className="flex w-[220px] flex-col items-center justify-center">
      <div className="relative h-[160px]">
        <div className="h-[160px] w-[160px]">
          <Doughnut data={data} options={options} />
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {children}
        </div>
      </div>
      <p className="mb-2 h-6 w-full text-center text-sm font-semibold">
        {label}
      </p>
    </div>
  );
}

export default DonutChart;
