interface SectionBridgeProps {
  number: string;
  label: string;
  bridge?: string;
}

export const SectionBridge = ({ number, label, bridge }: SectionBridgeProps) => {
  return (
    <div className="py-12 my-16 relative bg-background">
      {/* Top divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="flex items-center gap-4">
        <div className="w-2 h-2 rounded-full bg-primary" aria-hidden="true" />

        <span className="font-data text-sm uppercase tracking-widest text-primary font-medium">{number}</span>
        <div className="w-6 h-px bg-slate-300" aria-hidden="true" />
        <span className="font-data text-sm uppercase tracking-widest text-slate-500">{label}</span>
      </div>

      {bridge && (
        <p className="mt-4 text-xl text-slate-600 font-ui font-medium tracking-tight">{bridge}</p>
      )}

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
    </div>
  );
};

export default SectionBridge;
