"use client";

import { ComponentProps } from "react";

type RangeInputProps = ComponentProps<"input"> & {
  label: string;
  formatter?: string;
};

function RangeInput({ label, formatter, ...props }: RangeInputProps) {
  const value = Number(props.value);
  const maxValue = Number(props.max);

  const ratio = value / maxValue;
  const widthPercentage = value / (maxValue / 100);
  const marginLeft = value / (maxValue / 100) - ratio;

  return (
    <div className="flex flex-col">
      <label htmlFor={props.id} className="text-sm text-white sm:text-base">
        {label}
      </label>
      <div className="relative -mt-1">
        <div className="relative">
          <input
            className="range-input h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
            id="hybridPercentage"
            {...props}
          />
          <div
            className="absolute bottom-[6.5px] left-0 z-0 h-2 w-10 rounded-full bg-blue"
            style={{ width: `${widthPercentage}%` }}
          ></div>
        </div>
        <div className="tooltip-wrapper">
          <span
            className="range-input-tooltip text-xs"
            style={{ left: `${marginLeft}%` }}
          >
            {value}
            {formatter}
          </span>
        </div>
      </div>
      <div className="flex justify-between px-1 text-xs text-white">
        <p>
          {props.min}
          {formatter}
        </p>
        <p>
          {props.max}
          {formatter}
        </p>
      </div>
    </div>
  );
}

export default RangeInput;
