"use client";

import { HiChevronDown, HiCheck } from "react-icons/hi";
import clsx from "clsx";
import { useState } from "react";
import { IState } from "country-state-city";

import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";

type StateSelectorProps = {
  data: IState[];
  selected: IState | null;
  onChange: (state: IState) => void;
};

function StateSelector({ data, selected, onChange }: StateSelectorProps) {
  const [query, setQuery] = useState("");

  const filteredStates =
    query === ""
      ? data
      : data.filter((state) => {
          return state.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <div className="w-full">
      <Combobox
        value={selected}
        onChange={(value: IState) => onChange(value)}
        onClose={() => setQuery("")}
      >
        <div className="relative">
          <ComboboxInput
            className={clsx(
              "w-full rounded border-none bg-gray-200 py-1.5 pl-3 pr-8 text-sm/6 text-black",
              "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
            )}
            displayValue={(country: IState) => country?.name}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Province"
          />
          <ComboboxButton className="group absolute inset-y-0 right-0 z-30 px-2.5">
            <HiChevronDown className="size-4 fill-black/70 group-data-[hover]:fill-black" />
          </ComboboxButton>
        </div>

        <ComboboxOptions
          anchor="bottom"
          transition
          className={clsx(
            "w-[var(--input-width)] rounded border border-gray-200 bg-gray-200 p-1 [--anchor-gap:var(--spacing-1)] empty:invisible",
            "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0",
          )}
        >
          {filteredStates.map((state) => (
            <ComboboxOption
              key={state.name}
              value={state}
              className="group flex cursor-pointer select-none items-center gap-2 rounded px-3 py-1.5 data-[focus]:bg-white/50"
            >
              <HiCheck className="invisible size-4 fill-black group-data-[selected]:visible" />
              <div className="text-sm/6 text-black">{state.name}</div>
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Combobox>
    </div>
  );
}

export default StateSelector;
