"use client";

import Select from "./Select";
import Input from "./Input";
import Switch from "./Switch";
import RangeInput from "./RangeInput";
import { useUserInputContext } from "@/contexts/UserInputContext";
import useRegions from "@/hooks/useRegions";

function CalculatorForm() {
  const { state, dispatch, inputChangeHandler, error } = useUserInputContext();
  const { regions, regionsError, regionsIsLoading } = useRegions();

  function switchChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, checked } = e.target;
    const value = checked ? 1 : 0;
    dispatch({ type: "UPDATE_FIELD", payload: { name, value } });
  }

  return (
    <div>
      <h3 className="mb-4 text-xl font-bold text-white md:text-2xl">
        Enter Company Data for ROI Calculation
      </h3>
      <div className="flex flex-col gap-y-1 md:grid md:grid-cols-2 md:gap-x-4 lg:gap-x-2 xl:gap-x-4">
        {regionsError && (
          <div className="flex items-center justify-center text-red-500">
            <p className="text-center">Regions not Found!</p>
          </div>
        )}
        {regionsIsLoading && <Input label="Region" />}
        {!regionsIsLoading && !regionsError && (
          <Select
            label="Region"
            id="region"
            name="region"
            value={state.countryName}
            onChange={inputChangeHandler}
          >
            {regions?.map((region) => (
              <option key={region.country} value={region.country}>
                {region.country}
              </option>
            ))}
          </Select>
        )}
        <Input
          label="Total Number of Employees"
          id="totalEmployees"
          name="totalEmployees"
          type="number"
          defaultValue={state.totalEmployees}
          onChange={(e) =>
            inputChangeHandler(e, {
              min: 1,
              isNumber: true,
              message: "Number of Employees is rquired",
            })
          }
          errorMessage={error.totalEmployees}
        />
        <Input
          label="Number of locations/sites"
          hasInfo={true}
          infoText="Please input the number of locations
        where your end users are located. Please count all your Headquarter
        locations, Data centres, Cloud Environments, Branch Offices, Retail
        Locations, Manufacturing facilities. Warehouses etc"
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
          hasInfo={true}
          infoText="All locations where
        applications servers or workloads are hosted including private/public
        cloud environments must be counted."
          id="hostingSites"
          name="hostingSites"
          type="number"
          defaultValue={state.hostingSites}
          onChange={(e) =>
            inputChangeHandler(e, {
              min: 1,
              isNumber: true,
              message: "Number of Application Hosting Sites is required",
            })
          }
          errorMessage={error.hostingSites}
        />
        <div className="mb-4 md:mb-0">
          <RangeInput
            formatter="%"
            label="Percentage of Remote/Hybrid Employees"
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
              })
            }
          />
        </div>
        <RangeInput
          label="Number of Countries"
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
            })
          }
        />
        <div className="col-span-2 mt-5">
          <Switch
            label="Replace existing MPLS with SASE Traffic Acceleration"
            name="acceleration"
            id="acceleration"
            checked={state.acceleration === 1}
            onChange={switchChangeHandler}
          />
        </div>
      </div>
    </div>
  );
}

export default CalculatorForm;
