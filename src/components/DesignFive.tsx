"use client";

import { useState } from "react";

import { useUserInputContext } from "@/contexts/UserInputContext";
import Input from "./Input";
import Select from "./Select";
import { formatCompactCurrency, omitKeys } from "@/utils/helpers";
import { costSavingBenefits } from "@/utils/financeSummary";
import ReportGenerators from "@/pdf/ReportGenerators";
import FinancialChart from "@/pdf/charts/FinancialChart";

import ContactFormFour from "./ContactFormFour";
import RangeInput from "./RangeInput";

const initalState = {
  employeeCount: "",
  hybridPercentage: "",
  locations: "",
  countries: "",
  hostingSites: "",
};

function DesignFive() {
  const [error, setError] = useState(initalState);

  const { state, dispatch } = useUserInputContext();
  const newState = omitKeys(state, ["regionList"]);
  const selectedCountry = state.regionList.find(
    (region) => region.country === state.countryName,
  );

  if (!selectedCountry) {
    return (
      <div className="flex h-dvh w-full items-center justify-center">
        <div className="spinner"></div>;
      </div>
    );
  }

  function inputChangeHandler(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    options?: {
      min?: number;
      max?: number;
      isNumber?: boolean;
      message?: string;
    },
  ) {
    const { name, value } = e.target;
    let parsedValue: string | number = value;

    if (options?.isNumber) {
      parsedValue = Number(value);
      if (
        isNaN(parsedValue) ||
        (options.min !== undefined && parsedValue < options.min) ||
        (options.max !== undefined && parsedValue > options.max)
      ) {
        setError((prev) => ({ ...prev, [name]: options.message }));
        return;
      }
    }

    setError((prev) => ({ ...prev, [name]: "" }));
    dispatch({ type: "UPDATE_FIELD", payload: { name, value: parsedValue } });
  }

  function switchChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, checked } = e.target;
    const parsedValue = checked ? 1 : 0;

    dispatch({ type: "UPDATE_FIELD", payload: { name, value: parsedValue } });
  }

  const hasError = Object.values(error).some((msg) => msg !== "");

  const { roiPercentages, benefits, paybackPeriod, avgYearlyBenefits } =
    costSavingBenefits(state, selectedCountry);

  const financeSummary = costSavingBenefits(newState, selectedCountry);

  return (
    <section className="bg-section-bg-2 bg-cover bg-center py-20">
      <div className="wrapper">
        <div className="mb-12 text-white">
          <h2 className="mb-2 text-4xl font-bold">Sangfor ROI Calculator</h2>
          <p className="text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit alias
            fuga magnam optio similique deserunt aspernatur vitae adipisci
            natus, fugiat soluta corporis eveniet neque ipsam inventore non
            voluptatibus amet earum!
          </p>
        </div>

        <div className="flex justify-between gap-4">
          <div className="flex w-3/5 flex-col gap-4">
            <div className="rounded-md bg-blue-tertiary px-5 py-6 shadow-md">
              <div className="mb-6 grid grid-cols-2 gap-x-4 gap-y-1 border-b border-slate-700 pb-6">
                <Select
                  label="Region"
                  labelClassName="text-white"
                  id="countryName"
                  name="countryName"
                  value={state.countryName}
                  onChange={inputChangeHandler}
                >
                  {state.regionList.map((region) => (
                    <option key={region.country} value={region.country}>
                      {region.country}
                    </option>
                  ))}
                </Select>
                <Input
                  label="Total Number of Employees"
                  labelClassName="text-white"
                  id="employeeCount"
                  name="employeeCount"
                  type="number"
                  defaultValue={state.employeeCount}
                  onChange={(e) =>
                    inputChangeHandler(e, {
                      min: 1,
                      isNumber: true,
                      message: "Number of Employees is rquired",
                    })
                  }
                  errorMessage={error.employeeCount}
                />

                <Input
                  label="Number of locations/sites"
                  labelClassName="text-white"
                  id="locations"
                  name="locations"
                  type="number"
                  defaultValue={state.locations}
                  onChange={(e) =>
                    inputChangeHandler(e, {
                      min: 1,
                      isNumber: true,
                      message: "Number of locations is rquired",
                    })
                  }
                  errorMessage={error.locations}
                />
                <Input
                  label="Number of Application Hosting Sites"
                  labelClassName="text-white"
                  id="hostingSites"
                  name="hostingSites"
                  type="number"
                  defaultValue={state.hostingSites}
                  onChange={(e) =>
                    inputChangeHandler(e, {
                      min: 1,
                      isNumber: true,
                      message:
                        "Number of Application Hosting Sites is required",
                    })
                  }
                  errorMessage={error.hostingSites}
                />

                <RangeInput
                  label="Remote/Hybrid Employees"
                  id="hybridPercentage"
                  name="hybridPercentage"
                  type="range"
                  min={0}
                  max={100}
                  value={state.hybridPercentage}
                  onChange={(e) =>
                    inputChangeHandler(e, {
                      min: 0,
                      max: 100,
                      isNumber: true,
                      message: "Employees percentage must be between 0 and 100",
                    })
                  }
                />

                <RangeInput
                  label="Number of countries"
                  id="countries"
                  name="countries"
                  type="range"
                  min={1}
                  max={195}
                  value={state.countries}
                  onChange={(e) =>
                    inputChangeHandler(e, {
                      min: 1,
                      max: 195,
                      isNumber: true,
                      message: "Number of countries must be between 1 and 195",
                    })
                  }
                />

                <div className="col-span-2 mt-4">
                  <div className="flex items-center">
                    <p className="me-4 text-sm text-white">
                      Replace existing MPLS with SASE Traffic Acceleration:
                    </p>
                    <label className="relative inline-flex cursor-pointer items-center">
                      <input
                        name="acceleration"
                        id="switch"
                        value={state.acceleration}
                        checked={state.acceleration === 1}
                        type="checkbox"
                        onChange={switchChangeHandler}
                        className="peer sr-only"
                      />
                      <label htmlFor="switch" className="hidden"></label>
                      <div className="peer-focus:ring-green-300 peer h-5 w-[36px] rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                    </label>
                  </div>
                </div>
              </div>

              <ContactFormFour />
            </div>
          </div>

          <div className="w-2/5">
            <div className="h-full rounded-md bg-white px-5 py-6 shadow-md">
              <div className="border-b border-gray-200 pb-5">
                <h4 className="mb-1 text-2xl font-bold leading-none">
                  Your Quick Results
                </h4>
                <p className="text-gray-600">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptatum quisquam consequatur, voluptas repellendus
                  temporibus illum asperiores quo illo unde aspernatur.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 py-6">
                <div className="flex flex-col items-center rounded-md border border-[#ffc312] bg-white px-2 py-4 text-center leading-tight shadow-sm">
                  <h4 className="mb-1 font-semibold text-gray-500">
                    Return of Investment
                  </h4>
                  <h5 className="text-2xl font-bold text-[#ffc312]">
                    {!hasError && (
                      <span>{Math.round(roiPercentages.total)}%</span>
                    )}
                  </h5>
                </div>
                <div className="flex flex-col items-center rounded-md border border-[#ff6b35] bg-white px-2 py-4 text-center leading-tight shadow-sm">
                  <h4 className="mb-1 font-semibold text-gray-500">
                    Payback Period
                  </h4>
                  <h5 className="text-2xl font-bold text-[#ff6b35]">
                    {!hasError && (
                      <span>{Math.round(paybackPeriod.value)} months</span>
                    )}
                  </h5>
                </div>
                <div className="flex flex-col items-center rounded-md border border-blue-secondary bg-white px-2 py-4 text-center leading-tight shadow-sm">
                  <h4 className="mb-1 font-semibold text-gray-500">
                    Total Benefits (NPV)
                  </h4>
                  <h5 className="text-2xl font-bold text-blue-secondary">
                    {!hasError && (
                      <span>{formatCompactCurrency(benefits.npv)}</span>
                    )}
                  </h5>
                </div>
                <div className="flex flex-col items-center rounded-md border border-[#40b625] bg-white px-2 py-4 text-center leading-tight shadow-sm">
                  <h4 className="mb-1 font-semibold text-gray-500">
                    Avg Yearly Benefit
                  </h4>
                  <h5 className="text-2xl font-bold text-[#40b625]">
                    {!hasError && (
                      <span>
                        {formatCompactCurrency(avgYearlyBenefits.value)}
                      </span>
                    )}
                  </h5>
                </div>
              </div>

              <div className="">
                <FinancialChart
                  benefits={[
                    financeSummary.cost.year1,
                    financeSummary.cost.year2,
                    financeSummary.cost.year3,
                  ]}
                  costs={[
                    financeSummary.benefits.year1 - financeSummary.cost.year1,
                    financeSummary.benefits.year2 - financeSummary.cost.year2,
                    financeSummary.benefits.year3 - financeSummary.cost.year3,
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-0 overflow-hidden">
        <ReportGenerators data={newState} />
      </div>
    </section>
  );
}

export default DesignFive;
