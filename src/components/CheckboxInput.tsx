import { ComponentProps } from "react";

type CheckboxInputProps = ComponentProps<"input"> & {
  label: string;
};

function CheckboxInput({ label, ...props }: CheckboxInputProps) {
  return (
    <div className="flex items-center gap-1.5">
      <label htmlFor={props.id} className="text-sm text-white">
        {label}
      </label>
      <div className="relative flex cursor-pointer items-center">
        <input
          type="checkbox"
          // checked
          className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-slate-300 shadow transition-all checked:border-green checked:bg-green hover:shadow-md"
          {...props}
        />
        <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-white opacity-0 peer-checked:opacity-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5"
            viewBox="0 0 20 20"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            ></path>
          </svg>
        </span>
      </div>
    </div>
  );
}

export default CheckboxInput;
