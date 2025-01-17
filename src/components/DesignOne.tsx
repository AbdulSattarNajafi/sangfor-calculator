'use client';

import ContactForm from './ContactForm';
import { regionData } from '@/utils/constants';

function DesignOne() {
  return (
    <section
      className='py-20 bg-section-bg-2
     bg-cover bg-center'
    >
      <div className='wrapper'>
        <div className=' mb-12  text-white'>
          <h2 className='text-4xl font-bold mb-2'>Sangfor ROI Calculator</h2>
        </div>
        <div className='flex justify-between gap-4'>
          <div className='w-2/3'>
            <div className='bg-blue-tertiary px-5 py-6 rounded-md'>
              <div className='text-white mb-4'>
                <h2 className='text-2xl font-bold mb-2'>Lorem ipsum dolor sit amet?</h2>
                <p className='text-white'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit alias fuga magnam
                  optio similique deserunt aspernatur vitae adipisci natus, fugiat soluta corporis
                  eveniet neque ipsam inventore non voluptatibus amet earum!
                </p>
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <div className='flex flex-col gap-1'>
                  <label htmlFor='region' className='text-white'>
                    Region
                  </label>
                  <select
                    id='region'
                    name='region'
                    className='w-full rounded bg-gray-200 px-3 py-2 focus:outline-color-pink/70'
                  >
                    {regionData.map((region) => (
                      <option key={region.name} value={region.securityEmployeeSalary}>
                        {region.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className='flex flex-col gap-1'>
                  <label htmlFor='employee' className='text-white'>
                    Total Number of Employees
                  </label>
                  <input
                    id='employee'
                    type='text'
                    name='name'
                    placeholder='placeholder'
                    className='w-full rounded bg-gray-200 px-3 py-1.5 focus:outline-color-pink/70'
                  />
                </div>

                <div className='flex flex-col gap-1'>
                  <label htmlFor='hybrid-employee' className='text-white'>
                    Percentage of Remote/Hybrid Employees
                  </label>
                  <input
                    id='hybrid-employee'
                    type='text'
                    name='name'
                    placeholder='placeholder'
                    className='w-full rounded bg-gray-200 px-3 py-1.5 focus:outline-color-pink/70'
                  />
                </div>

                <div className='flex flex-col gap-1'>
                  <label htmlFor='locations' className='text-white'>
                    Number of locations/sites
                  </label>
                  <input
                    id='locations'
                    type='text'
                    name='name'
                    placeholder='placeholder'
                    className='w-full rounded bg-gray-200 px-3 py-1.5 focus:outline-color-pink/70'
                  />
                </div>
                <div className='flex flex-col gap-1'>
                  <label htmlFor='countries' className='text-white'>
                    Number of countries
                  </label>
                  <input
                    id='countries'
                    type='text'
                    name='name'
                    placeholder='placeholder'
                    className='w-full rounded bg-gray-200 px-3 py-1.5 focus:outline-color-pink/70'
                  />
                </div>

                <div className='flex flex-col gap-1'>
                  <label htmlFor='hosting-sites' className='text-white'>
                    Number of Application Hosting Sites
                  </label>
                  <input
                    id='hosting-sites'
                    type='text'
                    name='name'
                    placeholder='placeholder'
                    className='w-full rounded bg-gray-200 px-3 py-1.5 focus:outline-color-pink/70'
                  />
                </div>

                <div className='flex flex-col col-span-2 gap-1'>
                  <label htmlFor='acceleration' className='text-white'>
                    Replace existing MPLS with SASE Traffic Acceleration
                  </label>
                  <select
                    name='acceleration'
                    id='acceleration'
                    className='w-full rounded bg-gray-200 px-3 py-2 focus:outline-color-pink/70'
                  >
                    <option value={1}>Yes</option>
                    <option value={0}>No</option>
                  </select>
                </div>
              </div>

              <div className='text-white border-t border-gray-500 mt-6 pt-6 text-sm font-semibold'>
                <h4 className='text-lg font-bold mb-3 leading-none'>Your Quick Results:</h4>
                <ul className='flex flex-col gap-1 leading-tight'>
                  <li className='flex items-center gap-4'>
                    <span className='inline-block w-48'>Payback Period (In Months):</span>
                    <span>5.04%</span>
                  </li>
                  <li className='flex items-center gap-4'>
                    <span className='inline-block w-48'>Avg Yearly Benefit:</span>
                    <span>$1,168,295</span>
                  </li>
                  <li className='flex items-center gap-4'>
                    <span className='inline-block w-48'>3-Year TCO Savings:</span>
                    <span>$3,000,000</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className='w-1/3'>
            <div className='px-5 py-6 rounded-md shadow-md bg-white'>
              <h4 className='text-lg font-bold mb-4 leading-none'>Get Your Complete Report</h4>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DesignOne;
