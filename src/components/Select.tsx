import { cn } from '@/utils/helpers';
import { ComponentProps } from 'react';

type SelectProps = ComponentProps<'select'> & {
  label: string;
  children: React.ReactNode;
  labelClassName?: string
};

function Select({label, labelClassName, ...props}: SelectProps) {

  return (
    <div className='flex flex-col gap-1'>
      <label htmlFor={props.id} className={cn('inline-block', labelClassName)}>{label}</label>
      <select
        className='w-full rounded bg-gray-200 px-3 py-2 focus:outline-blue/70'
        {...props}
      >
        {props.children}
      </select>
    </div>
  )
}

export default Select