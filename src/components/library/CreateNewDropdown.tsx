import { Plus, FileText, Presentation } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const CONTENT_TYPES = [
  {
    id: "case-studies",
    label: "Case Study",
    description: "Customer success story with metrics",
    icon: FileText,
    route: "/case-studies/builder",
  },
  {
    id: "presentations",
    label: "Presentation",
    description: "Slide deck for sales or marketing",
    icon: Presentation,
    route: "/presentations/builder",
  },
];

interface CreateNewDropdownProps {
  className?: string;
}

export const CreateNewDropdown = ({ className }: CreateNewDropdownProps) => {
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className={className}>
          <Plus className="w-4 h-4 mr-2" />
          Create New
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        {CONTENT_TYPES.map((type) => {
          const Icon = type.icon;
          return (
            <DropdownMenuItem
              key={type.id}
              onClick={() => navigate(type.route)}
              className="flex items-start gap-3 p-3 cursor-pointer"
            >
              <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                <Icon className="w-4 h-4" />
              </div>
              <div>
                <div className="font-medium text-foreground">{type.label}</div>
                <div className="text-xs text-muted-foreground">
                  {type.description}
                </div>
              </div>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
