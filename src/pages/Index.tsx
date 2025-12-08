import { Navigation } from "@/components/brand/Navigation";
import { BrandEthos } from "@/components/brand/BrandEthos";
import { MasterLockup } from "@/components/brand/MasterLockup";
import { MissionVision } from "@/components/brand/MissionVision";
import { ColorMatrix } from "@/components/brand/ColorMatrix";
import { TypographyScale } from "@/components/brand/TypographyScale";
import { SpacingSystem } from "@/components/brand/SpacingSystem";
import { LogoAssets } from "@/components/brand/LogoAssets";
import { IconGuidelines } from "@/components/brand/IconGuidelines";
import { InterfaceKit } from "@/components/brand/InterfaceKit";
import { EcoComponents } from "@/components/brand/EcoComponents";
import { IndustryApplications } from "@/components/brand/IndustryApplications";
import { ImageryGuidelines } from "@/components/brand/ImageryGuidelines";
import { VoiceTone } from "@/components/brand/VoiceTone";
import { MotionDesign } from "@/components/brand/MotionDesign";
import { DosAndDonts } from "@/components/brand/DosAndDonts";

const Index = () => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-background">
      <Navigation />
      
      <main className="flex-1 p-8 md:p-12 lg:p-20 max-w-[1600px] mx-auto w-full">
        <BrandEthos />
        <MasterLockup />
        <MissionVision />
        <ColorMatrix />
        <TypographyScale />
        <SpacingSystem />
        <LogoAssets />
        <IconGuidelines />
        <InterfaceKit />
        <EcoComponents />
        <IndustryApplications />
        <ImageryGuidelines />
        <VoiceTone />
        <MotionDesign />
        <DosAndDonts />
        
        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="label-tech text-muted-foreground">
              RHOSONICS DESIGN SYSTEM V.FINAL
            </div>
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Rhosonics. All rights reserved.
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
