import { cn } from "@/utils/helpers";
import { ComponentProps } from "react";

type SelectProps = ComponentProps<"select"> & {
  label: string;
  isGrayColor: boolean;
  children: React.ReactNode;
};

function Select({ label, isGrayColor, ...props }: SelectProps) {
  return (
    <div className="mb-4 flex flex-col gap-1">
      <label htmlFor={props.id} className="text-sm text-white xl:text-base">
        {label}
      </label>
      <select
        className={cn(
          "w-full rounded bg-gray-200 px-3 py-1.5 leading-tight focus:outline-blue/70",
          isGrayColor && "text-gray-400",
        )}
        {...props}
      >
        <option value="" disabled>
          Please Select
        </option>
        {props.children}
      </select>
    </div>
  );
}

export default Select;
