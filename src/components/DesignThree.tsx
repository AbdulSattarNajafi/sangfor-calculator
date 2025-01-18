"use client";

import { regionData } from "@/utils/constants";
import ContactFormThree from "./ContactFormThree";
import { useUserInputContext } from "@/contexts/UserInputContext";
import Select from "./Select";
import Input from "./Input";

function DesignThree() {
  const { state, changeHandler } = useUserInputContext();

  return (
    <section className="bg-section-bg bg-cover bg-center py-20">
      <div className="wrapper">
        <div className="mx-auto mb-10 w-full max-w-3xl text-center text-white">
          <h2 className="mb-2 text-4xl font-bold">Sangfor ROI Calculator</h2>
        </div>

        <div className="mb-4 rounded-md bg-white px-5 py-6 shadow-md">
          <div className="mb-4 grid grid-cols-3 gap-3">
            <div className="col-span-2 pe-8">
              <h2 className="mb-1 text-xl font-bold">
                Lorem ipsum dolor sit amet?
              </h2>
              <p className="">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit
                alias fuga magnam optio similique deserunt aspernatur vitae
                adipisci natus, fugiat soluta corporis eveniet neque ipsam
                inventore non voluptatibus amet earum!
              </p>
            </div>

            <div className="">
              <h4 className="mb-1 text-xl font-bold">Your Quick Results</h4>
              <div>
                <p>
                  Avg Yearly Benefit: <b>$1,168,295</b>
                </p>

                <p>
                  Payback Period (In Months): <b>5.04%</b>
                </p>
                <p>
                  3-Year TCO Savings: <b>$3,000,000</b>
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-x-3 gap-y-4 border-t border-gray-300 pt-4">
            <Select
              label="Region"
              id="countryName"
              name="countryName"
              value={state.countryName}
              onChange={changeHandler}
            >
              {regionData.map((region) => (
                <option key={region.name} value={region.securityEmployeeSalary}>
                  {region.name}
                </option>
              ))}
            </Select>

            <Input
              label="Total Number of Employees"
              id="employeeCount"
              name="employeeCount"
              type="number"
              value={state.employeeCount}
              onChange={changeHandler}
            />

            <Input
              label="Percentage of Remote/Hybrid Employees"
              id="hybridPercentage"
              name="hybridPercentage"
              type="number"
              value={state.hybridPercentage}
              onChange={changeHandler}
            />
            <Input
              label="Number of locations/sites"
              id="locations"
              name="locations"
              type="number"
              value={state.locations}
              onChange={changeHandler}
            />
            <Input
              label="Number of countries"
              id="countries"
              name="countries"
              type="number"
              value={state.countries}
              onChange={changeHandler}
            />
            <Input
              label="Number of Application Hosting Sites"
              id="hostingSites"
              name="hostingSites"
              type="number"
              value={state.hostingSites}
              onChange={changeHandler}
            />
            <div className="col-span-3 flex">
              <Select
                label="Replace existing MPLS with SASE Traffic Acceleration"
                id="acceleration"
                name="acceleration"
                value={state.acceleration}
                onChange={changeHandler}
              >
                <option value={1}>Yes</option>
                <option value={0}>No</option>
              </Select>
            </div>
          </div>
        </div>

        <div className="rounded-md bg-[#002a5e] px-5 py-6 text-white shadow-md">
          <h4 className="mb-3 text-xl font-bold">Get Your Complete Report</h4>
          <ContactFormThree />
        </div>
      </div>
    </section>
  );
}

export default DesignThree;
