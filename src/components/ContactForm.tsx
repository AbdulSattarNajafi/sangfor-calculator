"use client";

import { useActionState, useState } from "react";
import { Country, ICountry } from "country-state-city";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { nanoid } from "nanoid";

import Input from "./Input";
import SubmitButton from "./SubmitButton";
import { useUserInputContext } from "@/contexts/UserInputContext";
import { contactSchema } from "@/utils/zodSchema";
import CheckboxInput from "./CheckboxInput";
import { createEloquaEmail } from "@/app/actions/contactForm";
import CountrySelector from "./CountrySelector";
import Recaptcha from "./Recaptcha";
import useRegions from "@/hooks/useRegions";
import useScsData from "@/hooks/useScsData";

function ContactForm() {
  const uniqueId = nanoid();
  const scs = useScsData();
  const countiesData = Country.getAllCountries();
  const [selectedCountry, setSelectedCountry] = useState<ICountry | null>(null);
  const { state, dispatch, error } = useUserInputContext();
  const { regions } = useRegions();

  const hasError = Object.values(error).some((msg) => msg !== "");
  const isEmptyFields =
    state.region === "" ||
    state.totalEmployees === 0 ||
    state.hostingSites === 0 ||
    state.locations === 0;

  const regionLists = regions?.map((region) => {
    if (region.country.includes("hong kong")) {
    }
    const countryNames = region.country.toLocaleLowerCase();
    return countryNames;
  });

  const isFavorite = (country: ICountry) =>
    regionLists?.some((fav) =>
      country.name.toLowerCase().includes(fav.toLowerCase()),
    );

  const sortedCountries = [
    ...countiesData.filter(isFavorite),
    ...countiesData.filter((c) => !isFavorite(c)),
  ];

  const [token, setToken] = useState("");
  const [recaptchaError, setRecaptchaError] = useState("");

  function handleCountryChange(countryCode: string) {
    const country = Country.getCountryByCode(countryCode);
    if (country) {
      setSelectedCountry(country);
      dispatch({
        type: "UPDATE_FIELD",
        payload: { name: "countryName", value: country.name },
      });
      dispatch({
        type: "UPDATE_FIELD",
        payload: { name: "submissionDate", value: new Date().toISOString() },
      });
      dispatch({
        type: "UPDATE_FIELD",
        payload: { name: "userId", value: uniqueId },
      });
    }
  }

  function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    dispatch({ type: "UPDATE_FIELD", payload: { name, value } });
  }

  function handleCheckboxChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    const numValue = value === "on" ? 1 : 0;
    dispatch({ type: "UPDATE_FIELD", payload: { name, value: numValue } });
  }

  const [lastResult, action] = useActionState(
    createEloquaEmail.bind(null, { scs, state }),
    undefined,
  );

  const verifyTokenHandler = async (token: string | null) => {
    if (!token) {
      setRecaptchaError("Please verify you are not a robot!");
      return;
    }

    const res = await fetch("/api/verify-recaptcha", {
      method: "POST",
      body: JSON.stringify({ token }),
      headers: { "Content-Type": "application/json" },
    });

    const { success } = await res.json();

    if (success) {
      setRecaptchaError("");
      setToken(token);
    } else {
      setRecaptchaError("Please verify reCAPTCHA!");
      setToken("");
    }
  };

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: contactSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
    onSubmit: async () => {
      setSelectedCountry(null);
    },
  });

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
          label="First Name*"
          id="firstName"
          placeholder="First Name"
          key={fields.firstName.key}
          name={fields.firstName.name}
          defaultValue={fields.firstName.initialValue}
          errorMessage={fields.firstName.errors}
          onChange={changeHandler}
        />
        <Input
          label="Email Address*"
          id="email"
          placeholder="Email Address"
          key={fields.emailAddress.key}
          name={fields.emailAddress.name}
          defaultValue={fields.emailAddress.initialValue}
          errorMessage={fields.emailAddress.errors}
          onChange={changeHandler}
        />
        <Input
          label="Business Phone*"
          hasInfo={true}
          infoText="Please enter your business phone number with Country Code"
          tooltipCenter={true}
          id="businessPhone"
          placeholder="Mobile number with Country Code"
          key={fields.businessPhone.key}
          name={fields.businessPhone.name}
          defaultValue={fields.businessPhone.initialValue}
          errorMessage={fields.businessPhone.errors}
          onChange={changeHandler}
        />
        <Input
          label="Company*"
          id="companyName"
          placeholder="Company"
          key={fields.companyName.key}
          name={fields.companyName.name}
          defaultValue={fields.companyName.initialValue}
          errorMessage={fields.companyName.errors}
          onChange={changeHandler}
        />
        <Input
          label="Job Title*"
          id="jobTitle"
          placeholder="Job Title"
          key={fields.jobTitle.key}
          name={fields.jobTitle.name}
          defaultValue={fields.jobTitle.initialValue}
          errorMessage={fields.jobTitle.errors}
          onChange={changeHandler}
        />
        <CountrySelector
          data={sortedCountries}
          selected={selectedCountry}
          onChange={handleCountryChange}
          key={fields.countryName.key}
          name={fields.countryName.name}
          errorMessage={fields.countryName.errors}
        />
        <div className="col-span-2 flex flex-col gap-2.5 pt-1">
          <CheckboxInput
            label="Do you want to Request a Demo for Sangfor SASE?"
            id="request-demo"
            name="demoRequest"
            onChange={handleCheckboxChange}
          />
          <CheckboxInput
            label={`I want to receive updates on Sangfor's latest products and solutions. I can unsubscribe at any time. By clicking on the "Download Report" button, you have read and consent to our`}
            linkText="Privacy Policy"
            id="receive-updates"
            name="userConsent"
            onChange={handleCheckboxChange}
          />
        </div>

        <input
          className="sr-only"
          type="text"
          key={fields.recaptcha.key}
          name={fields.recaptcha.name}
          defaultValue={fields.recaptcha.initialValue}
          value={token}
          onChange={() => setToken((prev) => prev)}
        />
      </div>

      <div className="flex flex-col gap-y-2 md:grid md:grid-cols-2 md:gap-x-4 lg:flex xl:grid xl:gap-x-4">
        <div className="flex flex-col items-center gap-2 md:items-start lg:items-center xl:items-start">
          <Recaptcha
            onVerify={(token) => verifyTokenHandler(token)}
            onExpire={() => setToken("")}
          />
          <p className="h-4 text-sm leading-tight text-red-500">
            {fields.recaptcha.errors ? fields.recaptcha.errors : recaptchaError}
          </p>
        </div>
        <div className="relative flex flex-col justify-center text-center md:items-end md:justify-center lg:items-center lg:pt-6 xl:items-end xl:pt-0">
          <div>
            <SubmitButton
              label="Download Report"
              loadingLabel="Downloading..."
              disabled={isEmptyFields || hasError}
            />
          </div>
        </div>
      </div>
    </form>
  );
}

export default ContactForm;
