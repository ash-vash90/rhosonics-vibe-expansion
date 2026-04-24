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
  logoFont: "primetime",
  bodyFont: "instrument",
  setLogoFont: () => {},
  setBodyFont: () => {},
});

export const FontModeProvider = ({ children }: { children: ReactNode }) => {
  const [logoFont, setLogoFont] = useState<LogoFont>("primetime");
  const [bodyFont, setBodyFont] = useState<BodyFont>("instrument");

  useEffect(() => {
    const body = document.body;
    body.classList.toggle("logo-unbounded", logoFont === "unbounded");
    body.classList.toggle("body-worksans", bodyFont === "worksans");
  }, [logoFont, bodyFont]);

  return (
    <FontModeContext.Provider value={{ logoFont, bodyFont, setLogoFont, setBodyFont }}>
      {children}
    </FontModeContext.Provider>
  );
};

export const useFontMode = () => useContext(FontModeContext);
