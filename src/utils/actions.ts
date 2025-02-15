"use server";

import { contactSchema } from "./zodSchema";
import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";
import { UserInputDataType } from "./types";

const API_URL = "https://secure.p06.eloqua.com/API/REST/2.0/data/form/172";

export async function sendEmail(
  state: UserInputDataType,
  prevState: unknown,
  formData: FormData,
) {
  const submission = parseWithZod(formData, {
    schema: contactSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  // const data = Object.fromEntries(formData.entries());

  // const {
  //   firstName,
  //   email,
  //   phone,
  //   company,
  //   jobTitle,
  //   country,
  //   requestDemo,
  //   receiveUpdates,
  // } = data;

  // const payloadData = {
  //   first_name: data.firstName,
  //   email_address: data.email,
  //   business_phone: data.phone,
  //   company: data.company,
  //   job_title: data.jobTitle,
  //   country_region: data.country,
  //   user_consent: data.receiveUpdates === "on" ? true : false,
  //   landing_page_url: "https://calculator-test-sandy.vercel.app/",
  //   form_page_url: "https://calculator-test-sandy.vercel.app/",
  //   pdf_report_url: "https://calculator-test-sandy.vercel.app/",
  // };

  //   utm_source?: string;
  //   utm_medium?: string;
  //   utm_campaign?: string;
  //   utm_campaign_id?: string;
  //   utm_term?: string;
  //   utm_content?: string;
  //   gclid?: string;
  //   gBraid?: string;
  //   gdpr_checkbox?: boolean;

  // const payload = {
  //   type: "FormData",
  //   fieldValues: Object.entries(payloadData).map(([key, value], index) => ({
  //     type: "FieldValue",
  //     id: String(2436 + index),
  //     name: key,
  //     value: value || "",
  //   })),
  // };

  // const payloadData = {
  //   type: "FormData",
  //   fieldValues: [
  //     {
  //       type: "FieldValue",
  //       id: "2436",
  //       name: "first_name",
  //       value: "firstName",
  //     },
  //     {
  //       type: "FieldValue",
  //       id: "2437",
  //       name: "email_address",
  //       value: "john@example.com",
  //     },
  //     {
  //       type: "FieldValue",
  //       id: "2438",
  //       name: "business_phone",
  //       value: "+6282284488062",
  //     },
  //     { type: "FieldValue", id: "2439", name: "company", value: "company" },
  //     {
  //       type: "FieldValue",
  //       id: "2440",
  //       name: "job_title",
  //       value: "jobTitle",
  //     },
  //     {
  //       type: "FieldValue",
  //       id: "2441",
  //       name: "country_region",
  //       value: "country",
  //     },
  //     {
  //       type: "FieldValue",
  //       id: "2445",
  //       name: "lead_source",
  //       value: "SASE TCO ROI Calculator",
  //     },
  //     {
  //       type: "FieldValue",
  //       id: "2446",
  //       name: "marketing_campaign",
  //       value: "SASE TCO ROI Calculator Marketing Campaign",
  //     },
  //   ],
  // };

  const credentials = btoa(
    "SANGFORTECHNOLOGIES\\Drupal.Eloqua:SteveJobs$$$888M@cb00kProDEAT*latm1",
  );

  const payloadData = {
    type: "FormData",
    fieldValues: [
      {
        type: "FieldValue",
        id: "2436",
        name: "first_name",
        value: "firstName",
      },
      {
        type: "FieldValue",
        id: "2437",
        name: "email_address",
        value: "john@example.com",
      },
      {
        type: "FieldValue",
        id: "2438",
        name: "business_phone",
        value: "+6282284488062",
      },
      { type: "FieldValue", id: "2439", name: "company", value: "company" },
      {
        type: "FieldValue",
        id: "2440",
        name: "job_title",
        value: "jobTitle",
      },
      {
        type: "FieldValue",
        id: "2441",
        name: "country_region",
        value: "country",
      },
      {
        type: "FieldValue",
        id: "2445",
        name: "lead_source",
        value: "SASE TCO ROI Calculator",
      },
      {
        type: "FieldValue",
        id: "2446",
        name: "marketing_campaign",
        value: "SASE TCO ROI Calculator Marketing Campaign",
      },
    ],
  };

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Basic ${credentials}`,
    },
    body: JSON.stringify(payloadData),
  });

  if (!response.ok) {
    throw new Error(`Failed to submit form: ${response.statusText}`);
  }

  redirect("/report");
}
