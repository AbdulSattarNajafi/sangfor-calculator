"use client";

import { useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";

type RecaptchaProps = {
  onVerify: (token: string | null) => void;
  onExpire: () => void;
};

export default function Recaptcha({ onVerify, onExpire }: RecaptchaProps) {
  const recaptchaRef = useRef<ReCAPTCHA | null>(null);
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  if (!siteKey) {
    return <p>Site key not found!</p>;
  }

  return (
    <ReCAPTCHA
      size="normal"
      theme="light"
      ref={recaptchaRef}
      sitekey={siteKey}
      onChange={onVerify}
      onExpired={onExpire}
    />
  );
}
