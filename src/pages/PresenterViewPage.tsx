import { useState, useEffect } from "react";
import { PresenterView } from "@/components/presentation-builder/PresenterView";
import { usePresenterSync, getStoredPresenterData } from "@/hooks/usePresenterWindow";
import { Presentation } from "@/types/presentation";

export default function PresenterViewPage() {
  const [presentation, setPresentation] = useState<Presentation | null>(null);
  const [startIndex, setStartIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const { sendSlideChange } = usePresenterSync();

  useEffect(() => {
    const data = getStoredPresenterData();
    if (data) {
      setPresentation(data.presentation);
      setStartIndex(data.startIndex);
    }
    setIsLoading(false);
  }, []);

  const handleSlideChange = (index: number) => {
    sendSlideChange(index);
  };

  const handleClose = () => {
    window.close();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-white/60 font-ui">Loading presenter view...</span>
        </div>
      </div>
    );
  }

  if (!presentation) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="text-center">
          <h1 className="font-logo text-2xl text-white mb-4">No Presentation Data</h1>
          <p className="text-white/60 font-ui mb-6">
            Please open the presenter view from the presentation builder.
          </p>
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-primary text-white rounded-lg font-ui hover:bg-primary/90"
          >
            Close Window
          </button>
        </div>
      </div>
    );
  }

  return (
    <PresenterView
      presentation={presentation}
      startSlideIndex={startIndex}
      onClose={handleClose}
      onSlideChange={handleSlideChange}
      isInWindow={true}
    />
  );
}