import { ComponentProps } from 'react';

type InputProps = ComponentProps<'input'> & {
  label: string;
  errorMessage?: string[];
};

function Input(props: InputProps) {
  const { label, id, type, name, defaultValue, errorMessage, placeholder } = props;

  return (
    <div className='flex flex-col gap-1'>
      <div className='flex items-center gap-2'>
        <label className='text-base inline-block' htmlFor={id}>
          {label}
        </label>
        <p className='h-4 text-xs text-red-500'>{errorMessage}</p>
      </div>
      <input
        id={id}
        type={type}
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className='w-full rounded bg-gray-200 px-3 py-1.5 focus:outline-blue/70'
      />
      {/* <p className='h-4 text-sm leading-tight text-red-500'>{errorMessage}</p> */}
    </div>
  );
}

export default Input;
