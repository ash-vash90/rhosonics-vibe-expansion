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
import { Zap } from "lucide-react";

const Index = () => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-background">
      <Navigation />
      
      <main className="flex-1 p-8 md:p-12 lg:p-16 xl:p-20 max-w-[1400px] mx-auto w-full">
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
        <footer className="mt-20 pt-8 border-t-2 border-slate-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-slate-100 flex items-center justify-center chamfer-sm">
                <RhosonicsLogo variant="gradient" className="w-5 h-5" />
              </div>
              <div>
                <span className="label-tech text-slate-600">
                  RHOSONICS DESIGN SYSTEM
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Zap className="w-4 h-4 text-primary" />
              <span>© {new Date().getFullYear()} Rhosonics. All rights reserved.</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
