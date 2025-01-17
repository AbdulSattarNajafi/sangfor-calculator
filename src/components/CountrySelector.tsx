'use client';

import { HiChevronDown, HiCheck } from 'react-icons/hi';
import clsx from 'clsx';
import { useState } from 'react';
import { ICountry } from 'country-state-city';

import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/react';

type CountrySelectorProps = {
  data: ICountry[];
  selected: ICountry | null;
  onChange: (countryCode: string) => void;
};

function CountrySelector({ data, selected, onChange }: CountrySelectorProps) {
  const [query, setQuery] = useState('');

  const filteredCountries =
    query === ''
      ? data
      : data.filter((country) => {
          return country.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <div className='w-full'>
      <Combobox
        value={selected}
        onChange={(county: ICountry) => onChange(county.isoCode)}
        onClose={() => setQuery('')}
      >
        <div className='relative'>
          <ComboboxInput
            className={clsx(
              'w-full rounded border-none bg-gray-200 py-1.5 pr-8 pl-3 text-sm/6 text-black',
              'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
            )}
            placeholder='Country'
            displayValue={(country: ICountry) => country?.name}
            onChange={(event) => setQuery(event.target.value)}
          />
          <ComboboxButton className='group absolute inset-y-0 right-0 px-2.5 z-30'>
            <HiChevronDown className='size-4 fill-black/70 group-data-[hover]:fill-black' />
          </ComboboxButton>
        </div>

        <ComboboxOptions
          anchor='bottom'
          transition
          className={clsx(
            'w-[var(--input-width)] rounded border border-gray-200 bg-gray-200 p-1 [--anchor-gap:var(--spacing-1)] empty:invisible',
            'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0'
          )}
        >
          {filteredCountries.map((country) => (
            <ComboboxOption
              key={country.name}
              value={country}
              className='group flex cursor-default items-center gap-2 rounded py-1.5 px-3 select-none data-[focus]:bg-white/10 '
            >
              <HiCheck className='invisible size-4 fill-white group-data-[selected]:visible' />
              <div className='text-sm/6 text-black'>{country.name}</div>
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Combobox>
    </div>
  );
}

export default CountrySelector;
