"use server";

import { MarketingDataTypes } from "@/utils/types";
import { contactSchema } from "@/utils/zodSchema";
import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";

type PayloadType = {
  scs: MarketingDataTypes;
  id: string;
};

export async function createEloquaEmail(
  payload: PayloadType,
  prevState: unknown,
  formData: FormData,
) {
  const submission = parseWithZod(formData, {
    schema: contactSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const { scs } = payload;
  const API_URL = "https://secure.p06.eloqua.com/API/REST/2.0/data/form/172";

  const data = Object.fromEntries(formData.entries());

  const {
    firstName,
    emailAddress,
    businessPhone,
    companyName,
    jobTitle,
    countryName,
    demoRequest,
    userConsent,
  } = data;

  // const formPageUrl = `https://www.sangfor.com/en/sase-tco-roi-calculator/${id}`;
  const formPageUrl = "";
  const pdfReportURL = "";

  const requestDemo = demoRequest === "on" ? true : false;
  const receiveUpdate = userConsent === "on" ? true : false;

  const credentials = btoa(
    "SANGFORTECHNOLOGIES\\Drupal.Eloqua:SteveJobs$$$888M@cb00kProDEAT*latm1",
  );

  const payloadData = {
    type: "FormData",
    fieldValues: [
      { type: "FieldValue", id: "2436", name: "first_name", value: firstName },
      {
        type: "FieldValue",
        id: "2437",
        name: "email_address",
        value: emailAddress,
      },
      {
        type: "FieldValue",
        id: "2438",
        name: "business_phone",
        value: businessPhone,
      },
      { type: "FieldValue", id: "2439", name: "company", value: companyName },
      { type: "FieldValue", id: "2440", name: "job_title", value: jobTitle },
      {
        type: "FieldValue",
        id: "2441",
        name: "country_region",
        value: countryName,
      },
      {
        type: "FieldValue",
        id: "2442",
        name: "Do you want to Request a Demo for Sangfor SASE?",
        value: requestDemo,
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
        value: scs.landing_url,
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
        value: scs.utm_source,
      },
      {
        type: "FieldValue",
        id: "2450",
        name: "utm_medium",
        value: scs.utm_medium,
      },
      {
        type: "FieldValue",
        id: "2451",
        name: "utm_campaign",
        value: scs.utm_campaign,
      },
      {
        type: "FieldValue",
        id: "2452",
        name: "utm_campaign_id",
        value: scs.utm_id,
      },
      {
        type: "FieldValue",
        id: "2453",
        name: "utm_term",
        value: scs.utm_term,
      },
      {
        type: "FieldValue",
        id: "2454",
        name: "utm_content",
        value: scs.utm_content,
      },
      {
        type: "FieldValue",
        id: "2455",
        name: "gclid",
        value: scs.gclid,
      },
      {
        type: "FieldValue",
        id: "2456",
        name: "gBraid",
        value: scs.gBraid,
      },
      {
        type: "FieldValue",
        id: "2457",
        name: "gdpr_checkbox",
        value: scs.gdpr_checkbox,
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
