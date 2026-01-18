import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const chamferedTabsListVariants = cva(
  "inline-flex items-center justify-center p-1 gap-1",
  {
    variants: {
      variant: {
        obsidian: "bg-rho-obsidian [clip-path:var(--chamfer-sm)]",
        primary: "bg-muted [clip-path:var(--chamfer-sm)]",
        outline: "border border-border [clip-path:var(--chamfer-sm)] bg-transparent",
      },
    },
    defaultVariants: {
      variant: "obsidian",
    },
  }
);

const chamferedTabsTriggerVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap px-4 py-2 font-data text-xs uppercase tracking-wider transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        obsidian: 
          "text-slate-400 hover:text-slate-200 data-[state=active]:bg-slate-100 data-[state=active]:text-rho-obsidian data-[state=active]:[clip-path:var(--chamfer-btn)]",
        primary:
          "text-muted-foreground hover:text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:[clip-path:var(--chamfer-btn)]",
        outline:
          "text-muted-foreground hover:text-foreground data-[state=active]:border-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:[clip-path:var(--chamfer-btn)] data-[state=active]:bg-primary/5",
      },
    },
    defaultVariants: {
      variant: "obsidian",
    },
  }
);

type ChamferedTabsVariant = VariantProps<typeof chamferedTabsListVariants>["variant"];

interface ChamferedTabsContextValue {
  variant: ChamferedTabsVariant;
}

const ChamferedTabsContext = React.createContext<ChamferedTabsContextValue>({
  variant: "obsidian",
});

interface ChamferedTabsProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>,
    VariantProps<typeof chamferedTabsListVariants> {}

const ChamferedTabs = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  ChamferedTabsProps
>(({ className, variant = "obsidian", ...props }, ref) => (
  <ChamferedTabsContext.Provider value={{ variant }}>
    <TabsPrimitive.Root
      ref={ref}
      className={cn(className)}
      {...props}
    />
  </ChamferedTabsContext.Provider>
));
ChamferedTabs.displayName = "ChamferedTabs";

const ChamferedTabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => {
  const { variant } = React.useContext(ChamferedTabsContext);
  return (
    <TabsPrimitive.List
      ref={ref}
      className={cn(chamferedTabsListVariants({ variant }), className)}
      {...props}
    />
  );
});
ChamferedTabsList.displayName = "ChamferedTabsList";

const ChamferedTabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => {
  const { variant } = React.useContext(ChamferedTabsContext);
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(chamferedTabsTriggerVariants({ variant }), className)}
      {...props}
    />
  );
});
ChamferedTabsTrigger.displayName = "ChamferedTabsTrigger";

const ChamferedTabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-4 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
));
ChamferedTabsContent.displayName = "ChamferedTabsContent";

export {
  ChamferedTabs,
  ChamferedTabsList,
  ChamferedTabsTrigger,
  ChamferedTabsContent,
};
