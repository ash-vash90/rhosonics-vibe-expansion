import { useState, useRef } from "react";
import { BrandCallout } from "./BrandCallout";
import { Slider } from "@/components/ui/slider";
import { Download, Check, Grid3X3, Maximize2, CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import BeforeAfterSlider from "./BeforeAfterSlider";

// Image style examples - AI generated
import fieldMining from "@/assets/brand/imagery-field-mining.jpg";
import fieldDredging from "@/assets/brand/imagery-field-dredging.jpg";
import fieldWastewater from "@/assets/brand/imagery-field-wastewater.jpg";
import fieldSemiconductor from "@/assets/brand/imagery-field-semiconductor.jpg";
import abstractWaves from "@/assets/brand/imagery-abstract-waves.jpg";
import abstractSensor from "@/assets/brand/imagery-abstract-sensor.jpg";

// Before/after treatment example (single source - treatment applied via CSS)
import treatmentBefore from "@/assets/brand/imagery-treatment-before.jpg";

// Rhosonics approved background colors for texture preview
const approvedBackgrounds = [
  { name: "Obsidian", value: "#111522", textLight: true },
  { name: "Slate 900", value: "#0f172a", textLight: true },
  { name: "Slate 800", value: "#1e293b", textLight: true },
  { name: "Slate 700", value: "#334155", textLight: true },
  { name: "White", value: "#ffffff", textLight: false },
  { name: "Slate 50", value: "#f8fafc", textLight: false },
  { name: "Slate 100", value: "#f1f5f9", textLight: false },
  { name: "Mineral Surface", value: "#eae8de", textLight: false },
  { name: "Eco Surface", value: "#f0faf1", textLight: false },
];

// Rhosonics approved texture/pattern colors
const approvedTextureColors = [
  { name: "Rhosonics Green", value: "#33993c" },
  { name: "Lime Accent", value: "#73B82E" },
  { name: "Slate 400", value: "#94a3b8" },
  { name: "Slate 500", value: "#64748b" },
  { name: "White", value: "#ffffff" },
  { name: "Obsidian", value: "#111522" },
  { name: "Mineral", value: "#7a7a5c" },
];

// Texture pattern definitions - all patterns tile seamlessly with refined, professional designs
const textures = [
  {
    name: "Cross Grid",
    description: "Primary brand pattern. Structured crosses evoke precision calibration points.",
    usage: "Hero backgrounds, section headers, marketing materials",
    pattern: `url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7 0v3h1V0H7zm0 13v3h1v-3H7zM0 7v1h3V7H0zm13 0v1h3V7h-3z' fill='%2333993c' fill-opacity='.12'/%3E%3C/svg%3E")`,
    rawSvg: `<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M7 0v3h1V0H7zm0 13v3h1v-3H7zM0 7v1h3V7H0zm13 0v1h3V7h-3z" fill="#33993c" fill-opacity="OPACITY_PLACEHOLDER"/></svg>`,
    bgClass: "bg-rho-obsidian",
    opacity: "opacity-100",
    category: "brand",
  },
  {
    name: "Ultrasonic Pulse",
    description: "Concentric rings representing SDM wave propagation. Our core technology signature.",
    usage: "Product pages, technology sections, SDM feature highlights",
    pattern: `url("data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%2333993c'%3E%3Ccircle cx='32' cy='32' r='8' stroke-opacity='.08' stroke-width='.5'/%3E%3Ccircle cx='32' cy='32' r='16' stroke-opacity='.1' stroke-width='.5'/%3E%3Ccircle cx='32' cy='32' r='24' stroke-opacity='.06' stroke-width='.5'/%3E%3Ccircle cx='32' cy='32' r='31' stroke-opacity='.04' stroke-width='.5'/%3E%3Ccircle cx='32' cy='32' r='2' fill='%2333993c' fill-opacity='.15' stroke='none'/%3E%3C/g%3E%3C/svg%3E")`,
    rawSvg: `<svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><g fill="none" stroke="#33993c"><circle cx="32" cy="32" r="8" stroke-opacity="OPACITY_PLACEHOLDER" stroke-width=".5"/><circle cx="32" cy="32" r="16" stroke-opacity="OPACITY_PLACEHOLDER" stroke-width=".5"/><circle cx="32" cy="32" r="24" stroke-opacity="OPACITY_PLACEHOLDER" stroke-width=".5"/><circle cx="32" cy="32" r="31" stroke-opacity="OPACITY_PLACEHOLDER" stroke-width=".5"/><circle cx="32" cy="32" r="2" fill="#33993c" fill-opacity="OPACITY_PLACEHOLDER" stroke="none"/></g></svg>`,
    bgClass: "bg-rho-obsidian",
    opacity: "opacity-100",
    category: "brand",
  },
  {
    name: "Engineering Grid",
    description: "Technical measurement grid with intersection markers. Precision and systematic order.",
    usage: "Data displays, specifications, interface backgrounds",
    pattern: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Cpath d='M0 0h40v40H0z' stroke='%2333993c' stroke-opacity='.05' stroke-width='.5'/%3E%3Cpath d='M20 0v40M0 20h40' stroke='%2333993c' stroke-opacity='.03' stroke-width='.5'/%3E%3Ccircle cx='20' cy='20' r='1' fill='%2333993c' fill-opacity='.1'/%3E%3Ccircle cx='0' cy='0' r='.75' fill='%2333993c' fill-opacity='.08'/%3E%3Ccircle cx='40' cy='0' r='.75' fill='%2333993c' fill-opacity='.08'/%3E%3Ccircle cx='0' cy='40' r='.75' fill='%2333993c' fill-opacity='.08'/%3E%3Ccircle cx='40' cy='40' r='.75' fill='%2333993c' fill-opacity='.08'/%3E%3C/g%3E%3C/svg%3E")`,
    rawSvg: `<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><g fill="none"><path d="M0 0h40v40H0z" stroke="#33993c" stroke-opacity="OPACITY_PLACEHOLDER" stroke-width=".5"/><path d="M20 0v40M0 20h40" stroke="#33993c" stroke-opacity="OPACITY_PLACEHOLDER" stroke-width=".5"/><circle cx="20" cy="20" r="1" fill="#33993c" fill-opacity="OPACITY_PLACEHOLDER"/><circle cx="0" cy="0" r=".75" fill="#33993c" fill-opacity="OPACITY_PLACEHOLDER"/><circle cx="40" cy="0" r=".75" fill="#33993c" fill-opacity="OPACITY_PLACEHOLDER"/><circle cx="0" cy="40" r=".75" fill="#33993c" fill-opacity="OPACITY_PLACEHOLDER"/><circle cx="40" cy="40" r=".75" fill="#33993c" fill-opacity="OPACITY_PLACEHOLDER"/></g></svg>`,
    bgClass: "bg-slate-900",
    opacity: "opacity-100",
    category: "brand",
  },
  {
    name: "Topographic",
    description: "Flowing contour lines suggesting depth mapping and geological survey data.",
    usage: "Mining applications, depth measurement, geological contexts",
    pattern: `url("data:image/svg+xml,%3Csvg width='80' height='40' viewBox='0 0 80 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%2373B82E' stroke-width='.5' stroke-linecap='round'%3E%3Cpath d='M-10 30 Q10 25 30 30 Q50 35 70 30 Q90 25 110 30' stroke-opacity='.08'/%3E%3Cpath d='M-10 20 Q10 15 30 20 Q50 25 70 20 Q90 15 110 20' stroke-opacity='.12'/%3E%3Cpath d='M-10 10 Q10 5 30 10 Q50 15 70 10 Q90 5 110 10' stroke-opacity='.06'/%3E%3C/g%3E%3C/svg%3E")`,
    rawSvg: `<svg width="80" height="40" viewBox="0 0 80 40" xmlns="http://www.w3.org/2000/svg"><g fill="none" stroke="#73B82E" stroke-width=".5" stroke-linecap="round"><path d="M-10 30 Q10 25 30 30 Q50 35 70 30 Q90 25 110 30" stroke-opacity="OPACITY_PLACEHOLDER"/><path d="M-10 20 Q10 15 30 20 Q50 25 70 20 Q90 15 110 20" stroke-opacity="OPACITY_PLACEHOLDER"/><path d="M-10 10 Q10 5 30 10 Q50 15 70 10 Q90 5 110 10" stroke-opacity="OPACITY_PLACEHOLDER"/></g></svg>`,
    bgClass: "bg-mineral-deep",
    opacity: "opacity-100",
    category: "brand",
  },
  {
    name: "Isometric",
    description: "Diamond mesh evoking 3D structural analysis and engineered frameworks.",
    usage: "Case studies, equipment diagrams, structural contexts",
    pattern: `url("data:image/svg+xml,%3Csvg width='14' height='14' viewBox='0 0 14 14' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7 0l7 7-7 7L0 7z' fill='none' stroke='%2333993c' stroke-opacity='.08' stroke-width='.35'/%3E%3Ccircle cx='7' cy='7' r='.4' fill='%2333993c' fill-opacity='.1'/%3E%3C/svg%3E")`,
    rawSvg: `<svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg"><path d="M7 0l7 7-7 7L0 7z" fill="none" stroke="#33993c" stroke-opacity="OPACITY_PLACEHOLDER" stroke-width=".35"/><circle cx="7" cy="7" r=".4" fill="#33993c" fill-opacity="OPACITY_PLACEHOLDER"/></svg>`,
    bgClass: "bg-rho-obsidian",
    opacity: "opacity-100",
    category: "brand",
  },
  {
    name: "Flow Dynamics",
    description: "Parallel curves suggesting fluid movement and slurry flow measurement.",
    usage: "Wastewater applications, flow measurement, process contexts",
    pattern: `url("data:image/svg+xml,%3Csvg width='60' height='30' viewBox='0 0 60 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%2333993c' stroke-width='.5' stroke-linecap='round'%3E%3Cpath d='M0 7.5 Q15 5 30 7.5 T60 7.5' stroke-opacity='.06'/%3E%3Cpath d='M0 15 Q15 12 30 15 T60 15' stroke-opacity='.1'/%3E%3Cpath d='M0 22.5 Q15 20 30 22.5 T60 22.5' stroke-opacity='.06'/%3E%3C/g%3E%3Ccircle cx='45' cy='15' r='1' fill='%2333993c' fill-opacity='.08'/%3E%3Ccircle cx='15' cy='15' r='.75' fill='%2333993c' fill-opacity='.06'/%3E%3C/svg%3E")`,
    rawSvg: `<svg width="60" height="30" viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg"><g fill="none" stroke="#33993c" stroke-width=".5" stroke-linecap="round"><path d="M0 7.5 Q15 5 30 7.5 T60 7.5" stroke-opacity="OPACITY_PLACEHOLDER"/><path d="M0 15 Q15 12 30 15 T60 15" stroke-opacity="OPACITY_PLACEHOLDER"/><path d="M0 22.5 Q15 20 30 22.5 T60 22.5" stroke-opacity="OPACITY_PLACEHOLDER"/></g><circle cx="45" cy="15" r="1" fill="#33993c" fill-opacity="OPACITY_PLACEHOLDER"/><circle cx="15" cy="15" r=".75" fill="#33993c" fill-opacity="OPACITY_PLACEHOLDER"/></svg>`,
    bgClass: "bg-slate-800",
    opacity: "opacity-100",
    category: "brand",
  },
  // Industry-specific textures
  {
    name: "Minerals / Mining",
    description: "Crystal lattice pattern with ore-like geometry. Field operations aesthetic.",
    usage: "Mining dashboards, thickener interfaces, mineral processing",
    pattern: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg stroke='%23ffffff' stroke-width='1' opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3Cpath d='M60 20L30 50L0 20M30 0v10M30 60V50' stroke-dasharray='4,4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
    rawSvg: `<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g stroke="#ffffff" stroke-width="1" opacity="OPACITY_PLACEHOLDER"><path d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/><path d="M60 20L30 50L0 20M30 0v10M30 60V50" stroke-dasharray="4,4"/></g></g></svg>`,
    bgClass: "bg-rho-obsidian",
    opacity: "opacity-100",
    category: "industry",
  },
  {
    name: "Semiconductor",
    description: "Circuit-inspired precision grid. Clean room technology aesthetic.",
    usage: "CMP slurry monitoring, semiconductor process control, precision tech",
    pattern: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h80v80H0V0zm10 10v60h60V10H10zm5 5h50v50H15V15zm5 5v40h40V20H20z' fill='%2333993c' fill-opacity='0.02'/%3E%3Cpath d='M40 0v10M0 40h10M40 80V70M80 40H70' stroke='%2333993c' stroke-width='1' opacity='0.1'/%3E%3Ccircle cx='40' cy='40' r='2' fill='%2333993c' opacity='0.1'/%3E%3C/svg%3E")`,
    rawSvg: `<svg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h80v80H0V0zm10 10v60h60V10H10zm5 5h50v50H15V15zm5 5v40h40V20H20z" fill="#33993c" fill-opacity="OPACITY_PLACEHOLDER"/><path d="M40 0v10M0 40h10M40 80V70M80 40H70" stroke="#33993c" stroke-width="1" opacity="OPACITY_PLACEHOLDER"/><circle cx="40" cy="40" r="2" fill="#33993c" opacity="OPACITY_PLACEHOLDER"/></svg>`,
    bgClass: "bg-background",
    opacity: "opacity-100",
    category: "industry",
  },
  {
    name: "Dredging / Marine",
    description: "Fluid wave pattern suggesting water movement and sediment flow.",
    usage: "Dredging operations, suction density, marine applications",
    pattern: `url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21.184 20c.357-.13.72-.264 1.088-.402l1.768-.661C33.64 15.347 39.647 14 50 14c10.271 0 15.362 1.222 24.629 4.928.955.383 1.869.74 2.75 1.072h6.225c-2.51-.73-5.139-1.691-8.233-2.928C65.888 13.278 60.562 12 50 12c-10.626 0-16.855 1.397-26.66 5.063l-1.767.662c-2.475.923-4.66 1.674-6.724 2.275h6.335zm0-20C13.258 2.892 8.077 4 0 4V2c5.744 0 9.951-.574 14.85-2h6.334zM77.38 0C85.239 2.966 90.502 4 100 4V2c-6.842 0-11.386-.542-16.396-2h-6.225zM0 14c8.44 0 13.718-1.21 22.272-4.402l1.768-.661C33.64 5.347 39.647 4 50 4c10.271 0 15.362 1.222 24.629 4.928C84.112 12.722 89.438 14 100 14v-2c-10.271 0-15.362-1.222-24.629-4.928C65.888 3.278 60.562 2 50 2 39.374 2 33.145 3.397 23.34 7.063l-1.767.662C13.223 10.84 8.163 12 0 12v2z' fill='%2394a3b8' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
    rawSvg: `<svg width="100" height="20" viewBox="0 0 100 20" xmlns="http://www.w3.org/2000/svg"><path d="M21.184 20c.357-.13.72-.264 1.088-.402l1.768-.661C33.64 15.347 39.647 14 50 14c10.271 0 15.362 1.222 24.629 4.928.955.383 1.869.74 2.75 1.072h6.225c-2.51-.73-5.139-1.691-8.233-2.928C65.888 13.278 60.562 12 50 12c-10.626 0-16.855 1.397-26.66 5.063l-1.767.662c-2.475.923-4.66 1.674-6.724 2.275h6.335zm0-20C13.258 2.892 8.077 4 0 4V2c5.744 0 9.951-.574 14.85-2h6.334zM77.38 0C85.239 2.966 90.502 4 100 4V2c-6.842 0-11.386-.542-16.396-2h-6.225zM0 14c8.44 0 13.718-1.21 22.272-4.402l1.768-.661C33.64 5.347 39.647 4 50 4c10.271 0 15.362 1.222 24.629 4.928C84.112 12.722 89.438 14 100 14v-2c-10.271 0-15.362-1.222-24.629-4.928C65.888 3.278 60.562 2 50 2 39.374 2 33.145 3.397 23.34 7.063l-1.767.662C13.223 10.84 8.163 12 0 12v2z" fill="#94a3b8" fill-opacity="OPACITY_PLACEHOLDER" fill-rule="evenodd"/></svg>`,
    bgClass: "bg-slate-100",
    opacity: "opacity-100",
    category: "industry",
  },
  {
    name: "Flat Panel Display",
    description: "Pixel grid matrix suggesting LCD/LED display technology and precision monitoring.",
    usage: "HMI interfaces, display dashboards, control room applications",
    pattern: `url("data:image/svg+xml,%3Csvg width='48' height='48' viewBox='0 0 48 48' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Crect x='2' y='2' width='10' height='10' rx='1' stroke='%2333993c' stroke-opacity='.08' stroke-width='.5'/%3E%3Crect x='18' y='2' width='10' height='10' rx='1' stroke='%2333993c' stroke-opacity='.06' stroke-width='.5'/%3E%3Crect x='34' y='2' width='10' height='10' rx='1' stroke='%2333993c' stroke-opacity='.08' stroke-width='.5'/%3E%3Crect x='2' y='18' width='10' height='10' rx='1' stroke='%2333993c' stroke-opacity='.06' stroke-width='.5'/%3E%3Crect x='18' y='18' width='10' height='10' rx='1' stroke='%2333993c' stroke-opacity='.1' stroke-width='.5'/%3E%3Crect x='34' y='18' width='10' height='10' rx='1' stroke='%2333993c' stroke-opacity='.06' stroke-width='.5'/%3E%3Crect x='2' y='34' width='10' height='10' rx='1' stroke='%2333993c' stroke-opacity='.08' stroke-width='.5'/%3E%3Crect x='18' y='34' width='10' height='10' rx='1' stroke='%2333993c' stroke-opacity='.06' stroke-width='.5'/%3E%3Crect x='34' y='34' width='10' height='10' rx='1' stroke='%2333993c' stroke-opacity='.08' stroke-width='.5'/%3E%3Ccircle cx='7' cy='7' r='2' fill='%2333993c' fill-opacity='.06'/%3E%3Ccircle cx='23' cy='23' r='2.5' fill='%2333993c' fill-opacity='.1'/%3E%3Ccircle cx='39' cy='39' r='2' fill='%2333993c' fill-opacity='.06'/%3E%3C/g%3E%3C/svg%3E")`,
    rawSvg: `<svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><g fill="none"><rect x="2" y="2" width="10" height="10" rx="1" stroke="#33993c" stroke-opacity="OPACITY_PLACEHOLDER" stroke-width=".5"/><rect x="18" y="2" width="10" height="10" rx="1" stroke="#33993c" stroke-opacity="OPACITY_PLACEHOLDER" stroke-width=".5"/><rect x="34" y="2" width="10" height="10" rx="1" stroke="#33993c" stroke-opacity="OPACITY_PLACEHOLDER" stroke-width=".5"/><rect x="2" y="18" width="10" height="10" rx="1" stroke="#33993c" stroke-opacity="OPACITY_PLACEHOLDER" stroke-width=".5"/><rect x="18" y="18" width="10" height="10" rx="1" stroke="#33993c" stroke-opacity="OPACITY_PLACEHOLDER" stroke-width=".5"/><rect x="34" y="18" width="10" height="10" rx="1" stroke="#33993c" stroke-opacity="OPACITY_PLACEHOLDER" stroke-width=".5"/><rect x="2" y="34" width="10" height="10" rx="1" stroke="#33993c" stroke-opacity="OPACITY_PLACEHOLDER" stroke-width=".5"/><rect x="18" y="34" width="10" height="10" rx="1" stroke="#33993c" stroke-opacity="OPACITY_PLACEHOLDER" stroke-width=".5"/><rect x="34" y="34" width="10" height="10" rx="1" stroke="#33993c" stroke-opacity="OPACITY_PLACEHOLDER" stroke-width=".5"/><circle cx="7" cy="7" r="2" fill="#33993c" fill-opacity="OPACITY_PLACEHOLDER"/><circle cx="23" cy="23" r="2.5" fill="#33993c" fill-opacity="OPACITY_PLACEHOLDER"/><circle cx="39" cy="39" r="2" fill="#33993c" fill-opacity="OPACITY_PLACEHOLDER"/></g></svg>`,
    bgClass: "bg-rho-obsidian",
    opacity: "opacity-100",
    category: "industry",
  },
];

// Group textures by category
const brandTextures = textures.filter(t => t.category === "brand");
const industryTextures = textures.filter(t => t.category === "industry");

// Interactive Texture Preview Component
const TexturePreview = () => {
  const [selectedTexture, setSelectedTexture] = useState(textures[0]);
  const [opacity, setOpacity] = useState([0.12]);
  const [scale, setScale] = useState([0.25]);
  const [bgColor, setBgColor] = useState(approvedBackgrounds[0]);
  const [textureColor, setTextureColor] = useState(approvedTextureColors[0]);
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<"preview" | "tiling">("preview");
  const downloadRef = useRef<HTMLAnchorElement>(null);

  const generateSvgWithOpacityAndColor = (rawSvg: string, op: number, color: string) => {
    // Replace opacity placeholder
    let result = rawSvg.replace(/OPACITY_PLACEHOLDER/g, op.toString());
    // Replace all color references (both stroke and fill colors)
    result = result.replace(/#33993c/gi, color);
    result = result.replace(/#73B82E/gi, color);
    result = result.replace(/#94a3b8/gi, color);
    result = result.replace(/#ffffff/gi, color);
    return result;
  };

  const handleDownload = () => {
    const svgContent = generateSvgWithOpacityAndColor(selectedTexture.rawSvg, opacity[0], textureColor.value);
    const blob = new Blob([svgContent], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    
    if (downloadRef.current) {
      downloadRef.current.href = url;
      downloadRef.current.download = `${selectedTexture.name.toLowerCase().replace(/\s+/g, "-")}-pattern.svg`;
      downloadRef.current.click();
      URL.revokeObjectURL(url);
    }
  };

  const handleCopySvg = () => {
    const svgContent = generateSvgWithOpacityAndColor(selectedTexture.rawSvg, opacity[0], textureColor.value);
    navigator.clipboard.writeText(svgContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getPatternWithOpacityAndColor = (rawSvg: string, op: number, color: string) => {
    const svgWithMods = generateSvgWithOpacityAndColor(rawSvg, op, color);
    const encoded = encodeURIComponent(svgWithMods);
    return `url("data:image/svg+xml,${encoded}")`;
  };

  // Scale multipliers for pattern sizing - 1× is the base, scaling up to 2×
  const scaleLabels = ["0.5×", "0.75×", "1×", "1.25×", "1.5×", "2×"];
  const scaleValues = [0.125, 0.1875, 0.25, 0.3125, 0.375, 0.5];
  const currentScaleLabel = scaleLabels[scaleValues.indexOf(scale[0])] || `${scale[0]}×`;

  return (
    <div className="mt-12 border border-border rounded-lg overflow-hidden">
      <div className="p-4 md:p-6 bg-card border-b border-border">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h4 className="font-ui font-bold text-foreground mb-1">Interactive Texture Preview</h4>
            <p className="text-muted-foreground text-sm">Customize opacity, scale and background, then download as SVG.</p>
          </div>
          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 p-1 bg-muted rounded-lg">
            <button
              onClick={() => setViewMode("preview")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded text-sm font-ui transition-colors ${
                viewMode === "preview"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Grid3X3 className="w-4 h-4" />
              Preview
            </button>
            <button
              onClick={() => setViewMode("tiling")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded text-sm font-ui transition-colors ${
                viewMode === "tiling"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Maximize2 className="w-4 h-4" />
              Tiling
            </button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        {/* Preview Panel */}
        {viewMode === "preview" ? (
          <div 
            className="relative h-64 md:h-80 lg:h-96 transition-colors duration-300"
            style={{ backgroundColor: bgColor.value }}
          >
            <div 
              className="absolute inset-0 transition-opacity duration-300"
              style={{ 
                backgroundImage: getPatternWithOpacityAndColor(selectedTexture.rawSvg, opacity[0], textureColor.value),
                backgroundSize: `${scale[0] * 100}%`
              }}
            />
            <div className="absolute bottom-4 left-4 right-4">
              <div className={`inline-block px-3 py-1.5 rounded text-xs font-data ${bgColor.textLight ? "bg-white/10 text-white" : "bg-black/5 text-foreground"}`}>
                {selectedTexture.name} @ {Math.round(opacity[0] * 100)}% opacity, {currentScaleLabel} scale
              </div>
            </div>
          </div>
        ) : (
          /* Tiling View - Larger area to show pattern repeat */
          <div 
            className="relative h-80 md:h-96 lg:h-[480px] transition-colors duration-300 overflow-hidden"
            style={{ backgroundColor: bgColor.value }}
          >
            {/* Grid overlay to show tile boundaries */}
            <div 
              className="absolute inset-0 transition-opacity duration-300"
              style={{ 
                backgroundImage: getPatternWithOpacityAndColor(selectedTexture.rawSvg, opacity[0], textureColor.value),
                backgroundSize: `${scale[0] * 100}%`
              }}
            />
            {/* Tile grid indicator */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `linear-gradient(to right, ${bgColor.textLight ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'} 1px, transparent 1px),
                                  linear-gradient(to bottom, ${bgColor.textLight ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'} 1px, transparent 1px)`,
                backgroundSize: `${scale[0] * 100}% ${scale[0] * 100}%`
              }}
            />
            {/* Info overlay */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
              <div className={`inline-block px-3 py-1.5 rounded text-xs font-data ${bgColor.textLight ? "bg-white/10 text-white" : "bg-black/5 text-foreground"}`}>
                Tiling Preview — Shows how pattern repeats across surfaces
              </div>
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <div className={`inline-block px-3 py-1.5 rounded text-xs font-data ${bgColor.textLight ? "bg-white/10 text-white" : "bg-black/5 text-foreground"}`}>
                {selectedTexture.name} @ {Math.round(opacity[0] * 100)}% opacity, {currentScaleLabel} scale
              </div>
            </div>
          </div>
        )}

        {/* Controls Panel */}
        <div className="p-4 md:p-6 bg-muted/30 space-y-6">
          {/* Texture Selection */}
          <div>
            <span className="label-tech-sm text-primary block mb-3">SELECT TEXTURE</span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {textures.map((texture) => (
                <button
                  key={texture.name}
                  onClick={() => setSelectedTexture(texture)}
                  className={`p-2 text-left rounded border transition-all text-xs font-ui ${
                    selectedTexture.name === texture.name
                      ? "border-primary bg-primary/10 text-foreground"
                      : "border-border bg-card text-muted-foreground hover:border-primary/50"
                  }`}
                >
                  {texture.name}
                </button>
              ))}
            </div>
          </div>

          {/* Opacity Control */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="label-tech-sm text-primary">OPACITY</span>
              <span className="font-data text-sm text-foreground">{Math.round(opacity[0] * 100)}%</span>
            </div>
            <Slider
              value={opacity}
              onValueChange={setOpacity}
              min={0.02}
              max={0.4}
              step={0.01}
              className="w-full"
            />
            <div className="flex justify-between mt-1">
              <span className="text-xs text-muted-foreground">2%</span>
              <span className="text-xs text-muted-foreground">40%</span>
            </div>
          </div>

          {/* Scale Control */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="label-tech-sm text-primary">PATTERN SCALE</span>
              <span className="font-data text-sm text-foreground">{currentScaleLabel}</span>
            </div>
            <div className="flex gap-2">
              {scaleValues.map((s, idx) => (
                <button
                  key={s}
                  onClick={() => setScale([s])}
                  className={`flex-1 py-2 rounded border text-xs font-data transition-all ${
                    scale[0] === s
                      ? "border-primary bg-primary/10 text-foreground"
                      : "border-border bg-card text-muted-foreground hover:border-primary/50"
                  }`}
                >
                  {scaleLabels[idx]}
                </button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Smaller scales create denser patterns; larger scales create more open textures.
            </p>
          </div>

          {/* Texture Color Selection */}
          <div>
            <span className="label-tech-sm text-primary block mb-3">TEXTURE COLOR</span>
            <div className="flex flex-wrap gap-2">
              {approvedTextureColors.map((tc) => (
                <button
                  key={tc.name}
                  onClick={() => setTextureColor(tc)}
                  className={`w-8 h-8 rounded border-2 transition-all ${
                    textureColor.name === tc.name
                      ? "border-primary scale-110 ring-2 ring-primary/30"
                      : "border-border hover:scale-105"
                  }`}
                  style={{ backgroundColor: tc.value }}
                  title={tc.name}
                />
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2">Selected: {textureColor.name}</p>
          </div>

          {/* Background Color Selection */}
          <div>
            <span className="label-tech-sm text-primary block mb-3">BACKGROUND COLOR</span>
            <div className="flex flex-wrap gap-2">
              {approvedBackgrounds.map((bg) => (
                <button
                  key={bg.name}
                  onClick={() => setBgColor(bg)}
                  className={`w-8 h-8 rounded border-2 transition-all ${
                    bgColor.name === bg.name
                      ? "border-primary scale-110 ring-2 ring-primary/30"
                      : "border-transparent hover:scale-105"
                  }`}
                  style={{ backgroundColor: bg.value }}
                  title={bg.name}
                />
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2">Selected: {bgColor.name}</p>
          </div>

          {/* Download Actions */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleDownload}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded font-ui text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              <Download className="w-4 h-4" />
              Download SVG
            </button>
            <button
              onClick={handleCopySvg}
              className="flex items-center justify-center gap-2 px-4 py-2.5 border border-border bg-card text-foreground rounded font-ui text-sm font-medium hover:bg-muted transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-primary" /> : "Copy SVG"}
            </button>
            <a ref={downloadRef} className="hidden" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const ImageryGuidelines = () => {
  return (
    <section id="imagery" className="space-y-16">
      {/* Hero Statement */}
      <div>
        <p className="text-lg md:text-xl font-ui text-foreground leading-relaxed max-w-4xl">
          Imagery proves credibility, not decoration. 
          <span className="text-muted-foreground"> We show real environments where measurement happens, and clean abstractions where concepts need clarity.</span>
        </p>
      </div>

      {/* Full-width Context Specimens */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border rounded-lg overflow-hidden">
        {/* Field Context */}
        <div className="bg-rho-obsidian relative overflow-hidden">
          <div className="absolute inset-0 opacity-40 bg-pattern-minerals grayscale"></div>
          <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
          <div className="relative p-6 md:p-10 lg:p-16 flex flex-col justify-end min-h-[240px] md:min-h-[320px]">
            <span className="label-tech text-primary text-[10px] md:text-xs mb-2 md:mb-3 block">01 — FIELD CONTEXT</span>
            <h3 className="font-ui text-2xl md:text-3xl lg:text-4xl font-bold text-slate-100 mb-2 md:mb-4">Real & Gritty</h3>
            <p className="text-slate-400 text-sm md:text-base lg:text-lg max-w-md">
              Authenticity, case studies, proving durability. High contrast, desaturated, selective green accent.
            </p>
          </div>
        </div>

        {/* Engineering Context */}
        <div className="bg-card relative overflow-hidden">
          <div className="absolute inset-0 bg-pattern-semicon opacity-50"></div>
          <div className="relative p-6 md:p-10 lg:p-16 flex flex-col justify-end min-h-[240px] md:min-h-[320px]">
            <span className="label-tech text-primary text-[10px] md:text-xs mb-2 md:mb-3 block">02 — ENGINEERING CONTEXT</span>
            <h3 className="font-ui text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2 md:mb-4">Abstract & Precise</h3>
            <p className="text-muted-foreground text-sm md:text-base lg:text-lg max-w-md">
              Concepts, technology explainers, "smart" features. Clean lines, perfect lighting, geometric patterns.
            </p>
          </div>
        </div>
      </div>

      {/* Field Image Rule */}
      <BrandCallout variant="info" title="Field Image Rule">
        Field images must show evidence of use: wear, scale, context, or operation.
        Pristine environments without signs of real work reduce credibility.
      </BrandCallout>

      {/* ═══════════════════════════════════════════════════════════════
          IMAGE STYLE GUIDE WITH EXAMPLES
       ═══════════════════════════════════════════════════════════════ */}
      <div className="space-y-12">
        <div>
          <div className="flex items-baseline gap-4 md:gap-6 mb-6">
            <span className="font-data text-xs md:text-sm text-muted-foreground">STYLE GUIDE</span>
            <div className="h-px flex-1 bg-border max-w-16 md:max-w-24" />
          </div>
          <h3 className="font-ui text-2xl md:text-3xl font-bold text-foreground mb-3">When to Use Each Style</h3>
          <p className="text-muted-foreground text-base md:text-lg max-w-3xl mb-10">
            Choose imagery based on communication intent. Field photography builds trust through authenticity; abstract visuals clarify complex concepts.
          </p>
        </div>

        {/* Real & Gritty Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-mineral" />
            <h4 className="font-ui text-xl font-bold text-foreground">Real & Gritty</h4>
            <span className="label-tech text-muted-foreground ml-2">FIELD PHOTOGRAPHY</span>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-3">
              <div className="aspect-video rounded-lg overflow-hidden border border-border">
                <img 
                  src={fieldMining} 
                  alt="Mining thickener with measurement equipment" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="label-tech-sm text-primary">MINING</span>
                <span className="text-muted-foreground text-xs">Thickener installation</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="aspect-video rounded-lg overflow-hidden border border-border">
                <img 
                  src={fieldDredging} 
                  alt="Dredging vessel with pipe systems" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="label-tech-sm text-primary">DREDGING</span>
                <span className="text-muted-foreground text-xs">Maritime environment</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="aspect-video rounded-lg overflow-hidden border border-border">
                <img 
                  src={fieldWastewater} 
                  alt="Wastewater treatment settling tanks" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="label-tech-sm text-primary">WASTEWATER</span>
                <span className="text-muted-foreground text-xs">Treatment facility</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="aspect-video rounded-lg overflow-hidden border border-border">
                <img 
                  src={fieldSemiconductor} 
                  alt="Semiconductor clean room equipment" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="label-tech-sm text-primary">SEMICONDUCTOR</span>
                <span className="text-muted-foreground text-xs">Clean room precision</span>
              </div>
            </div>
          </div>

          <div className="bg-muted/30 rounded-lg p-6 border border-border">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span className="font-ui font-semibold text-foreground">Characteristics</span>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>High contrast, desaturated color palette</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Visible wear, scale, and operational context</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Selective green accent on indicators/displays</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Documentary-style, not overly polished</span>
                  </li>
                </ul>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-ui font-semibold text-foreground">Use For</span>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">→</span>
                    <span>Case studies and customer stories</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">→</span>
                    <span>Industry-specific landing pages</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">→</span>
                    <span>Installation and deployment documentation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">→</span>
                    <span>Building credibility with technical audiences</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Abstract & Precise Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <h4 className="font-ui text-xl font-bold text-foreground">Abstract & Precise</h4>
            <span className="label-tech text-muted-foreground ml-2">TECHNICAL VISUALIZATION</span>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="aspect-video rounded-lg overflow-hidden border border-border bg-rho-obsidian">
                <img 
                  src={abstractWaves} 
                  alt="Ultrasonic wave propagation visualization" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="label-tech-sm text-primary">TECHNOLOGY</span>
                <span className="text-muted-foreground text-sm">SDM wave propagation concept</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="aspect-video rounded-lg overflow-hidden border border-border bg-slate-50">
                <img 
                  src={abstractSensor} 
                  alt="Sensor cross-section technical diagram" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="label-tech-sm text-primary">PRODUCT</span>
                <span className="text-muted-foreground text-sm">Sensor cutaway, precision engineering</span>
              </div>
            </div>
          </div>

          <div className="bg-muted/30 rounded-lg p-6 border border-border">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span className="font-ui font-semibold text-foreground">Characteristics</span>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Clean lines and geometric precision</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Perfect studio or CGI lighting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Brand green as primary accent</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Minimal backgrounds (white, dark, gradient)</span>
                  </li>
                </ul>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-ui font-semibold text-foreground">Use For</span>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">→</span>
                    <span>Technology explainers and how-it-works</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">→</span>
                    <span>Product detail pages and specifications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">→</span>
                    <span>Marketing hero sections and presentations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">→</span>
                    <span>Conceptual diagrams and process flows</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Decision Matrix */}
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <div className="p-6 border-b border-border">
            <h4 className="font-ui font-bold text-foreground">Quick Decision Matrix</h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 font-data text-xs uppercase tracking-wider text-muted-foreground">Context</th>
                  <th className="text-left p-4 font-data text-xs uppercase tracking-wider text-muted-foreground">Style</th>
                  <th className="text-left p-4 font-data text-xs uppercase tracking-wider text-muted-foreground">Why</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="p-4 font-ui text-foreground">Case study</td>
                  <td className="p-4"><span className="px-2 py-1 bg-mineral/20 text-mineral-deep rounded text-xs font-data">FIELD</span></td>
                  <td className="p-4 text-muted-foreground">Proves real-world results</td>
                </tr>
                <tr>
                  <td className="p-4 font-ui text-foreground">Product page hero</td>
                  <td className="p-4"><span className="px-2 py-1 bg-primary/20 text-primary rounded text-xs font-data">ABSTRACT</span></td>
                  <td className="p-4 text-muted-foreground">Highlights precision engineering</td>
                </tr>
                <tr>
                  <td className="p-4 font-ui text-foreground">Technical documentation</td>
                  <td className="p-4"><span className="px-2 py-1 bg-primary/20 text-primary rounded text-xs font-data">ABSTRACT</span></td>
                  <td className="p-4 text-muted-foreground">Clarifies concepts without distraction</td>
                </tr>
                <tr>
                  <td className="p-4 font-ui text-foreground">Industry landing page</td>
                  <td className="p-4"><span className="px-2 py-1 bg-mineral/20 text-mineral-deep rounded text-xs font-data">FIELD</span></td>
                  <td className="p-4 text-muted-foreground">Shows domain expertise</td>
                </tr>
                <tr>
                  <td className="p-4 font-ui text-foreground">How SDM works</td>
                  <td className="p-4"><span className="px-2 py-1 bg-primary/20 text-primary rounded text-xs font-data">ABSTRACT</span></td>
                  <td className="p-4 text-muted-foreground">Visualizes invisible process</td>
                </tr>
                <tr>
                  <td className="p-4 font-ui text-foreground">Customer testimonial</td>
                  <td className="p-4"><span className="px-2 py-1 bg-mineral/20 text-mineral-deep rounded text-xs font-data">FIELD</span></td>
                  <td className="p-4 text-muted-foreground">Authentic environment builds trust</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Avoid Section */}
        <div className="bg-destructive/5 rounded-lg p-6 border border-destructive/20">
          <div className="flex items-center gap-2 mb-4">
            <XCircle className="w-5 h-5 text-destructive" />
            <h4 className="font-ui font-bold text-foreground">Image Types to Avoid</h4>
          </div>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-ui font-semibold text-foreground block mb-2">Generic Stock</span>
              <p className="text-muted-foreground">Smiling engineers in hard hats, hands shaking, abstract blue technology backgrounds</p>
            </div>
            <div>
              <span className="font-ui font-semibold text-foreground block mb-2">Over-Polished Field</span>
              <p className="text-muted-foreground">Industrial settings that look too clean, new, or staged</p>
            </div>
            <div>
              <span className="font-ui font-semibold text-foreground block mb-2">Mixed Messaging</span>
              <p className="text-muted-foreground">Combining field grit with abstract overlays or effects</p>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            PHOTOGRAPHY TREATMENT
         ═══════════════════════════════════════════════════════════════ */}
        <div className="space-y-8 pt-8 border-t border-border">
          <div>
            <div className="flex items-baseline gap-4 md:gap-6 mb-6">
              <span className="font-data text-xs md:text-sm text-muted-foreground">COLOR GRADING</span>
              <div className="h-px flex-1 bg-border max-w-16 md:max-w-24" />
            </div>
            <h3 className="font-ui text-2xl md:text-3xl font-bold text-foreground mb-3">Photography Treatment</h3>
            <p className="text-muted-foreground text-base md:text-lg max-w-3xl">
              Transform raw field photography into brand-consistent imagery using this color grading process.
            </p>
          </div>

          {/* Interactive Before / After Comparisons */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <BeforeAfterSlider
                sourceImage={treatmentBefore}
                beforeLabel="ORIGINAL"
                afterLabel="TREATED"
                imageAlt="Industrial mining site field photography"
                desaturation={0.45}
                contrast={1.2}
                brightness={0.95}
              />
              <div className="flex items-center justify-between">
                <span className="label-tech-sm text-primary">MINING</span>
                <span className="text-xs text-muted-foreground">Warm earth tones → desaturated industrial</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <BeforeAfterSlider
                sourceImage={fieldWastewater}
                beforeLabel="ORIGINAL"
                afterLabel="TREATED"
                imageAlt="Wastewater treatment facility"
                desaturation={0.45}
                contrast={1.2}
                brightness={0.95}
              />
              <div className="flex items-center justify-between">
                <span className="label-tech-sm text-primary">WASTEWATER</span>
                <span className="text-xs text-muted-foreground">Cool blues → unified brand palette</span>
              </div>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground text-center">
            Drag each slider to see the brand treatment applied in real-time — same settings, consistent results
          </p>

          {/* Treatment Details Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-5 bg-muted/30 rounded-lg border border-border">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 rounded-full bg-warning" />
                <span className="font-ui font-semibold text-foreground">Raw Capture</span>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-muted-foreground mt-1">•</span>
                  <span>Full color saturation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-muted-foreground mt-1">•</span>
                  <span>Warm, vibrant earth tones</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-muted-foreground mt-1">•</span>
                  <span>Standard contrast levels</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-muted-foreground mt-1">•</span>
                  <span>No brand color integration</span>
                </li>
              </ul>
            </div>
            
            <div className="p-5 bg-primary/5 rounded-lg border border-primary/20">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="font-ui font-semibold text-foreground">Brand Treatment</span>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Desaturated 40–60%</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Cool gray color grading</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Increased contrast +15–25%</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Selective green accent on displays/LEDs</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Treatment Steps */}
          <div className="bg-card rounded-lg border border-border overflow-hidden">
            <div className="p-6 border-b border-border">
              <h4 className="font-ui font-bold text-foreground">Color Grading Process</h4>
            </div>
            <div className="p-6">
              <div className="grid md:grid-cols-4 gap-6">
                <div className="relative">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="font-data text-sm font-semibold text-primary">01</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground hidden md:block absolute -right-3" />
                  </div>
                  <span className="font-ui font-semibold text-foreground block mb-2">Desaturate</span>
                  <p className="text-sm text-muted-foreground">
                    Reduce saturation by 40–60%. Pull warmth out of earth tones to create neutral gray-brown base.
                  </p>
                </div>
                <div className="relative">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="font-data text-sm font-semibold text-primary">02</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground hidden md:block absolute -right-3" />
                  </div>
                  <span className="font-ui font-semibold text-foreground block mb-2">Cool Shift</span>
                  <p className="text-sm text-muted-foreground">
                    Add slight blue/teal to shadows. Creates industrial, technical atmosphere.
                  </p>
                </div>
                <div className="relative">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="font-data text-sm font-semibold text-primary">03</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground hidden md:block absolute -right-3" />
                  </div>
                  <span className="font-ui font-semibold text-foreground block mb-2">Contrast</span>
                  <p className="text-sm text-muted-foreground">
                    Increase contrast +15–25%. Deepen shadows, preserve midtone detail.
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                      <span className="font-data text-sm font-semibold text-primary-foreground">04</span>
                    </div>
                  </div>
                  <span className="font-ui font-semibold text-foreground block mb-2">Green Accent</span>
                  <p className="text-sm text-muted-foreground">
                    Selectively boost green in displays, LEDs, and indicators using HSL targeting or masking.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Specs */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-muted/30 rounded-lg border border-border">
              <span className="label-tech-sm text-primary block mb-2">SATURATION</span>
              <span className="font-data text-2xl font-light text-foreground">-40% to -60%</span>
              <p className="text-sm text-muted-foreground mt-1">Global desaturation from original</p>
            </div>
            <div className="p-4 bg-muted/30 rounded-lg border border-border">
              <span className="label-tech-sm text-primary block mb-2">CONTRAST</span>
              <span className="font-data text-2xl font-light text-foreground">+15% to +25%</span>
              <p className="text-sm text-muted-foreground mt-1">Increased from baseline</p>
            </div>
            <div className="p-4 bg-muted/30 rounded-lg border border-border">
              <span className="label-tech-sm text-primary block mb-2">GREEN ACCENT</span>
              <span className="font-data text-2xl font-light text-foreground">#33993C</span>
              <p className="text-sm text-muted-foreground mt-1">HSL: 124° 50% 40%</p>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          TEXTURES SECTION
       ═══════════════════════════════════════════════════════════════ */}
      <div className="pt-8">
        <div className="flex items-baseline gap-4 md:gap-6 mb-6">
          <span className="font-data text-xs md:text-sm text-muted-foreground">TEXTURES</span>
          <div className="h-px flex-1 bg-border max-w-16 md:max-w-24" />
        </div>
        <h3 className="font-ui text-2xl md:text-3xl font-bold text-foreground mb-3">Background Textures</h3>
        <p className="text-muted-foreground text-base md:text-lg max-w-3xl mb-10">
          Subtle patterns that reinforce our industrial and technical identity. Use sparingly at low opacity to add depth without competing with content.
        </p>

        {/* Brand Textures */}
        <div className="mb-8">
          <h4 className="label-tech text-primary mb-4">BRAND PATTERNS</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {brandTextures.map((texture) => (
              <div key={texture.name} className="group border border-border rounded-lg overflow-hidden">
                <div className={`${texture.bgClass} relative h-40 md:h-48`}>
                  <div 
                    className={`absolute inset-0 ${texture.opacity}`}
                    style={{ backgroundImage: texture.pattern }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <span className="font-ui font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity text-lg">
                      {texture.name}
                    </span>
                  </div>
                </div>
                <div className="p-4 bg-card">
                  <h4 className="font-ui font-semibold text-foreground mb-1">{texture.name}</h4>
                  <p className="text-muted-foreground text-sm mb-3">{texture.description}</p>
                  <div className="flex items-start gap-2">
                    <span className="label-tech-sm text-primary shrink-0">USE FOR:</span>
                    <span className="text-xs text-muted-foreground">{texture.usage}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Industry Textures */}
        <div>
          <h4 className="label-tech text-muted-foreground mb-4">INDUSTRY-SPECIFIC PATTERNS</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {industryTextures.map((texture) => (
              <div key={texture.name} className="group border border-border rounded-lg overflow-hidden">
                <div className={`${texture.bgClass} relative h-32 md:h-36`}>
                  <div 
                    className={`absolute inset-0 ${texture.opacity}`}
                    style={{ backgroundImage: texture.pattern }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <span className="font-ui font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity text-sm">
                      {texture.name}
                    </span>
                  </div>
                </div>
                <div className="p-3 bg-card">
                  <h4 className="font-ui font-semibold text-foreground text-sm mb-1">{texture.name}</h4>
                  <p className="text-muted-foreground text-xs">{texture.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Texture Usage Rules */}
        <div className="mt-10 p-6 bg-muted/30 rounded-lg border border-border">
          <h4 className="font-ui font-bold text-foreground mb-4">Texture Usage Rules</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <span className="label-tech-sm text-primary block mb-2">OPACITY</span>
              <p className="text-muted-foreground text-sm">
                Keep textures subtle. Use 4–20% opacity for backgrounds. Higher opacity (up to 40%) only for dramatic hero moments.
              </p>
            </div>
            <div>
              <span className="label-tech-sm text-primary block mb-2">LAYERING</span>
              <p className="text-muted-foreground text-sm">
                Never stack multiple textures. One pattern per surface maximum. Combine with solid color overlays for depth.
              </p>
            </div>
            <div>
              <span className="label-tech-sm text-primary block mb-2">CONTEXT MATCHING</span>
              <p className="text-muted-foreground text-sm">
                Match texture to content: Terrain patterns for mining, Flow patterns for wastewater, Precision grids for technical specs.
              </p>
            </div>
            <div>
              <span className="label-tech-sm text-primary block mb-2">ACCESSIBILITY</span>
              <p className="text-muted-foreground text-sm">
                Textures must never reduce text readability. Always test contrast ratios with patterns active.
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Texture Preview */}
        <TexturePreview />
      </div>

      {/* Do's and Don'ts - Side by side comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-border rounded-lg overflow-hidden">
        <div className="p-5 md:p-8 bg-eco-surface md:border-r border-b md:border-b-0 border-border">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-lg">✓</span>
            <h4 className="font-ui font-bold text-xl text-foreground">Do Use</h4>
          </div>
          <ul className="space-y-3">
            {[
              "Real industrial environments with visible wear",
              "Close-ups of measurement displays and data",
              "Workers in proper PPE interacting with equipment",
              "Clean studio shots for product photography",
              "Abstract 3D renders for technology concepts",
              "Subtle textures at low opacity for depth"
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="p-5 md:p-8 bg-error-surface">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-8 bg-error text-white rounded-full flex items-center justify-center text-lg">✕</span>
            <h4 className="font-ui font-bold text-xl text-foreground">Don't Use</h4>
          </div>
          <ul className="space-y-3">
            {[
              "Generic stock photos of businesspeople",
              "Over-saturated 'tech' imagery with lens flares",
              "Cartoonish or overly simplified illustrations",
              "Images with visible competitor branding",
              "Floating holograms or sci-fi aesthetics",
              "Heavy textures that reduce readability"
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                <span className="w-1.5 h-1.5 bg-destructive rounded-full mt-2 flex-shrink-0"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ImageryGuidelines;
