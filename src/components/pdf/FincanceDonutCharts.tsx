import DonutChart from './DonutChart';

function FincanceDonutCharts() {
  return (
    <div className='flex items-center justify-center gap-10 break-after-page'>
      <DonutChart background='#58c13d' color='#b9e5ae' label='Number of FTEs Savings' value={10}>
        <h5 className='font-bold text-4xl text-[#58c13d] -mt-8'>40</h5>
      </DonutChart>
      <DonutChart background='#0070c0' color='#c7e0f1' label='Additional Business Value' value={20}>
        <h5 className='font-bold text-2xl text-[#0070c0] text-center leading-tight -mt-4'>
          $ 3.32 <br /> million
        </h5>
      </DonutChart>
      <DonutChart
        background='#00b0f0'
        color='#c5edfc'
        label='Lost Productivity Recovered'
        value={30}
      >
        <h5 className='font-bold text-4xl text-[#00b0f0] -mt-8'>8%</h5>
      </DonutChart>
    </div>
  );
}

export default FincanceDonutCharts;
