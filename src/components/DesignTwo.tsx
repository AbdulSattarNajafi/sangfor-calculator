'use client';

import ContactForm from './ContactForm';
import Badge from './Badge';
import { regionData } from '@/utils/constants';

function DesignTwo() {
  return (
    <section className='py-20 bg-[#f7f7f7]'>
      <div className='wrapper '>
        <div className='text-center mb-10 max-w-3xl w-full mx-auto'>
          <h2 className='text-4xl font-bold mb-2'>Sangfor ROI Calculator</h2>
          <p className='text-lg'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium, reprehenderit
            neque dolore commodi sed praesentium quidem tempora atque incidunt odio.
          </p>
        </div>
        <div className='flex justify-between gap-4'>
          <div className='w-3/5'>
            <div className='border-2 border-blue p-5 rounded-md bg-white shadow-md'>
              <div className='mb-4'>
                <Badge label='1 the basics' />
                <p className='mb-4'>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum autem cumque
                  quisquam. Quasi eum soluta eos!
                </p>
                <div className='flex flex-col gap-1 mb-4'>
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
              </div>

              <div className='mb-4'>
                <Badge label='2 the basics' />
                <div className='flex flex-col gap-1 mb-4'>
                  <label htmlFor='employee'>Total Number of Employees</label>
                  <input
                    id='employee'
                    type='text'
                    name='name'
                    placeholder='placeholder'
                    className='w-full rounded bg-color-gray px-3 py-1.5 focus:outline-color-pink/70'
                  />
                </div>
                <div className='flex flex-col gap-1 mb-4'>
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
                  <label htmlFor='acceleration'>
                    Replace existing MPLS with SASE Traffic Acceleration
                  </label>
                  <select
                    name='acceleration'
                    id='acceleration'
                    className='w-full rounded bg-color-gray px-3 py-2 focus:outline-color-pink/70'
                  >
                    <option value={1}>Yes</option>
                    <option value={0}>No</option>
                  </select>
                </div>
              </div>

              <div>
                <Badge label='3 the basics' />
                <div className='flex flex-col gap-1 mb-4'>
                  <label htmlFor='locations'>Number of locations/sites</label>
                  <input
                    id='locations'
                    type='text'
                    name='name'
                    placeholder='placeholder'
                    className='w-full rounded bg-color-gray px-3 py-1.5 focus:outline-color-pink/70'
                  />
                </div>
                <div className='flex flex-col gap-1 mb-4'>
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
              </div>
            </div>
          </div>

          <div className='w-2/5 text-white'>
            <div className='px-5 py-6 rounded-md shadow-md bg-dark-blue'>
              <div className='border-b border-gray-200 pb-5 mb-5'>
                <h4 className='text-xl font-bold mb-3'>Your Quick Results</h4>
                <div>
                  <p>Avg Yearly Benefit: $1,168,295</p>

                  <p>Payback Period (In Months): 5.04%</p>
                  <p>3-Year TCO Savings: $3,000,000</p>
                </div>
              </div>

              <h4 className='text-xl font-bold mb-4 leading-none'>Get Your Complete Report</h4>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DesignTwo;
