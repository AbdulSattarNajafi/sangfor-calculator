import { HiOutlineInformationCircle } from "react-icons/hi";
import { ComponentProps } from "react";

type InputProps = ComponentProps<"input"> & {
  label: string;
  errorMessage?: string[] | string;
  hasInfo?: boolean;
  infoText?: string;
};

function Input({
  label,
  errorMessage,
  hasInfo,
  infoText,
  ...props
}: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <label
          className="flex items-center gap-1 text-sm text-white xl:text-base"
          htmlFor={props.id}
        >
          <span className="inline-block">{label}</span>
          {hasInfo && (
            <span className="group relative -mb-px inline-block">
              <HiOutlineInformationCircle className="cursor-pointer text-lg" />

              <span className="info-tooltip invisible absolute -left-40 bottom-full z-30 block w-[240px] -translate-y-6 rounded-md bg-white p-2 text-xs leading-tight text-black opacity-0 shadow-md transition-all duration-300 group-hover:visible group-hover:-translate-y-2 group-hover:opacity-100">
                {infoText}
              </span>
            </span>
          )}
        </label>
      </div>
      <input
        {...props}
        className="w-full rounded bg-gray-200 px-3 py-1.5 focus:outline-blue/70"
      />
      <p className="h-4 text-sm leading-tight text-red-500">{errorMessage}</p>
    </div>
  );
}

export default Input;
