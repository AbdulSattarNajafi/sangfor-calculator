"use server";

import { contactSchema } from "./zodSchema";
import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";
import { ScsDataType } from "./types";

const API_URL = "https://secure.p06.eloqua.com/API/REST/2.0/data/form/172";

export async function sendEmail(
  scs: ScsDataType | null,
  prevState: unknown,
  formData: FormData,
) {
  const submission = parseWithZod(formData, {
    schema: contactSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const data = Object.fromEntries(formData.entries());

  const {
    firstName,
    email,
    phone,
    company,
    jobTitle,
    country,
    requestDemo,
    receiveUpdates,
  } = data;

  const landingPageUrl = "";
  const formPageUrl = "";
  const pdfReportURL = "";

  const demoRequest = requestDemo === "on" ? true : false;
  const receiveUpdate = receiveUpdates === "on" ? true : false;

  const credentials = btoa(
    "SANGFORTECHNOLOGIES\\Drupal.Eloqua:SteveJobs$$$888M@cb00kProDEAT*latm1",
  );

  const payloadData = {
    type: "FormData",
    fieldValues: [
      { type: "FieldValue", id: "2436", name: "first_name", value: firstName },
      { type: "FieldValue", id: "2437", name: "email_address", value: email },
      { type: "FieldValue", id: "2438", name: "business_phone", value: phone },
      { type: "FieldValue", id: "2439", name: "company", value: company },
      { type: "FieldValue", id: "2440", name: "job_title", value: jobTitle },
      {
        type: "FieldValue",
        id: "2441",
        name: "country_region",
        value: country,
      },
      {
        type: "FieldValue",
        id: "2442",
        name: "Do you want to Request a Demo for Sangfor SASE?",
        value: demoRequest,
      },
      {
        type: "FieldValue",
        id: "2444",
        name: "user_consent",
        value: receiveUpdate,
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
        value: "SASE TCO ROI CalculatorMarketing Campaign",
      },
      {
        type: "FieldValue",
        id: "2447",
        name: "landing_page_url",
        value: landingPageUrl,
      },
      {
        type: "FieldValue",
        id: "2448",
        name: "form_page_url",
        value: formPageUrl,
      },
      {
        type: "FieldValue",
        id: "2459",
        name: "pdf_report_url",
        value: pdfReportURL,
      },
      {
        type: "FieldValue",
        id: "2449",
        name: "utm_source",
        value: scs?.default.utm.value.utm_source,
      },
      {
        type: "FieldValue",
        id: "2450",
        name: "utm_medium",
        value: scs?.default.utm.value.utm_medium,
      },
      {
        type: "FieldValue",
        id: "2451",
        name: "utm_campaign",
        value: scs?.default.utm.value.utm_campaign,
      },
      {
        type: "FieldValue",
        id: "2452",
        name: "utm_campaign_id",
        value: scs?.default.utm.value.utm_id,
      },
      {
        type: "FieldValue",
        id: "2453",
        name: "utm_term",
        value: scs?.default.utm.value.utm_term,
      },
      {
        type: "FieldValue",
        id: "2454",
        name: "utm_content",
        value: scs?.default.utm.value.utm_content,
      },
      {
        type: "FieldValue",
        id: "2455",
        name: "gclid",
        value: scs?.default.utm.value.gclid,
      },
      {
        type: "FieldValue",
        id: "2456",
        name: "gBraid",
        value: scs?.default.utm.value.gBraid,
      },
      {
        type: "FieldValue",
        id: "2457",
        name: "gdpr_checkbox",
        value: scs?.default.utm.value.gdpr_checkbox,
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
