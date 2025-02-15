"use client";

import { useActionState, useEffect, useState } from "react";
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
import { ScsDataType } from "@/utils/types";

function ContactForm() {
  const countiesData = Country.getAllCountries();
  const [selectedCountry, setSelectedCountry] = useState<ICountry | null>(null);
  const { state, dispatch } = useUserInputContext();
  const newState = omitKeys(state, ["regionList"]);
  const [lastResult, action] = useActionState(
    sendEmail.bind(null, newState),
    undefined,
  );

  const [scs, setScs] = useState<ScsDataType | null>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // https://calculator-test-sandy.vercel.app
      if (event.origin !== "https://calculator-test-sandy.vercel.app") {
        console.warn("Blocked message from unknown origin:", event.origin);
        return;
      }

      // Extract and parse data
      const { key, value } = event.data;
      if (key === "_scs" && value) {
        try {
          const scsData = JSON.parse(value);
          setScs(scsData);
          // localStorage.setItem("_scs", value); // Store in localStorage (if needed)
        } catch (error) {
          console.error("Failed to parse received data:", error);
        }
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  console.log(scs, "-----------------scs");

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: contactSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
    onSubmit: () => {
      const newState = omitKeys(state, ["regionList"]);
      storeUserInputData(newState);
      setSelectedCountry(null);
      dispatch({
        type: "UPDATE_FIELD",
        payload: { name: "date", value: new Date() },
      });
    },
  });

  function handleCountryChange(countryCode: string) {
    const country = Country.getCountryByCode(countryCode);
    if (country) {
      setSelectedCountry(country);
      dispatch({
        type: "UPDATE_FIELD",
        payload: { name: "country", value: country.name },
      });
    }
  }

  function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    dispatch({ type: "UPDATE_FIELD", payload: { name, value } });
  }

  return (
    <form
      className="w-full"
      id={form.id}
      action={action}
      onSubmit={form.onSubmit}
    >
      <h3 className="mb-4 text-xl font-bold text-white md:text-2xl">
        Get Your Complete Report {scs?.default.utm.name}
      </h3>
      <div className="mb-6 flex flex-col gap-y-1 md:grid md:grid-cols-2 md:gap-x-4">
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
          onChange={changeHandler}
        />

        <Input
          label="Business Phone"
          id="phone"
          placeholder="+CC (AAA) XXX-XXXX"
          key={fields.phone.key}
          name={fields.phone.name}
          defaultValue={fields.phone.initialValue}
          errorMessage={fields.phone.errors}
          onChange={changeHandler}
        />
        <Input
          label="Company"
          id="company-name"
          placeholder="Company"
          key={fields.company.key}
          name={fields.company.name}
          defaultValue={fields.company.initialValue}
          errorMessage={fields.company.errors}
          onChange={changeHandler}
        />
        <Input
          label="Job Title"
          id="job-title"
          placeholder="Job Title"
          key={fields.jobTitle.key}
          name={fields.jobTitle.name}
          defaultValue={fields.jobTitle.initialValue}
          errorMessage={fields.jobTitle.errors}
          onChange={changeHandler}
        />

        <CountrySelector
          data={countiesData}
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
  );
}

export default ContactForm;
