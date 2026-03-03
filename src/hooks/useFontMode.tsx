import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

type LogoFont = "unbounded" | "primetime";
type BodyFont = "instrument" | "worksans";

interface FontModeContextValue {
  logoFont: LogoFont;
  bodyFont: BodyFont;
  setLogoFont: (f: LogoFont) => void;
  setBodyFont: (f: BodyFont) => void;
}

const FontModeContext = createContext<FontModeContextValue>({
  logoFont: "unbounded",
  bodyFont: "instrument",
  setLogoFont: () => {},
  setBodyFont: () => {},
});

export const FontModeProvider = ({ children }: { children: ReactNode }) => {
  const [logoFont, setLogoFont] = useState<LogoFont>("unbounded");
  const [bodyFont, setBodyFont] = useState<BodyFont>("instrument");

  useEffect(() => {
    const body = document.body;
    body.classList.toggle("logo-primetime", logoFont === "primetime");
    body.classList.toggle("body-worksans", bodyFont === "worksans");
    // Legacy class for any remaining references
    body.classList.toggle("font-alt", logoFont === "primetime" && bodyFont === "worksans");
  }, [logoFont, bodyFont]);

  return (
    <FontModeContext.Provider value={{ logoFont, bodyFont, setLogoFont, setBodyFont }}>
      {children}
    </FontModeContext.Provider>
  );
};

export const useFontMode = () => useContext(FontModeContext);
