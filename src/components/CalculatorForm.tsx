"use client";

import Select from "./Select";
import Input from "./Input";
import Switch from "./Switch";
import RangeInput from "./RangeInput";
import { useUserInputContext } from "@/contexts/UserInputContext";

function CalculatorForm() {
  const { state, dispatch, inputChangeHandler, error } = useUserInputContext();

  function switchChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, checked } = e.target;
    const value = checked ? 1 : 0;
    dispatch({ type: "UPDATE_FIELD", payload: { name, value } });
  }

  return (
    <div className="mb-7 border-b border-slate-700 pb-7">
      <h3 className="mb-4 text-2xl font-bold text-white">
        Lorem ipsum dolor sit amet
      </h3>
      <div className="grid grid-cols-2 gap-x-4 gap-y-1">
        <Select
          label="Region"
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
            value={state.acceleration}
            checked={state.acceleration === 1}
            onChange={switchChangeHandler}
          />
        </div>
      </div>
    </div>
  );
}

export default CalculatorForm;
