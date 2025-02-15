import { ComponentProps } from "react";

type SelectProps = ComponentProps<"select"> & {
  label: string;
  children: React.ReactNode;
};

function Select({ label, ...props }: SelectProps) {
  return (
    <div className="mb-4 flex flex-col gap-1">
      <label htmlFor={props.id} className="text-white">
        {label}
      </label>
      <select
        className="w-full rounded bg-gray-200 px-3 py-2 focus:outline-blue/70"
        {...props}
      >
        {props.children}
      </select>
    </div>
  );
}

export default Select;
