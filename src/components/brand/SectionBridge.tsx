interface SectionBridgeProps {
  number: string;
  label: string;
  bridge?: string;
}

export const SectionBridge = ({ number, label, bridge }: SectionBridgeProps) => {
  return (
    <div className="py-16 my-8 border-t border-slate-200">
      <div className="flex items-baseline gap-3">
        <span className="label-tech text-primary">{number}</span>
        <span className="text-slate-400">/</span>
        <span className="label-tech text-slate-600">{label}</span>
      </div>
      {bridge && (
        <p className="mt-2 text-sm text-slate-500 font-ui">{bridge}</p>
      )}
    </div>
  );
};

export default SectionBridge;
