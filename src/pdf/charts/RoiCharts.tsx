import DonutChart from "./DonutChart";

function RoiCharts() {
  return (
    <div className="flex items-start justify-center">
      <DonutChart
        background="#58c13d"
        color="#b9e5ae"
        label="3 Year ROI"
        value={10}
      >
        <h5 className="-mt-8 text-4xl font-bold text-[#58c13d]">281%</h5>
      </DonutChart>
      <DonutChart
        background="#0070c0"
        color="#c7e0f1"
        label="Net Present Value (NPV)"
        value={20}
      >
        <h5 className="-mt-4 text-center text-2xl font-bold leading-tight text-[#0070c0]">
          $ 4.38 <br /> million
        </h5>
      </DonutChart>
      <DonutChart
        background="#00b0f0"
        color="#c5edfc"
        label="Security Breach Risk Reduction"
        value={30}
      >
        <h5 className="-mt-8 text-4xl font-semibold text-[#00b0f0]">715K</h5>
      </DonutChart>
      <DonutChart
        background="#f1a78a"
        color="#d26e2a"
        label="Payback Period"
        value={40}
      >
        <h5 className="-mt-4 text-center text-2xl font-bold leading-tight text-[#f1a78a]">
          &lt; 5 <br /> months
        </h5>
      </DonutChart>
    </div>
  );
}

export default RoiCharts;
