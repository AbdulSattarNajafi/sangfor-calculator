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

function ContactForm() {
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
        <div className="mb-8 flex flex-col gap-1">
          <Input
            label="First Name"
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
            id="email"
            placeholder="Email Address"
            key={fields.email.key}
            name={fields.email.name}
            defaultValue={fields.email.initialValue}
            errorMessage={fields.email.errors}
          />

          <Input
            label="Business Phone"
            id="phone"
            placeholder="Business Phone"
            key={fields.phone.key}
            name={fields.phone.name}
            defaultValue={fields.phone.initialValue}
            errorMessage={fields.phone.errors}
          />
          <Input
            label="Company"
            id="company-name"
            placeholder="Company"
            key={fields.company.key}
            name={fields.company.name}
            defaultValue={fields.company.initialValue}
            errorMessage={fields.company.errors}
          />
          <Input
            label="Job Title"
            id="job-title"
            placeholder="Job Title"
            key={fields.jobTitle.key}
            name={fields.jobTitle.name}
            defaultValue={fields.jobTitle.initialValue}
            errorMessage={fields.jobTitle.errors}
          />

          <CountrySelector
            data={countiesData}
            selected={selectedCountry}
            onChange={handleCountryChange}
            key={fields.country.key}
            name={fields.country.name}
            errorMessage={fields.country.errors}
          />

          <div className="flex items-center gap-2.5">
            <label
              htmlFor="request-demo"
              className="text-sm text-blue-secondary"
            >
              Do you want to Request a Demo for Sangfor SASE?
            </label>
            <input type="checkbox" id="request-demo" name="requestDemo" />
          </div>

          <div className="flex items-center gap-2.5">
            <label
              htmlFor="receive-updates"
              className="text-sm text-blue-secondary"
            >
              Receive Updates User Consent
            </label>
            <input type="checkbox" id="receive-updates" name="receiveUpdates" />
          </div>
        </div>

        <div>
          <SubmitButton label="Download Report" loadingLabel="Downloading..." />
        </div>
      </form>
    </>
  );
}

export default ContactForm;
