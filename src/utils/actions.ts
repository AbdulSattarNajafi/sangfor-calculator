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

  // const data = Object.fromEntries(formData.entries());
  // const { firstName, email, phone } = data;

  console.log(formData, state);

  // 1- Store the Input Data in user device

  // 2- Send Email

  // 3- Redirect the user
  redirect("/report");
}

// export async function submitForm(formData: FormData) {
//   const apiUrl = "https://s757079.t.eloqua.com/e/f2";

//   try {
//     const response = await fetch(apiUrl, {
//       method: "POST",
//       body: formData, // Send form data directly
//     });

//     if (!response.ok) {
//       throw new Error(`Failed to submit form: ${response.statusText}`);
//     }

//     return { success: true, message: "Form submitted successfully!" };
//   } catch (error) {
//     return { success: false, message: error.message };
//   }
// }
