import DonutChart from './DonutChart';

function RiskCharts() {
  return (
    <div className='flex items-center justify-center gap-10 break-after-page'>
      <DonutChart
        background='#61993e'
        color='#a1c490'
        label='Reduced Likelihood of Data Breach'
        value={10}
      >
        <h5 className='font-bold text-4xl text-[#61993e] -mt-8'>75%</h5>
      </DonutChart>
      <DonutChart background='#ed7d32' color='#ffc100' label='Cost of Securtiy' value={20}>
        <h5 className='font-bold text-2xl text-[#ed7d32] text-center leading-tight -mt-4'>
          $ 1.2 <br /> million
        </h5>
      </DonutChart>
      <DonutChart
        background='#5b9bd5'
        color='#a5a5a5'
        label='Risk adjust cost reduction'
        value={30}
      >
        <h5 className='font-bold text-4xl text-[#5b9bd5] -mt-8'>715K</h5>
      </DonutChart>
    </div>
  );
}

export default RiskCharts;
