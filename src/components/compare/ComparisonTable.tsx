import type { ComparisonRow } from '@/data/comparisons/types';

interface ComparisonTableProps {
  rows: ComparisonRow[];
  competitorName: string;
}

function CellContent({ value, note }: { value: string; note?: string }) {
  const isVerify = value.startsWith('{{VERIFY');

  const displayValue = isVerify ? (
    <span className="text-amber-600 font-medium text-xs bg-amber-50 border border-amber-200 rounded px-1.5 py-0.5 inline-block">
      {value}
    </span>
  ) : value === '✓' ? (
    <span className="text-green-600 font-bold text-lg leading-none">✓</span>
  ) : value === '✗' ? (
    <span className="text-red-400 font-bold text-lg leading-none">✗</span>
  ) : (
    <span className="font-medium text-gray-800">{value}</span>
  );

  return (
    <div className="space-y-1">
      {displayValue}
      {note && !note.startsWith('{{VERIFY') && (
        <p className="text-xs text-gray-500 leading-relaxed">{note}</p>
      )}
      {note && note.startsWith('{{VERIFY') && (
        <p className="text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded px-1.5 py-0.5 leading-relaxed">
          {note}
        </p>
      )}
    </div>
  );
}

export default function ComparisonTable({ rows, competitorName }: ComparisonTableProps) {
  return (
    <div className="w-full overflow-x-auto -mx-1 px-1">
      {/* Mobile: stacked cards */}
      <div className="block sm:hidden space-y-3">
        {rows.map((row, i) => (
          <div
            key={i}
            className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm"
          >
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
              <p className="font-semibold text-gray-900 text-sm">{row.dimension}</p>
            </div>
            <div className="grid grid-cols-2 divide-x divide-gray-200">
              <div className="px-4 py-3">
                <p className="text-xs font-semibold text-[#FF8C32] mb-1.5">CivDocs</p>
                <CellContent value={row.civdocs.value} note={row.civdocs.note} />
              </div>
              <div className="px-4 py-3">
                <p className="text-xs font-semibold text-gray-500 mb-1.5">{competitorName}</p>
                <CellContent value={row.competitor.value} note={row.competitor.note} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: full table */}
      <table className="hidden sm:table w-full border-collapse text-sm">
        <thead>
          <tr className="border-b-2 border-gray-200">
            <th
              scope="col"
              className="text-left py-3 pr-4 font-semibold text-gray-600 text-xs uppercase tracking-wide w-[40%]"
            >
              Feature / Dimension
            </th>
            <th
              scope="col"
              className="text-left py-3 px-4 font-semibold text-[#FF8C32] text-xs uppercase tracking-wide w-[30%]"
            >
              CivDocs
            </th>
            <th
              scope="col"
              className="text-left py-3 pl-4 font-semibold text-gray-500 text-xs uppercase tracking-wide w-[30%]"
            >
              {competitorName}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {rows.map((row, i) => (
            <tr key={i} className="hover:bg-gray-50/70 transition-colors">
              <td className="py-3 pr-4 font-medium text-gray-800 align-top">{row.dimension}</td>
              <td className="py-3 px-4 align-top">
                <CellContent value={row.civdocs.value} note={row.civdocs.note} />
              </td>
              <td className="py-3 pl-4 align-top">
                <CellContent value={row.competitor.value} note={row.competitor.note} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
