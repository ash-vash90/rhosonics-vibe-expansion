import { ContentTypeLibrary } from "@/components/library/ContentTypeLibrary";
import { presentationTemplates } from "@/data/templates/presentation";

const PresentationLibrary = () => {
  return (
    <ContentTypeLibrary
      type="presentation"
      title="Presentations"
      description="Slide decks for sales and marketing"
      tableName="presentations"
      builderRoute="/presentations/builder"
      templates={presentationTemplates}
    />
  );
};

export default PresentationLibrary;
