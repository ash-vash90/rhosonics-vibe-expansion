import { forwardRef, type ComponentProps, type ReactNode } from "react";
import { Link as TSLink } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

interface NavLinkCompatProps
  extends Omit<ComponentProps<typeof TSLink>, "className" | "to" | "children"> {
  to: string;
  className?: string;
  activeClassName?: string;
  pendingClassName?: string;
  children?: ReactNode;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  ({ className, activeClassName, pendingClassName, to, children, ...props }, ref) => {
    return (
      <TSLink
        ref={ref as never}
        to={to as never}
        className={cn(className)}
        activeProps={{ className: cn(className, activeClassName) }}
        {...((props ?? {}) as Record<string, unknown>)}
      >
        {children}
      </TSLink>
    );
  },
);

NavLink.displayName = "NavLink";

export { NavLink };
