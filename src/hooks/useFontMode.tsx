import { type ReactNode } from "react";

// Fonts are locked: Primetime (logo) + Instrument Sans (body). Hook kept as a
// no-op stub so existing consumers compile without churn.
type LogoFont = "primetime";
type BodyFont = "instrument";

interface FontModeContextValue {
  logoFont: LogoFont;
  bodyFont: BodyFont;
  setLogoFont: (f: LogoFont) => void;
  setBodyFont: (f: BodyFont) => void;
}

const noop = () => {};

const value: FontModeContextValue = {
  logoFont: "primetime",
  bodyFont: "instrument",
  setLogoFont: noop,
  setBodyFont: noop,
};

export const FontModeProvider = ({ children }: { children: ReactNode }) => <>{children}</>;

export const useFontMode = () => value;
