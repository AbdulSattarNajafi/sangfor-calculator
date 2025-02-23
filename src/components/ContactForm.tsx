"use client";

import { useActionState, useState } from "react";
import { Country, ICountry } from "country-state-city";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { nanoid } from "nanoid";

import Input from "./Input";
import CountrySelector from "./CountrySelector";
import SubmitButton from "./SubmitButton";
import { useUserInputContext } from "@/contexts/UserInputContext";
import { storeUserInputData } from "@/utils/helpers";
import { contactSchema } from "@/utils/zodSchema";
import CheckboxInput from "./CheckboxInput";
import { createEloquaEmail } from "@/app/actions/contactForm";
import { useScsData } from "@/hooks/useScsData";
import { addCustomer } from "@/hooks/useCustomer";

function ContactForm() {
  const uniqueId = nanoid();
  const scs = useScsData();
  const countiesData = Country.getAllCountries();
  const [selectedCountry, setSelectedCountry] = useState<ICountry | null>(null);
  const { state, dispatch } = useUserInputContext();

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
        payload: { name: "submissionDate", value: new Date() },
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

  async function createCustomer() {
    // let scsData;

    // if (scs?.default.utm.value) {
    //   const {
    //     utm_source,
    //     utm_medium,
    //     utm_campaign,
    //     utm_id,
    //     utm_term,
    //     utm_content,
    //     gBraid,
    //     gclid,
    //     gdpr_checkbox,
    //   } = scs?.default.utm.value;
    //   scsData = {
    //     utm_source: !utm_source ? "" : utm_source,
    //     utm_medium: !utm_medium ? "" : utm_medium,
    //     utm_campaign: !utm_campaign ? "" : utm_campaign,
    //     utm_id: !utm_id ? "" : utm_id,
    //     utm_term: !utm_term ? "" : utm_term,
    //     utm_content: !utm_content ? "" : utm_content,
    //     gBraid: !gBraid ? "" : gBraid,
    //     gclid: !gclid ? "" : gclid,
    //     gdpr_checkbox: !gdpr_checkbox ? false : gdpr_checkbox,
    //   };
    // } else {
    //   scsData = {
    //     utm_source: "",
    //     utm_medium: "",
    //     utm_campaign: "",
    //     utm_id: "",
    //     utm_term: "",
    //     utm_content: "",
    //     gBraid: "",
    //     gclid: "",
    //     gdpr_checkbox: false,
    //   };
    // }

    const landingPageInfo = {
      lead_source: "Sangfor SASE TCO/ROI Calculator",
      marketing_campaign: "Sangfor SASE TCO/ROI Calculator Marketing Campaign",
      form_page_url: "",
      pdf_report_url: "",
      landing_page_url: "",
    };

    await addCustomer(state, landingPageInfo, scs);
  }

  const [lastResult, action] = useActionState(
    createEloquaEmail.bind(null, { scs, id: uniqueId }),
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
      storeUserInputData(uniqueId);
      setSelectedCountry(null);

      // Submit the Data to the Backend
      createCustomer();
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
          label="First Name"
          id="firstName"
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
          key={fields.emailAddress.key}
          name={fields.emailAddress.name}
          defaultValue={fields.emailAddress.initialValue}
          errorMessage={fields.emailAddress.errors}
          onChange={changeHandler}
        />

        <Input
          label="Business Phone"
          id="businessPhone"
          placeholder="+CC (AAA) XXX-XXXX"
          key={fields.businessPhone.key}
          name={fields.businessPhone.name}
          defaultValue={fields.businessPhone.initialValue}
          errorMessage={fields.businessPhone.errors}
          onChange={changeHandler}
        />
        <Input
          label="Company"
          id="companyName"
          placeholder="Company"
          key={fields.companyName.key}
          name={fields.companyName.name}
          defaultValue={fields.companyName.initialValue}
          errorMessage={fields.companyName.errors}
          onChange={changeHandler}
        />
        <Input
          label="Job Title"
          id="jobTitle"
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
          key={fields.countryName.key}
          name={fields.countryName.name}
          errorMessage={fields.countryName.errors}
        />

        <div>
          <CheckboxInput
            label="Do you want to Request a Demo for Sangfor SASE?"
            id="request-demo"
            name="demoRequest"
            onChange={handleCheckboxChange}
          />
        </div>

        <div>
          <CheckboxInput
            label="Receive Updates User Consent"
            id="receive-updates"
            name="userConsent"
            onChange={handleCheckboxChange}
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
