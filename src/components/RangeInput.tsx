"use client";

import { ComponentProps } from "react";

type RangeInputProps = ComponentProps<"input"> & {
  label: string;
};

function RangeInput({ label, ...props }: RangeInputProps) {
  const value = Number(props.value);
  const maxValue = Number(props.max);

  const ratio = value / maxValue;
  const marginLeft = value / (maxValue / 100) - ratio;

  return (
    <div className="relative flex flex-col">
      <label htmlFor={props.id} className="text-white">
        {label}
      </label>
      <div className="relative -mt-1">
        <input
          className="range-input h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
          id="hybridPercentage"
          {...props}
        />
        <div className="tooltip-wrapper">
          <span
            className="range-input-tooltip text-xs"
            style={{ left: `${marginLeft}%` }}
          >
            {value}
          </span>
        </div>
      </div>
      <div className="flex justify-between px-1 text-xs text-white">
        <p>{props.min}</p>
        <p>{props.max}</p>
      </div>
    </div>
  );
}

export default RangeInput;
