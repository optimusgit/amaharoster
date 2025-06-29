export default function LegendRow({
  label,
  color,
}: {
  label: string;
  color: string;
}) {
  return (
     <div className="flex items-center justify-between w-full min-w-[140px]">
      <span className="text-gray-700 pl-[2px]">{label}</span>
      <span className={`w-5 h-3 rounded-full ${color}`}></span>
    </div>
  );
}
