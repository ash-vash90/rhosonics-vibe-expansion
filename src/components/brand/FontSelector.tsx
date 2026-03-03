import { useFontMode } from "@/hooks/useFontMode";

export const FontSelector = () => {
  const { logoFont, bodyFont, setLogoFont, setBodyFont } = useFontMode();

  return (
    <div className="hidden xl:flex fixed top-4 right-4 z-50 gap-3 items-center bg-rho-obsidian/90 backdrop-blur-sm border border-slate-800 rounded-lg px-4 py-2 shadow-lg">
      <div className="flex items-center gap-2">
        <span className="font-data text-[10px] uppercase tracking-wider text-slate-500">Logo</span>
        <select
          value={logoFont}
          onChange={(e) => setLogoFont(e.target.value as "unbounded" | "primetime")}
          className="bg-transparent border border-slate-700 text-slate-300 text-xs font-data uppercase tracking-wider rounded-md px-2 py-1.5 cursor-pointer hover:border-slate-500 transition-colors focus:outline-none focus:border-primary"
        >
          <option value="unbounded" className="bg-rho-obsidian">Unbounded</option>
          <option value="primetime" className="bg-rho-obsidian">Primetime</option>
        </select>
      </div>
      <div className="w-px h-5 bg-slate-700" />
      <div className="flex items-center gap-2">
        <span className="font-data text-[10px] uppercase tracking-wider text-slate-500">Body</span>
        <select
          value={bodyFont}
          onChange={(e) => setBodyFont(e.target.value as "instrument" | "worksans")}
          className="bg-transparent border border-slate-700 text-slate-300 text-xs font-data uppercase tracking-wider rounded-md px-2 py-1.5 cursor-pointer hover:border-slate-500 transition-colors focus:outline-none focus:border-primary"
        >
          <option value="instrument" className="bg-rho-obsidian">Instrument Sans</option>
          <option value="worksans" className="bg-rho-obsidian">Work Sans</option>
        </select>
      </div>
    </div>
  );
};

export default FontSelector;
