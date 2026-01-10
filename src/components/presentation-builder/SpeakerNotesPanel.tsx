import { useState } from "react";
import { ChevronDown, ChevronUp, StickyNote } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

interface SpeakerNotesPanelProps {
  notes: string;
  onChange: (notes: string) => void;
}

export function SpeakerNotesPanel({ notes, onChange }: SpeakerNotesPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  const charCount = notes?.length || 0;
  const wordCount = notes?.trim() ? notes.trim().split(/\s+/).length : 0;

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="border-t border-border bg-card">
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          className="w-full h-10 flex items-center justify-between px-4 rounded-none hover:bg-muted/50"
        >
          <div className="flex items-center gap-2">
            <StickyNote className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-ui font-medium">Speaker Notes</span>
            {charCount > 0 && (
              <span className="text-xs text-muted-foreground">
                ({wordCount} words)
              </span>
            )}
          </div>
          {isOpen ? (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronUp className="h-4 w-4 text-muted-foreground" />
          )}
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="p-4 pt-0">
          <Textarea
            value={notes || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Add speaker notes for this slide... These notes will be visible in presenter view and exported with the presentation."
            className={cn(
              "min-h-[120px] resize-none font-ui text-sm",
              "bg-background border-border focus:border-primary"
            )}
          />
          <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
            <span>Notes are saved automatically</span>
            <span>{charCount} characters</span>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
