"use client";

import { useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";

export default function Recaptcha({
  onVerify,
}: {
  onVerify: (token: string | null) => void;
}) {
  const recaptchaRef = useRef<ReCAPTCHA | null>(null);
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  if (!siteKey) {
    return <p>Site key not found!</p>;
  }

  function handleReset() {
    if (recaptchaRef.current) {
      recaptchaRef.current.reset();
    }
  }

  return (
    <ReCAPTCHA
      size="normal"
      theme="light"
      ref={recaptchaRef}
      sitekey={siteKey}
      onChange={onVerify}
      onExpired={handleReset}
    />
  );
}
