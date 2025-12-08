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
import { RhosonicsLogo } from "@/components/RhosonicsLogo";

const Index = () => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-background">
      <Navigation />
      
      <main className="flex-1 p-8 md:p-12 lg:p-20 max-w-[1600px] mx-auto w-full relative">
        {/* Subtle grid background */}
        <div className="fixed inset-0 bg-grid opacity-30 pointer-events-none" />
        
        <div className="relative z-10">
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
          <footer className="mt-24 pt-12 border-t border-border">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8">
                  <RhosonicsLogo variant="gradient" />
                </div>
                <div>
                  <div className="label-tech text-muted-foreground">
                    RHOSONICS DESIGN SYSTEM
                  </div>
                  <div className="text-xs text-muted-foreground/60 mt-1">
                    Built for precision. Designed for impact.
                  </div>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Rhosonics. All rights reserved.
              </div>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default Index;
