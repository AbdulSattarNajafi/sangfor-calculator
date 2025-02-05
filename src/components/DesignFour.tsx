"use client";

import { useState } from "react";

import { useUserInputContext } from "@/contexts/UserInputContext";
import Input from "./Input";
import Select from "./Select";
import { omitKeys, shortenNumber } from "@/utils/helpers";
import { costSavingBenefits } from "@/utils/financeSummary";
import ReportGenerators from "@/pdf/ReportGenerators";
import ContactFormFour from "./ContactFormFour";
import FinancialChart from "@/pdf/charts/FinancialChart";

const initalState = {
  employeeCount: "",
  hybridPercentage: "",
  locations: "",
  countries: "",
  hostingSites: "",
};

function DesignFour() {
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

  const hasError = Object.values(error).some((msg) => msg !== "");

  const { roiPercentages, paybackPeriod, avgYearlyBenefits } =
    costSavingBenefits(state, selectedCountry);

  const financeSummary = costSavingBenefits(newState, selectedCountry);

  return (
    <section className="bg-section-bg-2 bg-cover bg-center py-20">
      <div className="wrapper">
        <div className="mb-12 text-white">
          <h2 className="mb-2 text-4xl font-bold">Sangfor ROI Calculator</h2>
        </div>
        <div className="flex justify-between gap-4">
          <div className="flex w-3/5 flex-col gap-4">
            <div className="rounded-md bg-blue-tertiary px-5 py-6 shadow-md">
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

              <div className="grid grid-cols-2 gap-x-4 gap-y-1">
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
                  label="Percentage of Remote/Hybrid Employees"
                  labelClassName="text-white"
                  id="hybridPercentage"
                  name="hybridPercentage"
                  type="number"
                  defaultValue={state.hybridPercentage}
                  onChange={(e) =>
                    inputChangeHandler(e, {
                      min: 1,
                      max: 100,
                      isNumber: true,
                      message: "Employees percentage must be between 0 and 100",
                    })
                  }
                  errorMessage={error.hybridPercentage}
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
                  label="Number of countries"
                  labelClassName="text-white"
                  id="countries"
                  name="countries"
                  type="number"
                  defaultValue={state.countries}
                  onChange={(e) =>
                    inputChangeHandler(e, {
                      min: 1,
                      max: 195,
                      isNumber: true,
                      message: "Number of countries must be between 1 and 195",
                    })
                  }
                  errorMessage={error.countries}
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
                <div className="col-span-2">
                  {/* <Select
                    label="Replace existing MPLS with SASE Traffic Acceleration"
                    labelClassName="text-white"
                    id="acceleration"
                    name="acceleration"
                    value={state.acceleration}
                    onChange={(e) =>
                      inputChangeHandler(e, { min: 0, isNumber: true })
                    }
                  >
                    <option value={1}>Yes</option>
                    <option value={0}>No</option>
                  </Select> */}
                  <div className="flex items-center space-x-4">
                    <label className="text-white" htmlFor="acceleration">
                      Replace existing MPLS with SASE Traffic Acceleration
                    </label>

                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="yes"
                        name="acceleration"
                        value="1"
                        checked={state.acceleration === 1}
                        onChange={(e) =>
                          inputChangeHandler(e, { min: 0, isNumber: true })
                        }
                        className="mr-2"
                      />
                      <label htmlFor="yes" className="text-white">
                        Yes
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="no"
                        name="acceleration"
                        value="0"
                        checked={state.acceleration === 0}
                        onChange={(e) =>
                          inputChangeHandler(e, { min: 0, isNumber: true })
                        }
                        className="mr-2"
                      />
                      <label htmlFor="no" className="text-white">
                        No
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-md bg-blue-tertiary px-5 py-6 shadow-md">
              <ContactFormFour />
            </div>
          </div>

          <div className="w-2/5">
            <div className="h-full rounded-md bg-white px-5 py-6 shadow-md">
              <div>
                <div className="border-b border-gray-500 pb-6">
                  <h4 className="text-xl font-bold leading-none">
                    Your Quick Results
                  </h4>
                </div>
                <div className="grid grid-cols-3 gap-2.5 py-6">
                  <div className="flex flex-col items-center rounded-md border border-gray-200 bg-white px-2 py-4 text-center leading-tight shadow-sm">
                    <h4 className="text-gray-500">ROI</h4>
                    <h5 className="text-2xl font-bold text-green">
                      {!hasError && (
                        <span>{Math.round(roiPercentages.total)}%</span>
                      )}
                    </h5>
                  </div>
                  <div className="flex flex-col items-center rounded-md border border-gray-200 bg-white px-2 py-4 text-center leading-tight shadow-sm">
                    <h4 className="text-gray-500">Payback Period</h4>
                    <h5 className="text-2xl font-bold text-green">
                      {!hasError && (
                        <span>{Math.round(paybackPeriod.value)} </span>
                      )}
                    </h5>
                  </div>
                  <div className="flex flex-col items-center rounded-md border border-gray-200 bg-white px-2 py-4 text-center leading-tight shadow-sm">
                    <h4 className="text-gray-500">Avg Yearly Benefit</h4>
                    <h5 className="text-2xl font-bold text-green">
                      {!hasError && (
                        <span>{shortenNumber(avgYearlyBenefits.value)}</span>
                      )}
                    </h5>
                  </div>
                </div>

                <div className="m-6">
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
      </div>
      <div className="h-0 overflow-hidden">
        <ReportGenerators data={newState} />
      </div>
    </section>
  );
}

export default DesignFour;
