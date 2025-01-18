type BadgeProps = {
  label: string;
};

function Badge({ label }: BadgeProps) {
  return (
    <div className="mb-2.5 border-b border-gray-300">
      <div className="-mb-px inline-block rounded-t bg-blue px-4 py-1">
        <h3 className="text-base font-bold uppercase text-white">{label}</h3>
      </div>
    </div>
  );
}

export default Badge;
