type BenefitsCardProps = {
  title: string;
  children: React.ReactNode;
};
function BenefitsCard({ title, children }: BenefitsCardProps) {
  return (
    <div className="flex flex-col items-center rounded border border-gray-200 bg-white px-1 py-2 leading-tight shadow-sm">
      <div className="py-1 text-center sm:py-2">
        <h4 className="xs:text-sm mb-px text-xs font-semibold text-gray-500 sm:text-base">
          {title}
        </h4>
        <h5 className="xs:text-xl text-lg font-bold text-green sm:text-2xl">
          {children}
        </h5>
      </div>
    </div>
  );
}

export default BenefitsCard;
