'use client';

import { useFormStatus } from 'react-dom';

type SubmitButtonProps = {
  label: string;
  loadingLabel: string;
};

function SubmitButton({ label, loadingLabel }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      type='submit'
      className='rounded bg-green text-white py-2 px-4 font-semibold transition-all duration-300 hover:bg-green/75'
    >
      {pending ? loadingLabel : label}
    </button>
  );
}

export default SubmitButton;
