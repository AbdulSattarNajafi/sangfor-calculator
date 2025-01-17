type BadgeProps = {
  label: string;
};

function Badge({ label }: BadgeProps) {
  return (
    <div className='border-b border-gray-300 mb-2.5 ps-3'>
      <div className='inline-block px-4 py-1 bg-blue rounded-t -mb-px'>
        <h3 className='text-base text-white font-bold uppercase'>{label}</h3>
      </div>
    </div>
  );
}

export default Badge;
