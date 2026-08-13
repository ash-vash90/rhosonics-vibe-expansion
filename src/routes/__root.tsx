import { Suspense, lazy, useEffect, type ReactNode } from "react";
import { QueryClientProvider, type QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  Scripts,
  useRouter,
} from "@tanstack/react-router";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { FontModeProvider } from "@/hooks/useFontMode";
import { reportLovableError } from "@/lib/lovable-error-reporting";

import appCss from "../styles.css?url";

const NotFound = lazy(() => import("@/pages/NotFound"));

const GOOGLE_FONTS_HREF =
  "https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&family=JetBrains+Mono:wght@400;500;600&display=swap";

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="flex flex-col items-center gap-4">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      <span className="text-sm text-muted-foreground font-ui">Loading...</span>
    </div>
  </div>
);

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <FontModeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        </TooltipProvider>
      </FontModeProvider>
    </QueryClientProvider>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="max-w-md w-full text-center">
        <h1 className="font-ui text-2xl font-semibold text-foreground mb-2">
          This page didn't load
        </h1>
        <p className="font-ui text-sm text-muted-foreground mb-6">
          Something went wrong on our end. You can try again or head back home.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="px-4 py-2 rounded bg-primary text-primary-foreground font-ui text-sm font-medium hover:bg-primary-600 transition-colors"
          >
            Try again
          </button>
          <a
            href="/"
            className="px-4 py-2 rounded border border-border bg-card text-foreground font-ui text-sm font-medium hover:bg-secondary transition-colors"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1.0" },
      { name: "robots", content: "noindex, nofollow" },
      { name: "googlebot", content: "noindex, nofollow" },
      { title: "RHOSONICS | Master Design System" },
      {
        name: "description",
        content:
          "The official Rhosonics brand guidelines and design system. Precision. Resilience. Intelligence.",
      },
      { name: "author", content: "Rhosonics" },
      { property: "og:title", content: "RHOSONICS | Master Design System" },
      {
        property: "og:description",
        content: "The official Rhosonics brand guidelines and design system.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://lovable.dev/opengraph-image-p98pqg.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@Rhosonics" },
      { name: "twitter:image", content: "https://lovable.dev/opengraph-image-p98pqg.png" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: GOOGLE_FONTS_HREF },
      { rel: "stylesheet", href: appCss },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: () => (
    <Suspense fallback={<PageLoader />}>
      <NotFound />
    </Suspense>
  ),
  errorComponent: ErrorComponent,
});
