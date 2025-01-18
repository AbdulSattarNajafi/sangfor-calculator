import { cn } from '@/utils/helpers';
import { ComponentProps } from 'react';

type InputProps = ComponentProps<'input'> & {
  label: string;
  errorMessage?: string[];
  labelClassName?: string
};

function Input({label, labelClassName, errorMessage, ...props}: InputProps) {

  return (
    <div className='flex flex-col gap-1'>
      <div className='flex items-center gap-2'>
        <label className={cn('text-base inline-block', labelClassName)} htmlFor={props.id}>
          {label}
        </label>
        <p className='h-4 text-xs text-red-500'>{errorMessage}</p>
      </div>
      <input
        {...props}
        className='w-full rounded bg-gray-200 px-3 py-1.5 focus:outline-blue/70'
      />
      {/* <p className='h-4 text-sm leading-tight text-red-500'>{errorMessage}</p> */}
    </div>
  );
}

export default Input;
