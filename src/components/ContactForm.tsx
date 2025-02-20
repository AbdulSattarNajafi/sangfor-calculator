"use client";

import { useActionState, useEffect, useState } from "react";
import { Country, ICountry } from "country-state-city";
import { useForm } from "@conform-to/react";

import Input from "./Input";
import CountrySelector from "./CountrySelector";
import SubmitButton from "./SubmitButton";
import { sendEmail } from "@/utils/actions";
import { useUserInputContext } from "@/contexts/UserInputContext";
import { omitKeys, storeUserInputData } from "@/utils/helpers";
import { parseWithZod } from "@conform-to/zod";
import { contactSchema } from "@/utils/zodSchema";
import CheckboxInput from "./CheckboxInput";
import { ScsDataType } from "@/utils/types";

const Calculator_Url = "https://live-sangfor.pantheonsite.io";

function ContactForm() {
  const [scs, setScs] = useState<ScsDataType | null>(null);
  const countiesData = Country.getAllCountries();
  const [selectedCountry, setSelectedCountry] = useState<ICountry | null>(null);
  const { state, dispatch } = useUserInputContext();

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== Calculator_Url) {
        console.warn("Blocked message from unknown origin:", event.origin);
        return;
      }

      const { key, value } = event.data;
      if (key === "_scs" && value) {
        try {
          const scsData = JSON.parse(value);
          setScs(scsData);
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

  const [lastResult, action] = useActionState(
    sendEmail.bind(null, scs),
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
      const newState = omitKeys(state, ["regionList"]);
      storeUserInputData(newState);
      setSelectedCountry(null);
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
      dispatch({
        type: "UPDATE_FIELD",
        payload: { name: "date", value: new Date() },
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
        Get Your Complete Report
      </h3>
      <div className="mb-6 flex flex-col gap-y-1 md:grid md:grid-cols-2 md:gap-x-4 lg:gap-x-2 xl:gap-x-4">
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
