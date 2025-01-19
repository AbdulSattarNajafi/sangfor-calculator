import DonutChart from "./DonutChart";

function TotalSavingCharts() {
  return (
    <div className="flex break-after-page items-center justify-center gap-10">
      <DonutChart
        background="#61993e"
        color="#a1c490"
        label="Savings from Vendor Consolidation"
        value={10}
      >
        <h5 className="-mt-8 text-4xl font-bold text-[#61993e]">30%</h5>
      </DonutChart>
      <DonutChart
        background="#3a64ad"
        color="#90a2d4"
        label="Total Infrastructure cost savings"
        value={20}
      >
        <h5 className="-mt-8 text-center text-4xl font-bold text-[#3a64ad]">
          336K
        </h5>
      </DonutChart>
      <DonutChart
        background="#5f5f5f"
        color="#b3b3b3"
        label="SD-WAN and MPLS Cost Savings"
        value={30}
      >
        <h5 className="-mt-8 text-4xl font-bold text-[#5f5f5f]">~ 200K</h5>
      </DonutChart>
    </div>
  );
}

export default TotalSavingCharts;
