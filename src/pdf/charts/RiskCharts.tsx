import DonutChart from "./DonutChart";

function RiskCharts() {
  return (
    <div className="flex break-after-page items-center justify-center gap-10">
      <DonutChart
        background="#61993e"
        color="#a1c490"
        label="Reduced Likelihood of Data Breach"
        value={10}
      >
        <h5 className="-mt-8 text-4xl font-bold text-[#61993e]">75%</h5>
      </DonutChart>
      <DonutChart
        background="#ed7d32"
        color="#ffc100"
        label="Cost of Securtiy"
        value={20}
      >
        <h5 className="-mt-4 text-center text-2xl font-bold leading-tight text-[#ed7d32]">
          $ 1.2 <br /> million
        </h5>
      </DonutChart>
      <DonutChart
        background="#5b9bd5"
        color="#a5a5a5"
        label="Risk adjust cost reduction"
        value={30}
      >
        <h5 className="-mt-8 text-4xl font-bold text-[#5b9bd5]">715K</h5>
      </DonutChart>
    </div>
  );
}

export default RiskCharts;
