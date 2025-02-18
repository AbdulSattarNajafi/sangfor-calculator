"use client";

import { HiChevronDown, HiCheck } from "react-icons/hi";
import clsx from "clsx";
import { useState } from "react";
import { ICountry } from "country-state-city";

import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";

type CountrySelectorProps = {
  data: ICountry[];
  selected: ICountry | null;
  onChange: (countryCode: string) => void;
  name?: string;
  errorMessage?: string[];
};

function CountrySelector({
  data,
  selected,
  onChange,
  name,
  errorMessage,
}: CountrySelectorProps) {
  const [query, setQuery] = useState("");

  const filteredCountries =
    query === ""
      ? data
      : data.filter((country) => {
          return country.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <div className="w-full">
      <Combobox
        value={selected}
        onChange={(county: ICountry) => {
          if (county) onChange(county.isoCode);
        }}
        onClose={() => setQuery("")}
      >
        <div className="flex flex-col gap-1">
          <label
            htmlFor="select-country"
            className="text-sm text-white xl:text-base"
          >
            Country / Region
          </label>
          <div className="relative">
            <ComboboxInput
              id="select-country"
              className={clsx(
                "w-full rounded border-none bg-gray-200 py-1.5 pl-3 pr-8 text-sm/6 text-black",
                "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
              )}
              name={name}
              placeholder="Country / Region"
              displayValue={(country: ICountry) => country?.name}
              onChange={(event) => setQuery(event.target.value)}
            />
            <ComboboxButton className="group absolute inset-y-0 right-0 z-30 px-2.5">
              <HiChevronDown className="size-4 fill-black/70 group-data-[hover]:fill-black" />
            </ComboboxButton>
          </div>
          <p className="h-4 text-sm leading-tight text-red-500">
            {!selected && errorMessage}
          </p>
        </div>

        <ComboboxOptions
          anchor="bottom"
          transition
          className={clsx(
            "w-[var(--input-width)] rounded border border-gray-200 bg-gray-200 p-1 [--anchor-gap:var(--spacing-1)] empty:invisible",
            "z-10 transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0",
          )}
        >
          {filteredCountries.map((country) => (
            <ComboboxOption
              key={country.name}
              value={country}
              className="group flex cursor-pointer select-none items-center gap-2 rounded px-3 py-1.5 data-[focus]:bg-white/50"
            >
              <HiCheck className="invisible size-4 fill-black group-data-[selected]:visible" />
              <div className="text-sm/6 text-black">{country.name}</div>
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Combobox>
    </div>
  );
}

export default CountrySelector;
