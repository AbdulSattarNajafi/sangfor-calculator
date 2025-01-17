import DonutChart from './DonutChart';

function SavingCharts() {
  return (
    <div className='flex items-center justify-center gap-10 break-after-page'>
      <DonutChart
        background='#71ad47'
        color='#4472c4'
        label='NetOps and SecOps Efficiency Gains'
        value={10}
      >
        <h5 className='font-bold text-4xl text-[#71ad47] -mt-8'>75%</h5>
      </DonutChart>
      <DonutChart
        background='#ffd184'
        color='#e2aa01'
        label='Additional FTEs on strategic projects'
        value={20}
      >
        <h5 className='font-bold text-4xl text-[#ffd184] -mt-8'>03</h5>
      </DonutChart>
      <DonutChart
        background='#97b9df'
        color='#4f89bc'
        label='Administrative Overhead Savings'
        value={30}
      >
        <h5 className='font-bold text-4xl text-[#97b9df] -mt-8'>452K</h5>
      </DonutChart>
    </div>
  );
}

export default SavingCharts;
