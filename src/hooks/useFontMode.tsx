import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";

type FontMode = "default" | "alt";

interface FontModeContextValue {
  fontMode: FontMode;
  toggleFontMode: () => void;
}

const FontModeContext = createContext<FontModeContextValue>({
  fontMode: "default",
  toggleFontMode: () => {},
});

export const FontModeProvider = ({ children }: { children: ReactNode }) => {
  const [fontMode, setFontMode] = useState<FontMode>("default");

  const toggleFontMode = useCallback(() => {
    setFontMode((prev) => (prev === "default" ? "alt" : "default"));
  }, []);

  useEffect(() => {
    document.body.classList.toggle("font-alt", fontMode === "alt");
  }, [fontMode]);

  return (
    <FontModeContext.Provider value={{ fontMode, toggleFontMode }}>
      {children}
    </FontModeContext.Provider>
  );
};

export const useFontMode = () => useContext(FontModeContext);
