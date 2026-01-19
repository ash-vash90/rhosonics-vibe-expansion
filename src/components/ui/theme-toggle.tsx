import { Moon, Sun } from "lucide-react";

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
  className?: string;
}

export const ThemeToggle = ({ isDark, onToggle, className = "" }: ThemeToggleProps) => {
  return (
    <button
      onClick={onToggle}
      className={`
        relative w-16 h-8 rounded-full p-1 transition-all duration-300
        ${isDark 
          ? 'bg-slate-700 border border-slate-600' 
          : 'bg-slate-200 border border-slate-300'
        }
        ${className}
      `}
      aria-label="Toggle theme"
    >
      {/* Track icons */}
      <div className="absolute inset-0 flex items-center justify-between px-2">
        <Moon className={`w-3.5 h-3.5 transition-opacity ${isDark ? 'text-primary opacity-100' : 'text-slate-400 opacity-50'}`} />
        <Sun className={`w-3.5 h-3.5 transition-opacity ${isDark ? 'text-slate-500 opacity-50' : 'text-amber-500 opacity-100'}`} />
      </div>
      
      {/* Sliding knob */}
      <div
        className={`
          relative w-6 h-6 rounded-full shadow-lg transition-all duration-300
          ${isDark 
            ? 'bg-slate-900 translate-x-0' 
            : 'bg-white translate-x-8'
          }
        `}
      />
    </button>
  );
};
