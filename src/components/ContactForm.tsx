"use client";

import { useState } from "react";
import { Country, State, IState, ICountry } from "country-state-city";

import Input from "./Input";
import CountrySelector from "./CountrySelector";
import StateSelector from "./StateSelector";
import SubmitButton from "./SubmitButton";
import { sendEmail } from "@/utils/actions";
import { useUserInputContext } from "@/contexts/UserInputContext";
import { storeUserInputData } from "@/utils/helpers";

function ContactForm() {
  const countiesData = Country.getAllCountries();
  const [states, setStates] = useState<IState[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<ICountry | null>(null);
  const [selectedState, setSelectedState] = useState<IState | null>(null);
  const { state, changeHandler } = useUserInputContext();

  const handleCountryChange = (countryCode: string) => {
    const country = Country.getCountryByCode(countryCode);
    const countryStates = State.getStatesOfCountry(countryCode);

    if (country) {
      setSelectedCountry(country);
    }
    setStates(countryStates);
  };

  const handleStateChange = (state: IState) => {
    setSelectedState(state);
  };

  const submitHandler = (data: FormData) => {
    storeUserInputData(state);
    sendEmail(data);
  };

  return (
    <form className="w-full" action={(data) => submitHandler(data)}>
      {/* <p>{state.employeeCount}</p> */}
      <div className="mb-8 flex flex-col gap-4">
        <Input
          label="First Name"
          name="userName"
          id="userName"
          placeholder="First Name"
          onChange={changeHandler}
        />
        <Input label="Last Name" id="last-name" placeholder="Last Name" />
        <Input label="Work Email" id="email" placeholder="E-mail" />
        <Input
          label="Company Name"
          id="company-name"
          placeholder="Company Name"
        />
        <div className="flex flex-col gap-1">
          <p>Country</p>
          <CountrySelector
            data={countiesData}
            selected={selectedCountry}
            onChange={handleCountryChange}
          />
        </div>
        {states.length > 0 && (
          <div className="flex flex-col gap-1">
            <p>Province</p>
            <StateSelector
              data={states}
              selected={selectedState}
              onChange={handleStateChange}
            />
          </div>
        )}

        <Input label="Phone" id="phone" placeholder="Phone" />
      </div>

      <div>
        <SubmitButton
          label="Get the Full Report"
          loadingLabel="Preparing the Report"
        />
      </div>
    </form>
  );
}

export default ContactForm;
