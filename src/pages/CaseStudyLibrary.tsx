import { ContentTypeLibrary } from "@/components/library/ContentTypeLibrary";
import { caseStudyTemplates } from "@/data/templates/case-study";

const CaseStudyLibrary = () => {
  return (
    <ContentTypeLibrary
      type="case-study"
      title="Case Studies"
      description="Customer success stories with metrics and results"
      tableName="visual_case_studies"
      builderRoute="/case-studies/builder"
      templates={caseStudyTemplates}
    />
  );
};

export default CaseStudyLibrary;
