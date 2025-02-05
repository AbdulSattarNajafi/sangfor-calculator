import { cn, shortenNumber } from "@/utils/helpers";
import DonutChart from "./DonutChart";

type RoiChartsProps = {
  roi: number;
  npv: number;
  breachRisk: number;
  paybackPeriod: number;
  className?: string;
};

function RoiCharts({
  roi,
  npv,
  breachRisk,
  paybackPeriod,
  className,
}: RoiChartsProps) {
  return (
    <div className={cn("flex items-start justify-center", className)}>
      <DonutChart
        background="#58c13d"
        color="#b9e5ae"
        label="3 Year ROI"
        value={roi}
        totalValue={100}
      >
        <h5 className="-mt-8 text-4xl font-bold text-[#58c13d]">{roi}%</h5>
      </DonutChart>
      <DonutChart
        background="#0070c0"
        color="#c7e0f1"
        label="Net Present Value (NPV)"
        value={npv}
        totalValue={10}
      >
        <h5 className="-mt-4 text-center text-2xl font-bold leading-tight text-[#0070c0]">
          <span className="word break-words">
            $ {npv.toFixed(1)} <br /> million
          </span>
        </h5>
      </DonutChart>
      <DonutChart
        background="#00b0f0"
        color="#c5edfc"
        label="Security Breach Risk Reduction"
        value={breachRisk}
        totalValue={100000}
      >
        <h5 className="-mt-8 text-4xl font-semibold text-[#00b0f0]">
          {shortenNumber(breachRisk)}
        </h5>
      </DonutChart>
      <DonutChart
        background="#d26e2a"
        color="#f1a78a"
        label="Payback Period"
        value={paybackPeriod}
        totalValue={36}
      >
        <h5 className="-mt-4 text-center text-2xl font-bold leading-tight text-[#d26e2a]">
          &lt; {paybackPeriod} <br /> months
        </h5>
      </DonutChart>
    </div>
  );
}

export default RoiCharts;
