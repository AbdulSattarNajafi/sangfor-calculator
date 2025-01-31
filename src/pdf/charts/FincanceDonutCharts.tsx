import DonutChart from "./DonutChart";

function FincanceDonutCharts() {
  return (
    <div className="flex break-after-page items-center justify-center gap-10">
      <DonutChart
        background="#58c13d"
        color="#b9e5ae"
        label="Number of FTEs Savings"
        value={10}
        totalValue={100}
      >
        <h5 className="-mt-8 text-4xl font-bold text-[#58c13d]">40</h5>
      </DonutChart>
      <DonutChart
        background="#0070c0"
        color="#c7e0f1"
        label="Additional Business Value"
        value={20}
        totalValue={100}
      >
        <h5 className="-mt-4 text-center text-2xl font-bold leading-tight text-[#0070c0]">
          $ 3.32 <br /> million
        </h5>
      </DonutChart>
      <DonutChart
        background="#00b0f0"
        color="#c5edfc"
        label="Lost Productivity Recovered"
        value={30}
        totalValue={100}
      >
        <h5 className="-mt-8 text-4xl font-bold text-[#00b0f0]">8%</h5>
      </DonutChart>
    </div>
  );
}

export default FincanceDonutCharts;
