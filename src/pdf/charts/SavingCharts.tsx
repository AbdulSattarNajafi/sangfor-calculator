import DonutChart from "./DonutChart";

function SavingCharts() {
  return (
    <div className="flex break-after-page items-center justify-center gap-10">
      <DonutChart
        background="#71ad47"
        color="#4472c4"
        label="NetOps and SecOps Efficiency Gains"
        value={10}
        totalValue={100}
      >
        <h5 className="-mt-8 text-4xl font-bold text-[#71ad47]">75%</h5>
      </DonutChart>
      <DonutChart
        background="#ffd184"
        color="#e2aa01"
        label="Additional FTEs on strategic projects"
        value={20}
        totalValue={100}
      >
        <h5 className="-mt-8 text-4xl font-bold text-[#ffd184]">03</h5>
      </DonutChart>
      <DonutChart
        background="#97b9df"
        color="#4f89bc"
        label="Administrative Overhead Savings"
        value={30}
        totalValue={100}
      >
        <h5 className="-mt-8 text-4xl font-bold text-[#97b9df]">452K</h5>
      </DonutChart>
    </div>
  );
}

export default SavingCharts;
