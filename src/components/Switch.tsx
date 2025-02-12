import { ComponentProps } from "react";

type SwitchProps = ComponentProps<"input"> & {
  label: string;
};

function Switch({ label, ...props }: SwitchProps) {
  return (
    <div className="flex items-center">
      <p className="me-4 text-sm text-white">{label}</p>
      <label className="relative inline-flex cursor-pointer items-center">
        <input {...props} type="checkbox" className="peer sr-only" />
        <label htmlFor="switch" className="hidden"></label>
        <div className="peer-focus:ring-green-300 peer h-5 w-[36px] rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
      </label>
    </div>
  );
}

export default Switch;
