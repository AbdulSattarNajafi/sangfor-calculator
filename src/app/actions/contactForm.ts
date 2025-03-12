"use server";

import { MarketingDataTypes, UserInputDataType } from "@/utils/types";
import { contactSchema } from "@/utils/zodSchema";
import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";

type PayloadType = {
  scs: MarketingDataTypes;
  state: UserInputDataType;
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

  const { scs, state } = payload;

  const ELOQOA_API_URL =
    "https://secure.p06.eloqua.com/API/REST/2.0/data/form/172";

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

  const {
    utm_source,
    utm_medium,
    utm_campaign,
    utm_id,
    utm_term,
    utm_content,
    gBraid,
    gclid,
    gdpr_checkbox,
  } = scs;

  const {
    userId,
    region,
    totalEmployees,
    locations,
    hostingSites,
    hybridPercentage,
    countries,
    acceleration,
  } = state;

  const pdf_report_url = `https://www.sangfor.com/cybersecurity/products/sangfor-access-sase/sase-roi-calculator-submission-success-download-report?report=${userId}`;
  const lead_source = "LinkedIn Ads";
  const marketing_campaign = "Q1 Growth Campaign";
  const landing_page_url = "https://www.sangfor.com/";
  const form_page_url = "https://www.sangfor.com/";

  const requestDemo = demoRequest === "on" ? true : false;
  const receiveUpdate = userConsent === "on" ? true : false;

  const credentials = btoa(
    "SANGFORTECHNOLOGIES\\Drupal.Eloqua:SteveJobs$$$888M@cb00kProDEAT*latm1",
  );

  const eloqoaData = {
    type: "FormData",
    fieldValues: [
      {
        type: "FieldValue",
        id: "2496",
        name: "region",
        value: region,
      },

      {
        type: "FieldValue",
        id: "2497",
        name: "total_number_of_employees",
        value: totalEmployees,
      },

      {
        type: "FieldValue",
        id: "2498",
        name: "number_of_locations",
        value: locations,
      },

      {
        type: "FieldValue",
        id: "2499",
        name: "number_of_application_hosting_sites",
        value: hostingSites,
      },

      {
        type: "FieldValue",
        id: "2500",
        name: "percentage_of_remote_hybrid_employees",
        value: hybridPercentage,
      },

      {
        type: "FieldValue",
        id: "2501",
        name: "number_of_countries_regions",
        value: countries,
      },

      {
        type: "FieldValue",
        id: "2502",
        name: "replace_mpls_with_sase",
        value: acceleration === 1 ? true : false,
      },

      {
        type: "FieldValue",
        id: "2503",
        name: "sase_report_id",
        value: userId,
      },

      {
        type: "FieldValue",
        id: "2436",
        name: "first_name",
        value: firstName,
      },

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

      {
        type: "FieldValue",
        id: "2439",
        name: "company",
        value: companyName,
      },

      {
        type: "FieldValue",
        id: "2440",
        name: "job_title",
        value: jobTitle,
      },

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
        value: "SASE TCO ROI Calculator Marketing Campaign",
      },

      {
        type: "FieldValue",
        id: "2447",
        name: "landing_page_url",
        value: landing_page_url,
      },

      {
        type: "FieldValue",
        id: "2448",
        name: "form_page_url",
        value: "",
      },

      {
        type: "FieldValue",
        id: "2449",
        name: "utm_source",
        value: utm_source,
      },

      {
        type: "FieldValue",
        id: "2450",
        name: "utm_medium",
        value: utm_medium,
      },

      {
        type: "FieldValue",
        id: "2451",
        name: "utm_campaign",
        value: utm_campaign,
      },

      {
        type: "FieldValue",
        id: "2452",
        name: "utm_campaign_id",
        value: utm_id,
      },

      {
        type: "FieldValue",
        id: "2453",
        name: "utm_term",
        value: utm_term,
      },

      {
        type: "FieldValue",
        id: "2454",
        name: "utm_content",
        value: utm_content,
      },

      {
        type: "FieldValue",
        id: "2455",
        name: "gclid",
        value: gclid,
      },
      {
        type: "FieldValue",
        id: "2456",
        name: "gBraid",
        value: gBraid,
      },

      {
        type: "FieldValue",
        id: "2457",
        name: "gdpr_checkbox",
        value: gdpr_checkbox,
      },
    ],
  };

  const userData = {
    userId,
    firstName,
    emailAddress,
    businessPhone,
    companyName,
    jobTitle,
    submissionDate: new Date().toISOString().slice(0, 19),
    countryName,
    userConsent: receiveUpdate,
    demoRequest: requestDemo,
    region,
    totalEmployees,
    locations,
    hostingSites,
    hybridPercentage,
    countries,
    acceleration: acceleration === 1 ? true : false,
    lead_source,
    marketing_campaign,
    landing_page_url,
    form_page_url,
    pdf_report_url,
    utm_source,
    utm_medium,
    utm_campaign,
    utm_id,
    utm_term,
    utm_content,
    gBraid,
    gclid,
    gdpr_checkbox,
  };

  const API_URL =
    "https://event.sangfor.com/sase-roi-calculator/public/api/customer";
  const response2 = await fetch(`${API_URL}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response2.ok) {
    throw new Error("Failed to add customer");
  }

  await new Promise((resolve) => setTimeout(resolve, 500));

  const response = await fetch(ELOQOA_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Basic ${credentials}`,
    },
    body: JSON.stringify(eloqoaData),
  });

  if (!response.ok) {
    throw new Error(`Failed to submit form: ${response.statusText}`);
  }

  // redirect(`/redirect/${userId}`);
  redirect(
    `https://www.sangfor.com/cybersecurity/products/sangfor-access-sase/sase-roi-calculator-submission-success-download-report?result=${userId}`,
  );
}
