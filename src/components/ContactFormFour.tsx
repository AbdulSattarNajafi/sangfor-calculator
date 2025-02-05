"use client";

import { useActionState, useState } from "react";
import { Country, ICountry } from "country-state-city";

import Input from "./Input";
import CountrySelector from "./CountrySelector";
import SubmitButton from "./SubmitButton";
import { sendEmail } from "@/utils/actions";
import { useUserInputContext } from "@/contexts/UserInputContext";
import { omitKeys, storeUserInputData } from "@/utils/helpers";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { contactSchema } from "@/utils/zodSchema";
import CheckboxInput from "./CheckboxInput";

function ContactFormFour() {
  const countiesData = Country.getAllCountries();
  const [selectedCountry, setSelectedCountry] = useState<ICountry | null>(null);
  const { state, dispatch } = useUserInputContext();
  const newState = omitKeys(state, ["regionList"]);
  const [lastResult, action] = useActionState(
    sendEmail.bind(null, newState),
    undefined,
  );

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: contactSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
    onSubmit: () => {
      const btn = document.getElementById("generate-pdf-btn");
      if (btn) {
        btn.click();
      }

      const newState = omitKeys(state, ["regionList"]);
      storeUserInputData(newState);
      setSelectedCountry(null);
    },
  });

  function handleCountryChange(countryCode: string) {
    const country = Country.getCountryByCode(countryCode);
    if (country) {
      setSelectedCountry(country);
    }
  }

  function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    dispatch({ type: "UPDATE_FIELD", payload: { name, value } });
  }

  return (
    <>
      <form
        className="w-full"
        id={form.id}
        action={action}
        onSubmit={form.onSubmit}
      >
        <h2 className="mb-4 text-2xl font-bold text-white">
          Get Your Complete Report
        </h2>
        <div className="mb-6 grid grid-cols-2 gap-x-4 gap-y-1">
          <Input
            label="First Name"
            labelClassName="text-white"
            id="userName"
            placeholder="First Name"
            key={fields.firstName.key}
            name={fields.firstName.name}
            defaultValue={fields.firstName.initialValue}
            errorMessage={fields.firstName.errors}
            onChange={changeHandler}
          />

          <Input
            label="Email Address"
            labelClassName="text-white"
            id="email"
            placeholder="Email Address"
            key={fields.email.key}
            name={fields.email.name}
            defaultValue={fields.email.initialValue}
            errorMessage={fields.email.errors}
          />

          <Input
            label="Business Phone"
            labelClassName="text-white"
            id="phone"
            placeholder="Business Phone"
            key={fields.phone.key}
            name={fields.phone.name}
            defaultValue={fields.phone.initialValue}
            errorMessage={fields.phone.errors}
          />
          <Input
            label="Company"
            labelClassName="text-white"
            id="company-name"
            placeholder="Company"
            key={fields.company.key}
            name={fields.company.name}
            defaultValue={fields.company.initialValue}
            errorMessage={fields.company.errors}
          />
          <Input
            label="Job Title"
            labelClassName="text-white"
            id="job-title"
            placeholder="Job Title"
            key={fields.jobTitle.key}
            name={fields.jobTitle.name}
            defaultValue={fields.jobTitle.initialValue}
            errorMessage={fields.jobTitle.errors}
          />

          <CountrySelector
            data={countiesData}
            labelClassName="text-white"
            selected={selectedCountry}
            onChange={handleCountryChange}
            key={fields.country.key}
            name={fields.country.name}
            errorMessage={fields.country.errors}
          />

          <div>
            <CheckboxInput
              label="Do you want to Request a Demo for Sangfor SASE?"
              id="request-demo"
              name="requestDemo"
            />
          </div>

          <div>
            <CheckboxInput
              label="Receive Updates User Consent"
              id="receive-updates"
              name="receiveUpdates"
            />
          </div>
        </div>

        <div>
          <SubmitButton label="Download Report" loadingLabel="Downloading..." />
        </div>
      </form>
    </>
  );
}

export default ContactFormFour;
