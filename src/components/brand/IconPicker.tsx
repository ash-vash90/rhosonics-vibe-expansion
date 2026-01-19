import { useState, useMemo, useCallback } from "react";
import { Search, Copy, Check, X } from "@/lib/icons";
import type { LucideIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Import all icons for the picker
import {
  // UI Components
  ChevronDown, ChevronRight,
  // Navigation & Menu
  Menu, ArrowLeft, ArrowRight, ExternalLink,
  // Loaders & States
  CheckCircle, AlertCircle, AlertTriangle, XCircle, Info,
  // Actions
  Download, Upload, Trash2, Save, Pencil, Plus, Minus, RefreshCw,
  // Data & Charts
  BarChart3, TrendingUp, TrendingDown, Activity, Target, Table,
  // User & Social
  Star, MessageSquare,
  // Brands & Themes
  Zap,
  // Measurement & Science
  Gauge, Waves, Droplets, Beaker, FlaskConical, Thermometer, Scale, Ruler, Pipette, 
  TestTube2, Atom, CircleDot, Radar,
  // Industry - Core
  Factory, Ship, Anchor, Pickaxe, Cpu, Wrench, Settings,
  // Industry - Mining
  Mountain, Gem, Shovel, HardHat,
  // Industry - Dredging
  Sailboat, Container, Truck,
  // Industry - Semiconductor
  Microchip, CircuitBoard, Plug, Cable, Wifi, Radio,
  // Industry - Wastewater
  Cylinder, Filter, Wind, CloudRain,
  // Industry - Energy
  Fuel, BatteryCharging, Power, PlugZap,
  // Sustainability
  Leaf, Recycle, TreePine, Sprout, Earth,
  // Location
  Building2, MapPin, Globe, Warehouse, Landmark, Map, Navigation2, Compass,
  // Finance
  DollarSign, Trophy, Coins, CreditCard, Receipt, PiggyBank, Briefcase, HandCoins,
  // Badges
  Award, Medal, Crown, BadgeCheck, Verified, ShieldCheck, CircleCheck,
  // Communication
  Mail, Phone, AtSign, Send, MessageCircle, Bell, BellRing, Inbox,
  // Arrows
  ArrowUp, ArrowDown,
  // Design
  Palette, LayoutGrid, Layers, Grid3X3, Box, Hexagon, Square, Triangle, Shapes, Eye,
  // Utility
  Link, Link2, Tag, Tags, Hash, Bookmark, Flag, Pin, QrCode, Code, Shield,
} from "@/lib/icons";

interface IconEntry {
  name: string;
  icon: LucideIcon;
  keywords: string[];
}

interface IconCategory {
  id: string;
  name: string;
  description: string;
  icons: IconEntry[];
}

const iconCategories: IconCategory[] = [
  {
    id: "measurement",
    name: "Measurement",
    description: "Scientific and sensor icons",
    icons: [
      { name: "Gauge", icon: Gauge, keywords: ["meter", "pressure", "dial"] },
      { name: "Waves", icon: Waves, keywords: ["ultrasonic", "sound", "signal"] },
      { name: "Droplets", icon: Droplets, keywords: ["liquid", "water", "fluid"] },
      { name: "Thermometer", icon: Thermometer, keywords: ["temperature", "heat", "cold"] },
      { name: "Scale", icon: Scale, keywords: ["weight", "mass", "balance"] },
      { name: "Ruler", icon: Ruler, keywords: ["measure", "length", "size"] },
      { name: "Pipette", icon: Pipette, keywords: ["sample", "lab", "test"] },
      { name: "Radar", icon: Radar, keywords: ["sensor", "detect", "scan"] },
      { name: "Activity", icon: Activity, keywords: ["flow", "rate", "pulse"] },
      { name: "CircleDot", icon: CircleDot, keywords: ["target", "point", "center"] },
    ],
  },
  {
    id: "science",
    name: "Science & Lab",
    description: "Laboratory and research icons",
    icons: [
      { name: "Beaker", icon: Beaker, keywords: ["chemistry", "lab", "experiment"] },
      { name: "FlaskConical", icon: FlaskConical, keywords: ["chemistry", "lab", "test"] },
      { name: "TestTube2", icon: TestTube2, keywords: ["sample", "lab", "experiment"] },
      { name: "Atom", icon: Atom, keywords: ["science", "physics", "molecule"] },
    ],
  },
  {
    id: "mining",
    name: "Mining",
    description: "Mining and mineral processing",
    icons: [
      { name: "Pickaxe", icon: Pickaxe, keywords: ["mine", "dig", "extract"] },
      { name: "Mountain", icon: Mountain, keywords: ["rock", "minerals", "terrain"] },
      { name: "Gem", icon: Gem, keywords: ["ore", "precious", "mineral"] },
      { name: "Shovel", icon: Shovel, keywords: ["dig", "excavate", "earth"] },
      { name: "HardHat", icon: HardHat, keywords: ["safety", "helmet", "protection"] },
    ],
  },
  {
    id: "dredging",
    name: "Dredging & Marine",
    description: "Maritime and dredging operations",
    icons: [
      { name: "Ship", icon: Ship, keywords: ["vessel", "boat", "marine"] },
      { name: "Anchor", icon: Anchor, keywords: ["marine", "dock", "port"] },
      { name: "Sailboat", icon: Sailboat, keywords: ["boat", "nautical", "water"] },
      { name: "Container", icon: Container, keywords: ["cargo", "shipping", "freight"] },
      { name: "Truck", icon: Truck, keywords: ["transport", "haul", "delivery"] },
    ],
  },
  {
    id: "semiconductor",
    name: "Semiconductor",
    description: "Electronics and chip manufacturing",
    icons: [
      { name: "Cpu", icon: Cpu, keywords: ["processor", "chip", "computer"] },
      { name: "Microchip", icon: Microchip, keywords: ["chip", "electronics", "circuit"] },
      { name: "CircuitBoard", icon: CircuitBoard, keywords: ["pcb", "electronics", "board"] },
      { name: "Plug", icon: Plug, keywords: ["connect", "power", "socket"] },
      { name: "Cable", icon: Cable, keywords: ["wire", "connect", "link"] },
      { name: "Wifi", icon: Wifi, keywords: ["wireless", "signal", "network"] },
      { name: "Radio", icon: Radio, keywords: ["signal", "broadcast", "frequency"] },
    ],
  },
  {
    id: "wastewater",
    name: "Wastewater",
    description: "Water treatment and processing",
    icons: [
      { name: "Cylinder", icon: Cylinder, keywords: ["tank", "container", "storage"] },
      { name: "Filter", icon: Filter, keywords: ["clean", "purify", "strain"] },
      { name: "Wind", icon: Wind, keywords: ["aeration", "air", "flow"] },
      { name: "CloudRain", icon: CloudRain, keywords: ["water", "effluent", "discharge"] },
    ],
  },
  {
    id: "energy",
    name: "Energy & Power",
    description: "Power generation and distribution",
    icons: [
      { name: "Fuel", icon: Fuel, keywords: ["gas", "oil", "petroleum"] },
      { name: "BatteryCharging", icon: BatteryCharging, keywords: ["power", "charge", "energy"] },
      { name: "Power", icon: Power, keywords: ["electricity", "on", "switch"] },
      { name: "PlugZap", icon: PlugZap, keywords: ["electric", "power", "charge"] },
      { name: "Factory", icon: Factory, keywords: ["plant", "industrial", "manufacturing"] },
      { name: "Zap", icon: Zap, keywords: ["lightning", "power", "fast"] },
    ],
  },
  {
    id: "sustainability",
    name: "Sustainability",
    description: "Environmental and eco-friendly",
    icons: [
      { name: "Leaf", icon: Leaf, keywords: ["eco", "green", "nature"] },
      { name: "Recycle", icon: Recycle, keywords: ["reuse", "green", "environment"] },
      { name: "TreePine", icon: TreePine, keywords: ["forest", "nature", "green"] },
      { name: "Sprout", icon: Sprout, keywords: ["grow", "plant", "seed"] },
      { name: "Earth", icon: Earth, keywords: ["planet", "global", "world"] },
    ],
  },
  {
    id: "status",
    name: "Status & Alerts",
    description: "Status indicators and alerts",
    icons: [
      { name: "Check", icon: Check, keywords: ["done", "complete", "yes"] },
      { name: "X", icon: X, keywords: ["close", "cancel", "no"] },
      { name: "CheckCircle", icon: CheckCircle, keywords: ["success", "complete", "done"] },
      { name: "AlertCircle", icon: AlertCircle, keywords: ["warning", "alert", "notice"] },
      { name: "AlertTriangle", icon: AlertTriangle, keywords: ["warning", "danger", "caution"] },
      { name: "XCircle", icon: XCircle, keywords: ["error", "fail", "cancel"] },
      { name: "Info", icon: Info, keywords: ["information", "help", "about"] },
      { name: "CircleCheck", icon: CircleCheck, keywords: ["verified", "approved", "confirmed"] },
    ],
  },
  {
    id: "badges",
    name: "Badges & Awards",
    description: "Achievement and verification icons",
    icons: [
      { name: "Award", icon: Award, keywords: ["prize", "achievement", "winner"] },
      { name: "Medal", icon: Medal, keywords: ["prize", "winner", "champion"] },
      { name: "Crown", icon: Crown, keywords: ["king", "premium", "best"] },
      { name: "Trophy", icon: Trophy, keywords: ["winner", "prize", "champion"] },
      { name: "BadgeCheck", icon: BadgeCheck, keywords: ["verified", "approved", "certified"] },
      { name: "Verified", icon: Verified, keywords: ["authentic", "approved", "confirmed"] },
      { name: "ShieldCheck", icon: ShieldCheck, keywords: ["secure", "protected", "safe"] },
      { name: "Star", icon: Star, keywords: ["favorite", "rating", "featured"] },
    ],
  },
  {
    id: "data",
    name: "Data & Charts",
    description: "Data visualization icons",
    icons: [
      { name: "BarChart3", icon: BarChart3, keywords: ["chart", "graph", "statistics"] },
      { name: "TrendingUp", icon: TrendingUp, keywords: ["increase", "growth", "rising"] },
      { name: "TrendingDown", icon: TrendingDown, keywords: ["decrease", "decline", "falling"] },
      { name: "Target", icon: Target, keywords: ["goal", "aim", "objective"] },
      { name: "Table", icon: Table, keywords: ["data", "grid", "spreadsheet"] },
    ],
  },
  {
    id: "actions",
    name: "Actions",
    description: "Common action icons",
    icons: [
      { name: "Download", icon: Download, keywords: ["save", "export", "get"] },
      { name: "Upload", icon: Upload, keywords: ["import", "send", "put"] },
      { name: "Copy", icon: Copy, keywords: ["duplicate", "clipboard", "paste"] },
      { name: "Save", icon: Save, keywords: ["store", "disk", "keep"] },
      { name: "Pencil", icon: Pencil, keywords: ["edit", "write", "modify"] },
      { name: "Trash2", icon: Trash2, keywords: ["delete", "remove", "discard"] },
      { name: "Plus", icon: Plus, keywords: ["add", "new", "create"] },
      { name: "Minus", icon: Minus, keywords: ["remove", "subtract", "reduce"] },
      { name: "RefreshCw", icon: RefreshCw, keywords: ["reload", "update", "sync"] },
      { name: "Search", icon: Search, keywords: ["find", "lookup", "query"] },
    ],
  },
  {
    id: "navigation",
    name: "Navigation",
    description: "Navigation and direction icons",
    icons: [
      { name: "Menu", icon: Menu, keywords: ["hamburger", "list", "options"] },
      { name: "ArrowLeft", icon: ArrowLeft, keywords: ["back", "previous", "left"] },
      { name: "ArrowRight", icon: ArrowRight, keywords: ["next", "forward", "right"] },
      { name: "ArrowUp", icon: ArrowUp, keywords: ["up", "increase", "top"] },
      { name: "ArrowDown", icon: ArrowDown, keywords: ["down", "decrease", "bottom"] },
      { name: "ChevronDown", icon: ChevronDown, keywords: ["expand", "dropdown", "more"] },
      { name: "ChevronRight", icon: ChevronRight, keywords: ["next", "forward", "expand"] },
      { name: "ExternalLink", icon: ExternalLink, keywords: ["open", "new tab", "external"] },
    ],
  },
  {
    id: "location",
    name: "Location",
    description: "Places and geography",
    icons: [
      { name: "MapPin", icon: MapPin, keywords: ["location", "place", "marker"] },
      { name: "Globe", icon: Globe, keywords: ["world", "international", "global"] },
      { name: "Map", icon: Map, keywords: ["geography", "location", "directions"] },
      { name: "Compass", icon: Compass, keywords: ["direction", "navigate", "north"] },
      { name: "Navigation2", icon: Navigation2, keywords: ["direction", "arrow", "pointer"] },
      { name: "Building2", icon: Building2, keywords: ["office", "company", "business"] },
      { name: "Warehouse", icon: Warehouse, keywords: ["storage", "factory", "depot"] },
      { name: "Landmark", icon: Landmark, keywords: ["bank", "institution", "government"] },
    ],
  },
  {
    id: "business",
    name: "Business",
    description: "Business and finance icons",
    icons: [
      { name: "Briefcase", icon: Briefcase, keywords: ["work", "job", "professional"] },
      { name: "DollarSign", icon: DollarSign, keywords: ["money", "price", "cost"] },
      { name: "Coins", icon: Coins, keywords: ["money", "currency", "payment"] },
      { name: "CreditCard", icon: CreditCard, keywords: ["payment", "card", "purchase"] },
      { name: "Receipt", icon: Receipt, keywords: ["invoice", "bill", "transaction"] },
      { name: "PiggyBank", icon: PiggyBank, keywords: ["savings", "money", "invest"] },
      { name: "HandCoins", icon: HandCoins, keywords: ["pay", "give", "donate"] },
    ],
  },
  {
    id: "communication",
    name: "Communication",
    description: "Contact and messaging icons",
    icons: [
      { name: "Mail", icon: Mail, keywords: ["email", "message", "letter"] },
      { name: "Phone", icon: Phone, keywords: ["call", "telephone", "contact"] },
      { name: "MessageSquare", icon: MessageSquare, keywords: ["chat", "comment", "text"] },
      { name: "MessageCircle", icon: MessageCircle, keywords: ["chat", "bubble", "talk"] },
      { name: "Send", icon: Send, keywords: ["submit", "arrow", "deliver"] },
      { name: "Bell", icon: Bell, keywords: ["notification", "alert", "ring"] },
      { name: "BellRing", icon: BellRing, keywords: ["notification", "alert", "active"] },
      { name: "AtSign", icon: AtSign, keywords: ["email", "mention", "username"] },
      { name: "Inbox", icon: Inbox, keywords: ["messages", "mail", "receive"] },
    ],
  },
  {
    id: "design",
    name: "Design & Layout",
    description: "Design and interface elements",
    icons: [
      { name: "Palette", icon: Palette, keywords: ["color", "design", "art"] },
      { name: "LayoutGrid", icon: LayoutGrid, keywords: ["grid", "layout", "dashboard"] },
      { name: "Layers", icon: Layers, keywords: ["stack", "order", "depth"] },
      { name: "Grid3X3", icon: Grid3X3, keywords: ["grid", "table", "matrix"] },
      { name: "Box", icon: Box, keywords: ["cube", "3d", "container"] },
      { name: "Hexagon", icon: Hexagon, keywords: ["shape", "polygon", "cell"] },
      { name: "Square", icon: Square, keywords: ["shape", "box", "rectangle"] },
      { name: "Triangle", icon: Triangle, keywords: ["shape", "arrow", "delta"] },
      { name: "Shapes", icon: Shapes, keywords: ["geometry", "form", "figure"] },
      { name: "Eye", icon: Eye, keywords: ["view", "visible", "show"] },
    ],
  },
  {
    id: "utility",
    name: "Utility",
    description: "Miscellaneous utility icons",
    icons: [
      { name: "Settings", icon: Settings, keywords: ["gear", "config", "preferences"] },
      { name: "Wrench", icon: Wrench, keywords: ["tool", "fix", "repair"] },
      { name: "Link", icon: Link, keywords: ["url", "connect", "chain"] },
      { name: "Link2", icon: Link2, keywords: ["url", "connect", "chain"] },
      { name: "Tag", icon: Tag, keywords: ["label", "category", "price"] },
      { name: "Tags", icon: Tags, keywords: ["labels", "categories", "multiple"] },
      { name: "Hash", icon: Hash, keywords: ["number", "hashtag", "code"] },
      { name: "Bookmark", icon: Bookmark, keywords: ["save", "favorite", "mark"] },
      { name: "Flag", icon: Flag, keywords: ["mark", "report", "country"] },
      { name: "Pin", icon: Pin, keywords: ["attach", "stick", "location"] },
      { name: "QrCode", icon: QrCode, keywords: ["scan", "code", "barcode"] },
      { name: "Code", icon: Code, keywords: ["programming", "develop", "html"] },
      { name: "Shield", icon: Shield, keywords: ["security", "protect", "safe"] },
    ],
  },
];

interface IconPickerProps {
  onSelect?: (iconName: string, Icon: LucideIcon) => void;
  className?: string;
}

export const IconPicker = ({ onSelect, className }: IconPickerProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [copiedIcon, setCopiedIcon] = useState<string | null>(null);

  // Filter icons based on search and category
  const filteredCategories = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    
    return iconCategories
      .filter(category => !selectedCategory || category.id === selectedCategory)
      .map(category => ({
        ...category,
        icons: category.icons.filter(icon => {
          if (!query) return true;
          return (
            icon.name.toLowerCase().includes(query) ||
            icon.keywords.some(kw => kw.includes(query))
          );
        }),
      }))
      .filter(category => category.icons.length > 0);
  }, [searchQuery, selectedCategory]);

  const totalIcons = useMemo(() => {
    return filteredCategories.reduce((sum, cat) => sum + cat.icons.length, 0);
  }, [filteredCategories]);

  const handleCopySvg = useCallback((iconName: string, Icon: LucideIcon) => {
    // Use ReactDOMServer to render the icon and get its SVG markup
    import('react-dom/server').then(({ renderToStaticMarkup }) => {
      const iconMarkup = renderToStaticMarkup(<Icon />);
      navigator.clipboard.writeText(iconMarkup);
      setCopiedIcon(iconName);
      setTimeout(() => setCopiedIcon(null), 2000);
    });
  }, []);

  const handleSelectIcon = useCallback((iconName: string, Icon: LucideIcon) => {
    onSelect?.(iconName, Icon);
    handleCopySvg(iconName, Icon);
  }, [onSelect, handleCopySvg]);

  return (
    <div className={cn("space-y-6", className)}>
      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search icons..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
            aria-label="Search icons"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
          <button
            onClick={() => setSelectedCategory(null)}
            className={cn(
              "px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors",
              !selectedCategory
                ? "bg-primary text-white"
                : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
            )}
          >
            All
          </button>
          {iconCategories.slice(0, 6).map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(
                selectedCategory === category.id ? null : category.id
              )}
              className={cn(
                "px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors",
                selectedCategory === category.id
                  ? "bg-primary text-white"
                  : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
              )}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          {totalIcons} icon{totalIcons !== 1 ? "s" : ""} found
        </span>
        {searchQuery && (
          <span className="text-muted-foreground">
            Searching: "<span className="text-foreground">{searchQuery}</span>"
          </span>
        )}
      </div>

      {/* Category Tabs (Full list) */}
      <div className="border border-border rounded-lg overflow-hidden">
        <div className="bg-muted/50 px-4 py-3 border-b border-border">
          <div className="flex flex-wrap gap-2">
            {iconCategories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(
                  selectedCategory === category.id ? null : category.id
                )}
                className={cn(
                  "px-2.5 py-1 text-xs font-medium rounded transition-colors",
                  selectedCategory === category.id
                    ? "bg-primary text-white"
                    : "text-muted-foreground hover:text-foreground hover:bg-background"
                )}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Icons Grid */}
        <div className="p-4 max-h-[500px] overflow-y-auto">
          {filteredCategories.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground">
              <Search className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p>No icons found matching "{searchQuery}"</p>
              <button
                onClick={() => setSearchQuery("")}
                className="mt-2 text-primary text-sm hover:underline"
              >
                Clear search
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              {filteredCategories.map(category => (
                <div key={category.id}>
                  <div className="flex items-center gap-3 mb-4">
                    <h4 className="font-ui font-semibold text-sm text-foreground">
                      {category.name}
                    </h4>
                    <span className="text-xs text-muted-foreground">
                      {category.icons.length} icons
                    </span>
                    <div className="h-px flex-1 bg-border" />
                  </div>
                  
                  <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
                    {category.icons.map(({ name, icon: Icon }) => (
                      <TooltipProvider key={name} delayDuration={300}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              onClick={() => handleSelectIcon(name, Icon)}
                              className={cn(
                                "group relative aspect-square flex flex-col items-center justify-center gap-1 p-2 rounded-lg border border-transparent",
                                "hover:border-primary hover:bg-primary/5 transition-all",
                                "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
                                copiedIcon === name && "border-primary bg-primary/10"
                              )}
                              aria-label={`${name} icon`}
                            >
                              <Icon className="w-5 h-5 text-foreground group-hover:text-primary transition-colors" />
                              <span className="text-[10px] text-muted-foreground truncate w-full text-center group-hover:text-primary transition-colors">
                                {name}
                              </span>
                              
                              {/* Copy indicator */}
                              {copiedIcon === name && (
                                <div className="absolute inset-0 flex items-center justify-center bg-primary/90 rounded-lg">
                                  <Check className="w-4 h-4 text-white" />
                                </div>
                              )}
                              
                              {/* Hover copy icon */}
                              <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Copy className="w-3 h-3 text-muted-foreground" />
                              </div>
                            </button>
                          </TooltipTrigger>
                          <TooltipContent 
                            side="top" 
                            className="p-3 bg-rho-obsidian border-rho-obsidian/50"
                          >
                            <div className="flex flex-col items-center gap-2">
                              <div className="p-3 bg-white/10 rounded-lg">
                                <Icon className="w-8 h-8 text-white" />
                              </div>
                              <div className="text-center">
                                <p className="font-ui font-semibold text-white text-sm">{name}</p>
                                <p className="text-[10px] text-white/60 mt-1">Click to copy SVG</p>
                              </div>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Usage Instructions */}
      <div className="bg-muted/50 rounded-lg p-4 border border-border">
        <h4 className="font-ui font-semibold text-sm text-foreground mb-2">Usage</h4>
        <p className="text-xs text-muted-foreground">
          Hover over any icon to see a preview. Click to copy the SVG markup to your clipboard.
        </p>
      </div>
    </div>
  );
};

export default IconPicker;
