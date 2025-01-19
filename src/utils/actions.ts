"use server";

import { redirect } from "next/navigation";

export async function sendEmail(formData: FormData) {
  console.log(formData);

  // 1- Store the Input Data in user device

  // 2- Send Email

  // 3- Redirect the user
  redirect("/report");
}
