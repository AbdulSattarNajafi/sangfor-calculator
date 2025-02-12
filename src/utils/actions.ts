"use server";

import { redirect } from "next/navigation";
import { contactSchema } from "./zodSchema";
import { parseWithZod } from "@conform-to/zod";
import { UserInputDataType } from "./types";

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

  const data = Object.fromEntries(formData.entries());

  const payloadData = {
    first_name: data.firstName,
    email_address: data.email,
    business_phone: data.phone,
    company: data.company,
    job_title: data.jobTitle,
    country_region: data.country,
    user_consent: data.receiveUpdates === "on" ? true : false,
  };

  console.log(payloadData, "----------Payload Data");

  //  const  payloadDatas  = {
  //   landing_page_url: string;
  //   form_page_url: string;
  //   pdf_report_url: string;
  //   utm_source?: string;
  //   utm_medium?: string;
  //   utm_campaign?: string;
  //   utm_campaign_id?: string;
  //   utm_term?: string;
  //   utm_content?: string;
  //   gclid?: string;
  //   gBraid?: string;
  //   gdpr_checkbox?: boolean;
  // }

  // const API_URL = "https://secure.p06.eloqua.com/API/REST/2.0/data/form/172";

  // const payload = {
  //   type: "FormData",
  //   fieldValues: Object.entries(data).map(([key, value], index) => ({
  //     type: "FieldValue",
  //     id: String(2436 + index), // Assuming IDs are sequential; update as needed
  //     name: key,
  //     value: value || "",
  //   })),
  // };

  // const authToken = Buffer.from(
  //   "SANGFORTECHNOLOGIES\\Mario.Robertus:StevEJobs$$207Apple!phone3",
  // ).toString("base64"); // Replace with actual credentials

  // try {
  //   const response = await fetch(API_URL, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "*/*",
  //       Authorization: `Basic ${authToken}`,
  //     },
  //     body: JSON.stringify(payload),
  //   });

  //   if (!response.ok) {
  //     throw new Error(`Failed to submit form: ${response.statusText}`);
  //   }

  //   return { success: true, message: "Form submitted successfully!" };
  // } catch (error) {
  //   console.error("Error submitting form:", error);
  //   return { success: false, message: "Failed to submit form." };
  // }

  redirect("/report");
}
