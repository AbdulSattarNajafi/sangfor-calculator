import { regionData } from '@/utils/constants';
import ContactFormThree from './ContactFormThree';

function DesignThree() {
  return (
    <section className='py-20 bg-section-bg bg-cover bg-center'>
      <div className='wrapper '>
        <div className='text-center text-white mb-10 max-w-3xl w-full mx-auto'>
          <h2 className='text-4xl font-bold mb-2'>Sangfor ROI Calculator</h2>
        </div>

        <div className='mb-4  bg-white px-5 py-6 rounded-md shadow-md'>
          <div className=' mb-4'>
            <h2 className='text-2xl font-bold mb-2'>Lorem ipsum dolor sit amet?</h2>
            <p className=''>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit alias fuga magnam optio
              similique deserunt aspernatur vitae adipisci natus, fugiat soluta corporis eveniet
              neque ipsam inventore non voluptatibus amet earum!
            </p>
          </div>

          <div className='border-t border-gray-300 grid grid-cols-3 gap-x-3 gap-y-4 pt-4'>
            <div className='flex flex-col gap-1'>
              <label htmlFor='region'>Region</label>
              <select
                id='region'
                name='region'
                className='w-full rounded bg-color-gray px-3 py-2 focus:outline-color-pink/70'
              >
                {regionData.map((region) => (
                  <option key={region.name} value={region.securityEmployeeSalary}>
                    {region.name}
                  </option>
                ))}
              </select>
            </div>

            <div className='flex flex-col gap-1'>
              <label htmlFor='employee'>Total Number of Employees</label>
              <input
                id='employee'
                type='text'
                name='name'
                placeholder='placeholder'
                className='w-full rounded bg-color-gray px-3 py-1.5 focus:outline-color-pink/70'
              />
            </div>
            <div className='flex flex-col gap-1'>
              <label htmlFor='hybrid-employee'>Percentage of Remote/Hybrid Employees</label>
              <input
                id='hybrid-employee'
                type='text'
                name='name'
                placeholder='placeholder'
                className='w-full rounded bg-color-gray px-3 py-1.5 focus:outline-color-pink/70'
              />
            </div>

            <div className='flex flex-col gap-1'>
              <label htmlFor='locations'>Number of locations/sites</label>
              <input
                id='locations'
                type='text'
                name='name'
                placeholder='placeholder'
                className='w-full rounded bg-color-gray px-3 py-1.5 focus:outline-color-pink/70'
              />
            </div>
            <div className='flex flex-col gap-1'>
              <label htmlFor='countries'>Number of countries</label>
              <input
                id='countries'
                type='text'
                name='name'
                placeholder='placeholder'
                className='w-full rounded bg-color-gray px-3 py-1.5 focus:outline-color-pink/70'
              />
            </div>
            <div className='flex flex-col gap-1'>
              <label htmlFor='hosting-sites'>Number of Application Hosting Sites</label>
              <input
                id='hosting-sites'
                type='text'
                name='name'
                placeholder='placeholder'
                className='w-full rounded bg-color-gray px-3 py-1.5 focus:outline-color-pink/70'
              />
            </div>
            <div className='flex items-center col-span-3 gap-3'>
              <label htmlFor='acceleration'>
                Replace existing MPLS with SASE Traffic Acceleration
              </label>
              <input type='checkbox' name='acceleration' defaultChecked={true} id='acceleration' />
            </div>
          </div>
        </div>

        <div className='px-5 py-6 rounded-md shadow-md bg-[#002a5e] text-white'>
          <div className='border-b border-gray-600 pb-5 mb-5'>
            <h4 className='text-xl font-bold mb-3'>Your Quick Results</h4>
            <div>
              <p>Avg Yearly Benefit: $1,168,295</p>

              <p>Payback Period (In Months): 5.04%</p>
              <p>3-Year TCO Savings: $3,000,000</p>
            </div>
          </div>

          <h4 className='text-xl font-bold mb-3 '>Get Your Complete Report</h4>
          <ContactFormThree />
        </div>
      </div>
    </section>
  );
}

export default DesignThree;
