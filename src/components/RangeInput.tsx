"use client";

import { cn } from "@/utils/helpers";
import { ComponentProps } from "react";
import { HiOutlineInformationCircle } from "react-icons/hi";

type RangeInputProps = ComponentProps<"input"> & {
  label: string;
  formatter?: string;
  hasInfo?: boolean;
  infoText?: string;
  tooltipCenter?: boolean;
};

function RangeInput({
  label,
  formatter,
  hasInfo,
  infoText,
  tooltipCenter,
  ...props
}: RangeInputProps) {
  const value = Number(props.value);
  const maxValue = Number(props.max);

  const ratio = value / maxValue;
  const widthPercentage = value / (maxValue / 100);
  const marginLeft = value / (maxValue / 100) - ratio;

  return (
    <div className="flex flex-col">
      <label
        className="flex items-center gap-1 text-sm text-white xl:text-base"
        htmlFor={props.id}
      >
        <span className="inline-block">{label}</span>
        {hasInfo && (
          <span className="group relative -mb-px inline-block">
            <HiOutlineInformationCircle className="cursor-pointer text-lg" />

            <span
              className={cn(
                "invisible absolute bottom-full z-30 block -translate-y-6 rounded-md bg-white p-2 text-xs leading-tight text-black opacity-0 shadow-md transition-all duration-300 group-hover:visible group-hover:-translate-y-2 group-hover:opacity-100",
                tooltipCenter
                  ? "tooltip-center left-1/2 w-[200px] -translate-x-1/2"
                  : "info-tooltip -left-40 w-[240px]",
              )}
            >
              {infoText}
            </span>
          </span>
        )}
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
