import DonutChart from './DonutChart';

function RoiCharts() {
  return (
    <div className='flex items-start justify-center'>
      <DonutChart background='#58c13d' color='#b9e5ae' label='3 Year ROI' value={10}>
        <h5 className='font-bold text-4xl text-[#58c13d] -mt-8'>281%</h5>
      </DonutChart>
      <DonutChart background='#0070c0' color='#c7e0f1' label='Net Present Value (NPV)' value={20}>
        <h5 className='font-bold text-2xl text-[#0070c0] text-center leading-tight -mt-4'>
          $ 4.38 <br /> million
        </h5>
      </DonutChart>
      <DonutChart
        background='#00b0f0'
        color='#c5edfc'
        label='Security Breach Risk Reduction'
        value={30}
      >
        <h5 className='font-semibold text-4xl text-[#00b0f0] -mt-8'>715K</h5>
      </DonutChart>
      <DonutChart background='#f1a78a' color='#d26e2a' label='Payback Period' value={40}>
        <h5 className='font-bold text-2xl text-[#f1a78a] text-center leading-tight -mt-4'>
          &lt; 5 <br /> months
        </h5>
      </DonutChart>
    </div>
  );
}

export default RoiCharts;
