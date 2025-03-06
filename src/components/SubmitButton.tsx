"use client";

import { useFormStatus } from "react-dom";

type SubmitButtonProps = {
  label: string;
  loadingLabel: string;
  disabled?: boolean;
};

function SubmitButton({ label, loadingLabel, disabled }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending || disabled}
      type="submit"
      className="rounded bg-green px-4 py-2 font-semibold text-white transition-all duration-300 hover:bg-green/75 disabled:opacity-75 disabled:hover:bg-green"
    >
      {pending ? loadingLabel : label}
    </button>
  );
}

export default SubmitButton;
