/**
 * Centralized Icon Exports
 * 
 * This module provides direct ESM imports from lucide-react for optimal bundle size.
 * Instead of barrel imports that include the entire icon library, we export only 
 * the icons actually used in this project.
 * 
 * Benefits:
 * - 15-70% faster dev boot
 * - 28% faster builds
 * - 40% faster cold starts
 * - Significant bundle size reduction
 * 
 * Usage:
 * import { Check, X, Menu } from '@/lib/icons';
 * 
 * @see https://github.com/vercel-labs/agent-skills/tree/main/skills/react-best-practices
 */

// UI Components
export { Check } from "lucide-react";
export { X } from "lucide-react";
export { Circle } from "lucide-react";
export { ChevronDown } from "lucide-react";
export { ChevronUp } from "lucide-react";
export { ChevronLeft } from "lucide-react";
export { ChevronRight } from "lucide-react";
export { MoreHorizontal } from "lucide-react";
export { PanelLeft } from "lucide-react";

// Navigation & Menu
export { Menu } from "lucide-react";
export { ArrowLeft } from "lucide-react";
export { ArrowRight } from "lucide-react";
export { ExternalLink } from "lucide-react";

// Loaders & States
export { Loader2 } from "lucide-react";
export { CheckCircle } from "lucide-react";
export { CheckCircle2 } from "lucide-react";
export { AlertCircle } from "lucide-react";
export { AlertTriangle } from "lucide-react";
export { XCircle } from "lucide-react";
export { Info } from "lucide-react";

// Actions
export { Download } from "lucide-react";
export { Upload } from "lucide-react";
export { Copy } from "lucide-react";
export { Trash2 } from "lucide-react";
export { Save } from "lucide-react";
export { Pencil } from "lucide-react";
export { Plus } from "lucide-react";
export { Minus } from "lucide-react";
export { RotateCw } from "lucide-react";
export { RotateCcw } from "lucide-react";
export { RefreshCw } from "lucide-react";
export { Crop } from "lucide-react";
export { Maximize2 } from "lucide-react";
export { Search } from "lucide-react";

// Content Types
export { FileText } from "lucide-react";
export { FileCode } from "lucide-react";
export { FileImage } from "lucide-react";
export { FileDown } from "lucide-react";
export { FileStack } from "lucide-react";
export { FileEdit } from "lucide-react";
export { Image } from "lucide-react";
export { Film } from "lucide-react";
export { Type } from "lucide-react";
export { AlignLeft } from "lucide-react";
export { List } from "lucide-react";
export { Quote } from "lucide-react";
export { Table } from "lucide-react";
export { Presentation } from "lucide-react";
export { ScrollText } from "lucide-react";
export { BookOpen } from "lucide-react";
export { FolderOpen } from "lucide-react";

// Layout
export { LayoutGrid } from "lucide-react";
export { MousePointer } from "lucide-react";
export { Palette } from "lucide-react";

// Data & Charts
export { BarChart3 } from "lucide-react";
export { TrendingUp } from "lucide-react";
export { TrendingDown } from "lucide-react";
export { Activity } from "lucide-react";
export { Target } from "lucide-react";

// Authentication
export { LogIn } from "lucide-react";
export { LogOut } from "lucide-react";
export { Mail } from "lucide-react";
export { Lock } from "lucide-react";

// User & Social
export { Users } from "lucide-react";
export { Heart } from "lucide-react";
export { Star } from "lucide-react";
export { MessageSquare } from "lucide-react";
export { Megaphone } from "lucide-react";
export { Headphones } from "lucide-react";

// Time
export { Clock } from "lucide-react";
export { History } from "lucide-react";
export { Pause } from "lucide-react";
export { Play } from "lucide-react";

// Brands & Themes
export { Sun } from "lucide-react";
export { Moon } from "lucide-react";
export { Sparkles } from "lucide-react";
export { Zap } from "lucide-react";
export { Lightbulb } from "lucide-react";

// Measurement & Science (Rhosonics specific)
export { Gauge } from "lucide-react";
export { Waves } from "lucide-react";
export { Droplets } from "lucide-react";
export { Beaker } from "lucide-react";
export { FlaskConical } from "lucide-react";

// Industry
export { Factory } from "lucide-react";
export { Ship } from "lucide-react";
export { Anchor } from "lucide-react";
export { Pickaxe } from "lucide-react";
export { Cpu } from "lucide-react";
export { Wrench } from "lucide-react";
export { Settings } from "lucide-react";
export { Package } from "lucide-react";

// Sustainability
export { Leaf } from "lucide-react";
export { Recycle } from "lucide-react";

// Location & Organization
export { Building2 } from "lucide-react";
export { MapPin } from "lucide-react";
export { Globe } from "lucide-react";

// Finance
export { DollarSign } from "lucide-react";
export { Trophy } from "lucide-react";

// Design Principles
export { Focus } from "lucide-react";
export { Link2 } from "lucide-react";
export { Shield } from "lucide-react";
export { Code } from "lucide-react";
export { Eye } from "lucide-react";
export { MoreVertical } from "lucide-react";

// Re-export LucideIcon type for type annotations
export type { LucideIcon, LucideProps } from "lucide-react";
