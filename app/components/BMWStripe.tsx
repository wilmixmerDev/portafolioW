type BadgeProps = { className?: string };
type TopBorderProps = { dim?: boolean };

export function BMWBadge({ className = "flex h-5 w-7" }: BadgeProps) {
  return (
    <span className={className}>
      <span className="h-full w-1/3 -skew-x-20 bg-[#00A2E8]" />
      <span className="-ml-0.5 h-full w-1/3 -skew-x-20 bg-[#10069F]" />
      <span className="-ml-0.5 h-full w-1/3 -skew-x-20 bg-[#E32118]" />
    </span>
  );
}

export function BMWTopBorder({ dim }: TopBorderProps) {
  return (
    <div className={`absolute left-0 top-0 flex h-[2px] w-full${dim ? " opacity-70" : ""}`}>
      <div className="h-full w-1/3 bg-[#00A2E8]" />
      <div className="h-full w-1/3 bg-[#10069F]" />
      <div className="h-full w-1/3 bg-[#E32118]" />
    </div>
  );
}
