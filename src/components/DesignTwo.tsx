"use client";

import ContactForm from "./ContactForm";
import Badge from "./Badge";
import { regionData } from "@/utils/constants";
import { formatCurrency } from "@/utils/helpers";
import { useUserInputContext } from "@/contexts/UserInputContext";

function DesignTwo() {
  const { state, changeHandler } = useUserInputContext();

  return (
    <section className="bg-[#f7f7f7] py-20">
      <div className="wrapper">
        <div className="mx-auto mb-10 w-full max-w-3xl text-center">
          <h2 className="mb-2 text-4xl font-bold">Sangfor ROI Calculator</h2>
          <p className="text-lg">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Accusantium, reprehenderit neque dolore commodi sed praesentium
            quidem tempora atque incidunt odio.
          </p>
        </div>
        <div className="mx-auto flex w-full max-w-5xl justify-between gap-4">
          <div className="w-[55%]">
            <div className="rounded-md border-2 border-blue bg-white p-5 shadow-md">
              <div className="mb-4">
                <Badge label="1 the basics" />
                <p className="mb-4">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Laborum autem cumque quisquam. Quasi eum soluta eos!
                </p>
                <div className="mb-4 flex flex-col gap-1">
                  <label htmlFor="countryName">Region</label>
                  <select
                    className="focus:outline-color-pink/70 w-full rounded bg-color-gray px-3 py-2"
                    id="countryName"
                    name="countryName"
                    value={state.countryName}
                    onChange={changeHandler}
                  >
                    {regionData.map((region) => (
                      <option key={region.name} value={region.name}>
                        {region.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <Badge label="2 the basics" />
                <div className="mb-4 flex flex-col gap-1">
                  <label htmlFor="employeeCount">
                    Total Number of Employees
                  </label>
                  <input
                    className="focus:outline-color-pink/70 w-full rounded bg-color-gray px-3 py-1.5"
                    id="employeeCount"
                    name="employeeCount"
                    type="number"
                    value={state.employeeCount}
                    onChange={changeHandler}
                  />
                </div>
                <div className="mb-4 flex flex-col gap-1">
                  <label htmlFor="hybridPercentage">
                    Percentage of Remote/Hybrid Employees
                  </label>
                  <input
                    className="focus:outline-color-pink/70 w-full rounded bg-color-gray px-3 py-1.5"
                    id="hybridPercentage"
                    name="hybridPercentage"
                    type="number"
                    value={state.hybridPercentage}
                    onChange={changeHandler}
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="acceleration">
                    Replace existing MPLS with SASE Traffic Acceleration
                  </label>
                  <select
                    className="focus:outline-color-pink/70 w-full rounded bg-color-gray px-3 py-2"
                    id="acceleration"
                    name="acceleration"
                    value={state.acceleration}
                    onChange={changeHandler}
                  >
                    <option value={1}>Yes</option>
                    <option value={0}>No</option>
                  </select>
                </div>
              </div>

              <div>
                <Badge label="3 the basics" />
                <div className="mb-4 flex flex-col gap-1">
                  <label htmlFor="locations">Number of locations/sites</label>
                  <input
                    className="focus:outline-color-pink/70 w-full rounded bg-color-gray px-3 py-1.5"
                    id="locations"
                    name="locations"
                    type="number"
                    value={state.locations}
                    onChange={changeHandler}
                  />
                </div>
                <div className="mb-4 flex flex-col gap-1">
                  <label htmlFor="countries">Number of countries</label>
                  <input
                    className="focus:outline-color-pink/70 w-full rounded bg-color-gray px-3 py-1.5"
                    id="countries"
                    name="countries"
                    type="number"
                    value={state.countries}
                    onChange={changeHandler}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="hostingSites">
                    Number of Application Hosting Sites
                  </label>
                  <input
                    className="focus:outline-color-pink/70 w-full rounded bg-color-gray px-3 py-1.5"
                    id="hostingSites"
                    name="hostingSites"
                    type="number"
                    value={state.hostingSites}
                    onChange={changeHandler}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="w-[45%] text-white">
            <div className="rounded-md bg-dark-blue px-5 py-6 pb-7 shadow-md">
              <div className="mb-5 border-b border-gray-200 pb-5">
                <h4 className="mb-3 text-xl font-bold">Your Quick Results</h4>
                <div>
                  <p>
                    Avg Yearly Benefit: <b>{formatCurrency(11233)}</b>
                  </p>

                  <p>
                    Payback Period (In Months): <b> 5.04%</b>
                  </p>
                  <p>
                    3-Year TCO Savings: <b>{formatCurrency(11233 * 3)}</b>
                  </p>
                </div>
              </div>

              <h4 className="mb-4 text-xl font-bold leading-none">
                Get Your Complete Report
              </h4>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DesignTwo;
