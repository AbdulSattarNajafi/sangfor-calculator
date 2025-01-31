"use client";

import ContactForm from "./ContactForm";
import { regionData } from "@/utils/constants";
import { useUserInputContext } from "@/contexts/UserInputContext";
import Input from "./Input";
import Select from "./Select";
import { shortenNumber } from "@/utils/helpers";

import { costSavingBenefits } from "@/utils/financeSummary";

function DesignOne() {
  const { state, changeHandler } = useUserInputContext();
  const selectedCountry = regionData.find(
    (region) => region.name === state.countryName,
  );
  const { roiPercentages, benefits, paybackPeriod, avgYearlyBenefits } =
    costSavingBenefits(state, selectedCountry!);

  return (
    <section className="bg-section-bg-2 bg-cover bg-center py-20">
      <div className="wrapper">
        <div className="mb-12 text-white">
          <h2 className="mb-2 text-4xl font-bold">Sangfor ROI Calculator</h2>
        </div>
        <div className="flex justify-between gap-4">
          <div className="w-3/5">
            <div className="rounded-md bg-blue-tertiary px-5 py-6">
              <div className="mb-4 text-white">
                <h2 className="mb-2 text-2xl font-bold">
                  Lorem ipsum dolor sit amet?
                </h2>
                <p className="text-white">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit
                  alias fuga magnam optio similique deserunt aspernatur vitae
                  adipisci natus, fugiat soluta corporis eveniet neque ipsam
                  inventore non voluptatibus amet earum!
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Select
                  label="Region"
                  labelClassName="text-white"
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
                </Select>
                <Input
                  label="Total Number of Employees"
                  labelClassName="text-white"
                  id="employeeCount"
                  name="employeeCount"
                  type="number"
                  value={state.employeeCount}
                  onChange={changeHandler}
                />

                <Input
                  label="Percentage of Remote/Hybrid Employees"
                  labelClassName="text-white"
                  id="hybridPercentage"
                  name="hybridPercentage"
                  type="number"
                  value={state.hybridPercentage}
                  onChange={changeHandler}
                />
                <Input
                  label="Number of locations/sites"
                  labelClassName="text-white"
                  id="locations"
                  name="locations"
                  type="number"
                  value={state.locations}
                  onChange={changeHandler}
                />
                <Input
                  label="Number of countries"
                  labelClassName="text-white"
                  id="countries"
                  name="countries"
                  type="number"
                  value={state.countries}
                  onChange={changeHandler}
                />
                <Input
                  label="Number of Application Hosting Sites"
                  labelClassName="text-white"
                  id="hostingSites"
                  name="hostingSites"
                  type="number"
                  value={state.hostingSites}
                  onChange={changeHandler}
                />
                <div className="col-span-2">
                  <Select
                    label="Replace existing MPLS with SASE Traffic Acceleration"
                    labelClassName="text-white"
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

              <div className="mt-6 border-t border-gray-500 pt-6 text-sm font-semibold text-white">
                <h4 className="mb-3 text-lg font-bold leading-none">
                  Your Quick Results:
                </h4>
                <ul className="flex flex-col gap-1 leading-tight">
                  <li className="flex items-center gap-4">
                    <span className="inline-block w-48">ROI</span>
                    <span>{Math.round(roiPercentages.total)}%</span>
                  </li>
                  <li className="flex items-center gap-4">
                    <span className="inline-block w-48">
                      Payback Period (In Months):
                    </span>
                    <span>{Math.round(paybackPeriod.value)}</span>
                  </li>
                  <li className="flex items-center gap-4">
                    <span className="inline-block w-48">
                      Total Benefits (NPV):
                    </span>
                    <span>{shortenNumber(benefits.npv)} USD</span>
                  </li>
                  <li className="flex items-center gap-4">
                    <span className="inline-block w-48">
                      Avg Yearly Benefit:
                    </span>
                    <span>{shortenNumber(avgYearlyBenefits.value)} USD</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="w-2/5">
            <div className="rounded-md bg-white px-5 py-6 shadow-md">
              <h4 className="mb-4 text-lg font-bold leading-none">
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

export default DesignOne;
