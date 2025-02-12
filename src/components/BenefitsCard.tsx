type BenefitsCardProps = {
  title: string;
  children: React.ReactNode;
};
function BenefitsCard({ title, children }: BenefitsCardProps) {
  return (
    <div className="flex flex-col items-center rounded border border-gray-500 bg-white p-2 leading-tight shadow-sm">
      <div className="py-2 text-center">
        <h4 className="mb-px font-semibold text-gray-500">{title}</h4>
        <h5 className="text-2xl font-bold text-green">{children}</h5>
      </div>
    </div>
  );
}

export default BenefitsCard;
