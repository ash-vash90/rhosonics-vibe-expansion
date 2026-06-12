interface SectionTitleProps {
  children: React.ReactNode;
  /** Render on dark surfaces. */
  onDark?: boolean;
  as?: "h2" | "h3";
  className?: string;
}

/**
 * SectionTitle — display H2 with the homepage scale:
 * clamp(32px, 4vw, 48px), weight 700, -0.02em, 22ch, balanced.
 */
export const SectionTitle = ({
  children,
  onDark = false,
  as: Tag = "h2",
  className = "",
}: SectionTitleProps) => (
  <Tag
    className={`font-ui font-bold tracking-tight leading-[1.05] text-balance max-w-[22ch] ${
      onDark ? "text-[hsl(var(--slate-50))]" : "text-foreground"
    } ${className}`}
    style={{ fontSize: "clamp(32px, 4vw, 48px)", letterSpacing: "-0.02em" }}
  >
    {children}
  </Tag>
);

export default SectionTitle;
