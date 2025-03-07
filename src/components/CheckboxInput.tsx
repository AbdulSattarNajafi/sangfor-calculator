import { ComponentProps } from "react";

type CheckboxInputProps = ComponentProps<"input"> & {
  label: string;
  linkText?: string;
};

function CheckboxInput({ label, linkText, ...props }: CheckboxInputProps) {
  return (
    <div className="flex items-start">
      <span className="relative me-2 inline-flex flex-shrink-0 translate-y-0.5 cursor-pointer items-center">
        <input
          type="checkbox"
          className="peer h-4 w-4 cursor-pointer appearance-none rounded border border-white shadow transition-all checked:border-blue checked:bg-blue hover:shadow-md"
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
      </span>
      <label htmlFor={props.id} className="flex-1 text-sm text-white">
        {label}{" "}
        {linkText && (
          <a
            className="text-blue underline"
            href="https://www.sangfor.com/support/services-policy/privacy-policy"
            target="_blacnk"
          >
            {linkText}
          </a>
        )}
        {linkText && "!"}
      </label>
    </div>
  );
}

export default CheckboxInput;
