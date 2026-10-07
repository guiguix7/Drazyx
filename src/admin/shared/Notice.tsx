export function Notice({ kind, children }: { kind: 'error' | 'success' | 'info'; children: React.ReactNode }) {
  const cls =
    kind === 'error' ? 'border-red-500/50 bg-red-900/20 text-red-300'
    : kind === 'success' ? 'border-[#B84DFF]/50 bg-[#18131D] text-[#F2EDF5]'
    : 'border-[#18131D] bg-[#11101A] text-[#A99EAE]';
  return (
    <div role={kind === 'error' ? 'alert' : 'status'} className={`border rounded px-4 py-3 text-sm ${cls}`}>
      {children}
    </div>
  );
}
