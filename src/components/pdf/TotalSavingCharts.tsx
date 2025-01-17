import DonutChart from './DonutChart';

function TotalSavingCharts() {
  return (
    <div className='flex items-center justify-center gap-10 break-after-page'>
      <DonutChart
        background='#61993e'
        color='#a1c490'
        label='Savings from Vendor Consolidation'
        value={10}
      >
        <h5 className='font-bold text-4xl text-[#61993e] -mt-8'>30%</h5>
      </DonutChart>
      <DonutChart
        background='#3a64ad'
        color='#90a2d4'
        label='Total Infrastructure cost savings'
        value={20}
      >
        <h5 className='font-bold text-4xl text-[#3a64ad] text-center -mt-8'>336K</h5>
      </DonutChart>
      <DonutChart
        background='#5f5f5f'
        color='#b3b3b3'
        label='SD-WAN and MPLS Cost Savings'
        value={30}
      >
        <h5 className='font-bold text-4xl text-[#5f5f5f] -mt-8'>~ 200K</h5>
      </DonutChart>
    </div>
  );
}

export default TotalSavingCharts;
