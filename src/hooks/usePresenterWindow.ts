import { useState, useEffect, useCallback, useRef } from "react";
import { Presentation } from "@/types/presentation";

const BROADCAST_CHANNEL_NAME = "presenter-sync";
const SESSION_STORAGE_KEY = "presenter-view-data";

export interface PresenterSyncMessage {
  type: "SLIDE_CHANGE" | "CLOSE" | "PAUSE" | "RESUME" | "TIMER_UPDATE";
  payload?: any;
}

export function usePresenterWindow() {
  const [presenterWindow, setPresenterWindow] = useState<Window | null>(null);
  const [isWindowOpen, setIsWindowOpen] = useState(false);
  const channelRef = useRef<BroadcastChannel | null>(null);

  // Initialize broadcast channel
  useEffect(() => {
    channelRef.current = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
    
    // Listen for messages from presenter window
    channelRef.current.onmessage = (event: MessageEvent<PresenterSyncMessage>) => {
      if (event.data.type === "CLOSE") {
        setIsWindowOpen(false);
        setPresenterWindow(null);
      }
    };

    return () => {
      channelRef.current?.close();
    };
  }, []);

  // Check if window is still open
  useEffect(() => {
    if (!presenterWindow) return;

    const checkWindow = setInterval(() => {
      if (presenterWindow.closed) {
        setIsWindowOpen(false);
        setPresenterWindow(null);
      }
    }, 1000);

    return () => clearInterval(checkWindow);
  }, [presenterWindow]);

  const openPresenterWindow = useCallback((presentation: Presentation, startIndex: number = 0) => {
    // Store presentation data in sessionStorage for the new window
    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify({
      presentation,
      startIndex,
    }));

    // Calculate window dimensions
    const width = Math.min(1400, window.screen.availWidth * 0.8);
    const height = Math.min(900, window.screen.availHeight * 0.8);
    const left = (window.screen.availWidth - width) / 2;
    const top = (window.screen.availHeight - height) / 2;

    // Open new window
    const win = window.open(
      "/presentations/builder/presenter",
      "PresenterView",
      `width=${width},height=${height},left=${left},top=${top},menubar=no,toolbar=no,resizable=yes`
    );

    if (win) {
      setPresenterWindow(win);
      setIsWindowOpen(true);
    }

    return win;
  }, []);

  const syncSlideIndex = useCallback((index: number) => {
    channelRef.current?.postMessage({ 
      type: "SLIDE_CHANGE", 
      payload: index 
    } as PresenterSyncMessage);
  }, []);

  const closePresenterWindow = useCallback(() => {
    channelRef.current?.postMessage({ type: "CLOSE" } as PresenterSyncMessage);
    presenterWindow?.close();
    setPresenterWindow(null);
    setIsWindowOpen(false);
  }, [presenterWindow]);

  return {
    openPresenterWindow,
    syncSlideIndex,
    closePresenterWindow,
    isWindowOpen,
    presenterWindow,
  };
}

// Hook for the presenter window to receive sync messages
export function usePresenterSync(onSlideChange?: (index: number) => void) {
  const channelRef = useRef<BroadcastChannel | null>(null);

  useEffect(() => {
    channelRef.current = new BroadcastChannel(BROADCAST_CHANNEL_NAME);

    channelRef.current.onmessage = (event: MessageEvent<PresenterSyncMessage>) => {
      switch (event.data.type) {
        case "SLIDE_CHANGE":
          onSlideChange?.(event.data.payload);
          break;
        case "CLOSE":
          window.close();
          break;
      }
    };

    // Notify main window when closing
    const handleBeforeUnload = () => {
      channelRef.current?.postMessage({ type: "CLOSE" } as PresenterSyncMessage);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      channelRef.current?.close();
    };
  }, [onSlideChange]);

  const sendSlideChange = useCallback((index: number) => {
    channelRef.current?.postMessage({ 
      type: "SLIDE_CHANGE", 
      payload: index 
    } as PresenterSyncMessage);
  }, []);

  return { sendSlideChange };
}

// Get stored presentation data for presenter window
export function getStoredPresenterData(): { presentation: Presentation; startIndex: number } | null {
  const data = sessionStorage.getItem(SESSION_STORAGE_KEY);
  if (!data) return null;

  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
}