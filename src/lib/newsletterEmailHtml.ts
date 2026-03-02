/**
 * Generates email-ready HTML sections for the R&D Newsletter.
 * Each section can be copied individually or combined into a full email.
 */

import crossMeterImg from "@/assets/newsletter/cross-meter.png";
import crossMeterSettingsImg from "@/assets/newsletter/cross-meter-settings.png";
import ampcImg from "@/assets/newsletter/ampc-visualization.png";

const BRAND = {
  green: "#33993C",
  greenLight: "#f0f9f1",
  obsidian: "#111522",
  white: "#ffffff",
  slate50: "#f8fafc",
  slate100: "#f1f5f9",
  slate200: "#e2e8f0",
  slate400: "#94a3b8",
  foreground: "#111522",
  muted: "#64748b",
  warningBg: "#fffbeb",
  warningBorder: "#f59e0b",
};

const FONTS = `'Instrument Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`;
const FONT_MONO = `'JetBrains Mono', 'Courier New', monospace`;
const FONT_LOGO = `'Unbounded', 'Instrument Sans', sans-serif`;

async function imageToBase64(src: string): Promise<string> {
  try {
    const response = await fetch(src);
    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
  } catch {
    return src;
  }
}

// ── Shared helpers ──

function divider(): string {
  return `<tr><td style="padding: 0 32px;"><table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"><tr><td style="border-top: 1px solid #e2e8f0; font-size: 0; line-height: 0;">&nbsp;</td></tr></table></td></tr>`;
}

function sectionTitle(title: string): string {
  return `<h2 style="margin: 0 0 16px 0; font-family: ${FONTS}; font-size: 16px; font-weight: 700; color: ${BRAND.foreground}; border-left: 4px solid ${BRAND.green}; padding-left: 12px;">${title}</h2>`;
}

function initiativeHtml(name: string, text: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 16px;"><tr><td><h3 style="margin: 0 0 4px 0; font-family: ${FONTS}; font-size: 14px; font-weight: 600; color: ${BRAND.foreground};">${name}</h3><p style="margin: 0; font-family: ${FONTS}; font-size: 14px; line-height: 1.7; color: ${BRAND.muted};">${text}</p></td></tr></table>`;
}

function challengeItemHtml(text: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"><tr><td style="background-color: ${BRAND.warningBg}; border-left: 4px solid ${BRAND.warningBorder}; padding: 12px 16px; border-radius: 0 4px 4px 0;"><p style="margin: 0; font-family: ${FONTS}; font-size: 14px; line-height: 1.7; color: ${BRAND.foreground};">${text}</p></td></tr></table>`;
}

function comingItemHtml(title: string, text: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 12px;"><tr><td><h3 style="margin: 0 0 4px 0; font-family: ${FONTS}; font-size: 14px; font-weight: 600; color: ${BRAND.foreground};">${title}</h3><p style="margin: 0; font-family: ${FONTS}; font-size: 14px; line-height: 1.7; color: ${BRAND.muted};">${text}</p></td></tr></table>`;
}

function p(text: string, mb = 12): string {
  return `<p style="margin: 0 0 ${mb}px 0; font-family: ${FONTS}; font-size: 14px; line-height: 1.7; color: ${BRAND.foreground};">${text}</p>`;
}

// ── Section IDs (used as keys) ──

export type SectionId =
  | "header"
  | "intro"
  | "samsung"
  | "production"
  | "massflow"
  | "calibration"
  | "initiatives"
  | "challenges"
  | "coming"
  | "closing"
  | "footer";

export interface EmailSection {
  id: SectionId;
  label: string;
  html: string;
}

// ── Section generators ──

function headerSection(): EmailSection {
  return {
    id: "header",
    label: "Header",
    html: `<tr><td style="background-color: ${BRAND.obsidian}; padding: 40px 32px; text-align: center;"><h1 style="margin: 0 0 4px 0; font-family: ${FONT_LOGO}; font-size: 22px; font-weight: 600; color: ${BRAND.white}; letter-spacing: -0.02em;">R&amp;D Newsletter</h1><p style="margin: 0; font-family: ${FONT_MONO}; font-size: 11px; color: ${BRAND.slate400}; letter-spacing: 0.15em; text-transform: uppercase;">February 2026</p></td></tr>`,
  };
}

function introSection(): EmailSection {
  return {
    id: "intro",
    label: "Introduction",
    html: `<tr><td class="email-padding" style="padding: 32px 32px 24px 32px;">${p("This was a month of hard work, struggle, and breakthrough. The entire R&amp;D team pushed the CCM-SMART to accuracy levels we've never reached before — because Samsung is about to decide which equipment they'll use to measure H₂O₂ across their semiconductor fabs. If we win this, it could mean hundreds of units and put Rhosonics on the map. Last week, after months of relentless effort, we got there!", 0)}</td></tr>`,
  };
}

function samsungSection(): EmailSection {
  return {
    id: "samsung",
    label: "Samsung Accuracy Push",
    html: `<tr><td class="email-padding" style="padding: 24px 32px;">
${sectionTitle("The Samsung Accuracy Push")}
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 16px;"><tr>
<td class="metric-cell" width="25%" align="center" style="padding: 8px;"><span style="display: block; font-family: ${FONT_MONO}; font-size: 24px; font-weight: 700; color: ${BRAND.green}; line-height: 1;">±0.4%</span><span style="display: block; font-family: ${FONT_MONO}; font-size: 10px; color: ${BRAND.muted}; text-transform: uppercase; letter-spacing: 0.1em; margin-top: 4px;">Before</span></td>
<td class="metric-cell" width="10%" align="center" style="padding: 8px;"><span style="display: block; font-family: ${FONT_MONO}; font-size: 24px; font-weight: 700; color: ${BRAND.green}; line-height: 1;">→</span></td>
<td class="metric-cell" width="25%" align="center" style="padding: 8px;"><span style="display: block; font-family: ${FONT_MONO}; font-size: 24px; font-weight: 700; color: ${BRAND.green}; line-height: 1;">±0.04%</span><span style="display: block; font-family: ${FONT_MONO}; font-size: 10px; color: ${BRAND.muted}; text-transform: uppercase; letter-spacing: 0.1em; margin-top: 4px;">After</span></td>
<td class="metric-cell" width="25%" align="center" style="padding: 8px;"><span style="display: block; font-family: ${FONT_MONO}; font-size: 24px; font-weight: 700; color: ${BRAND.green}; line-height: 1;">10×</span><span style="display: block; font-family: ${FONT_MONO}; font-size: 10px; color: ${BRAND.muted}; text-transform: uppercase; letter-spacing: 0.1em; margin-top: 4px;">Improvement</span></td>
</tr></table>
${p("Samsung is starting a major evaluation in March to select H₂O₂ measurement equipment for their semiconductor lines. Our older CCMs couldn't achieve the required accuracy. R&amp;D had one job: push the CCM-SMART to its absolute limit.")}
${p("The challenge was temperature compensation. H₂O₂ is extremely sensitive to tiny temperature changes, and initial results weren't where they needed to be. The R&amp;D team dove deep — juggling this alongside other demanding tasks such as service cases support. DS-Linetech ran parallel testing and shared results back, accelerating validation.", 16)}
${p("In the end, we achieved a 10× improvement: from ±0.4% down to ±0.04%!!", 16)}
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"><tr><td style="background-color: ${BRAND.greenLight}; border-left: 4px solid ${BRAND.green}; padding: 12px 16px; border-radius: 0 4px 4px 0;"><p style="margin: 0; font-family: ${FONTS}; font-size: 14px; font-weight: 600; color: ${BRAND.foreground}; line-height: 1.5;">A successful test could lead to many sold CCMs and establish Rhosonics in the semiconductor industry.</p></td></tr></table>
</td></tr>`,
  };
}

function productionSection(): EmailSection {
  return {
    id: "production",
    label: "Reducing Production Risks",
    html: `<tr><td class="email-padding" style="padding: 24px 32px;">
${sectionTitle("Reducing Production Risks")}
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 16px;"><tr>
<td class="metric-cell" width="50%" align="center" style="padding: 8px;"><span style="display: block; font-family: ${FONT_MONO}; font-size: 24px; font-weight: 700; color: ${BRAND.green}; line-height: 1;">40</span><span style="display: block; font-family: ${FONT_MONO}; font-size: 10px; color: ${BRAND.muted}; text-transform: uppercase; letter-spacing: 0.1em; margin-top: 4px;">MUA3 boards tested</span></td>
<td class="metric-cell" width="50%" align="center" style="padding: 8px;"><span style="display: block; font-family: ${FONT_MONO}; font-size: 24px; font-weight: 700; color: ${BRAND.green}; line-height: 1;">80%</span><span style="display: block; font-family: ${FONT_MONO}; font-size: 10px; color: ${BRAND.muted}; text-transform: uppercase; letter-spacing: 0.1em; margin-top: 4px;">Issue resolved</span></td>
</tr></table>
${p("Giovanni delivered 40 new MUA3 boards. Because R&amp;D discovered a connectivity issue in previous weeks, we decided to test every board before sending to Production. Same with all the SOMs from F&amp;S. This wasn't scheduled — R&amp;D chose to do this to respect the flow of Production and prevent problems reaching our colleagues.")}
${p("The remaining 20% is trickier because it is inconsistent across MUA3 boards and involves a few problematic ethernet chips. We are working closely with Giovanni.", 0)}
</td></tr>`,
  };
}

function massflowSection(crossMeterB64: string, crossMeterSettingsB64: string): EmailSection {
  return {
    id: "massflow",
    label: "Massflow",
    html: `<tr><td class="email-padding" style="padding: 24px 32px;">
${sectionTitle("Massflow: You Can See It Working")}
${p("The hardware PLC integration is complete, including housing. The SDM-ECO now has the ability to:", 8)}
<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin: 0 0 12px 16px;">
<tr><td style="padding: 2px 0; font-family: ${FONTS}; font-size: 14px; line-height: 1.7; color: ${BRAND.foreground};">• Get a 4–20mA input such as flow rate</td></tr>
<tr><td style="padding: 2px 0; font-family: ${FONTS}; font-size: 14px; line-height: 1.7; color: ${BRAND.foreground};">• Calculate massflow using density and flow rate</td></tr>
<tr><td style="padding: 2px 0; font-family: ${FONTS}; font-size: 14px; line-height: 1.7; color: ${BRAND.foreground};">• Display flow rate and massflow on screen</td></tr>
<tr><td style="padding: 2px 0; font-family: ${FONTS}; font-size: 14px; line-height: 1.7; color: ${BRAND.foreground};">• Output flow rate and massflow through all its communication ports</td></tr>
</table>
${p("Additionally, we developed a <strong>Cross Meter</strong> interface that will help operators in dredging and mining operate their process optimally.", 16)}
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"><tr>
<td class="img-grid-cell" width="50%" style="padding-right: 4px;" valign="top"><img src="${crossMeterB64}" alt="Cross Meter visualization" width="268" style="width: 100%; height: auto; display: block; border: 1px solid ${BRAND.slate200}; border-radius: 4px;" /></td>
<td class="img-grid-cell" width="50%" style="padding-left: 4px;" valign="top"><img src="${crossMeterSettingsB64}" alt="Cross Meter Settings" width="268" style="width: 100%; height: auto; display: block; border: 1px solid ${BRAND.slate200}; border-radius: 4px;" /></td>
</tr></table>
</td></tr>`,
  };
}

function calibrationSection(ampcB64: string): EmailSection {
  return {
    id: "calibration",
    label: "Slurry Calibration Redesign",
    html: `<tr><td class="email-padding" style="padding: 24px 32px;">
${sectionTitle("Slurry Calibration Redesign: Born From the Field")}
${p("Customer visits and multiple service cases kept revealing the same problem: our calibration methods were too complex, too fragile, and gave customers no way to verify whether their calibration was correct. When something looked wrong, they had to call Service or the distributor.")}
${p("So we redesigned calibration for the SDM-ECO from the ground up. The result is two new methods: <strong>aMPC</strong> and <strong>Linear</strong>. Both are smarter, more robust, and — crucially — give the customer visual feedback of how their calibration curve fits their points. If something looks off, they can self-correct on the spot.")}
${p("The <strong>Linear</strong> method provides the same proven calibration as our SDM4, now with visualization of the fit. The <strong>aMPC</strong> goes further with advanced curve fitting for demanding applications.", 16)}
<img src="${ampcB64}" alt="aMPC Visualization" width="536" style="width: 100%; height: auto; display: block; border: 1px solid ${BRAND.slate200}; border-radius: 4px; margin-bottom: 16px;" />
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"><tr>
<td class="dept-cell" width="50%" style="padding-right: 6px;" valign="top"><table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"><tr><td style="background-color: ${BRAND.slate50}; border-radius: 4px; padding: 12px;"><span style="display: block; font-family: ${FONT_MONO}; font-size: 10px; color: ${BRAND.green}; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 700; margin-bottom: 4px;">For Service</span><p style="margin: 0; font-family: ${FONTS}; font-size: 12px; line-height: 1.5; color: ${BRAND.muted};">This should be a game changer. Expect fewer calibration support calls. Customers can see and correct on their own.</p></td></tr></table></td>
<td class="dept-cell" width="50%" style="padding-left: 6px;" valign="top"><table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"><tr><td style="background-color: ${BRAND.slate50}; border-radius: 4px; padding: 12px;"><span style="display: block; font-family: ${FONT_MONO}; font-size: 10px; color: ${BRAND.green}; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 700; margin-bottom: 4px;">For Sales</span><p style="margin: 0; font-family: ${FONTS}; font-size: 12px; line-height: 1.5; color: ${BRAND.muted};">Visual calibration feedback is a strong differentiator.</p></td></tr></table></td>
</tr></table>
</td></tr>`,
  };
}

function initiativesSection(): EmailSection {
  return {
    id: "initiatives",
    label: "New Initiatives",
    html: `<tr><td class="email-padding" style="padding: 24px 32px;">
${sectionTitle("New Initiatives")}
${initiativeHtml("Oyster Project", "We won an MIT grant to research dead oyster detection using ultrasonic technology for Janssen. Frank has started research and testing. A sign our technology reaches far beyond traditional applications.")}
${initiativeHtml("Unified Sensor Design", "We are investigating standardizing sensor architecture across SDM/CCM/CDM. Reduces manufacturing complexity and spare parts.")}
${initiativeHtml("New Conductivity Sensor", "Moved into active development.")}
</td></tr>`,
  };
}

function challengesSection(): EmailSection {
  return {
    id: "challenges",
    label: "The Honest Challenges",
    html: `<tr><td class="email-padding" style="padding: 24px 32px;">
${sectionTitle("The Honest Challenges")}
${challengeItemHtml("We need a test engineer with coding skills. Without this hire, we can't scale our testing capabilities. If you know candidates, send them our way.")}
<div style="height: 12px;"></div>
${challengeItemHtml("Titration equipment and DS-Linetech testing cabinet must be installed in Q1. Delays directly delay CCM-SMART product launch.")}
</td></tr>`,
  };
}

function comingSection(): EmailSection {
  return {
    id: "coming",
    label: "What's Coming in March",
    html: `<tr><td class="email-padding" style="padding: 24px 32px;">
${sectionTitle("What's Coming in March")}
${comingItemHtml("Samsung field testing begins", "We've done everything we can — now we wait and support.")}
${comingItemHtml("aMPC &amp; Linear calibration field testing", "Together with Yellow Solutions after all internal testing is completed.")}
${comingItemHtml("Respect the Flow", "Launching a formal handover process where R&amp;D and Production work side by side on production candidates before they enter real production. Stronger collaboration, better products, less surprises. This initiative will be first applied on the new Massflow implementation, including the new PLC box that needs to be installed inside the SDM-ECO case. After this, we will move into working together to make the CCM-SMART production ready.")}
</td></tr>`,
  };
}

function closingSection(): EmailSection {
  return {
    id: "closing",
    label: "Closing",
    html: `<tr><td class="email-padding" style="padding: 32px; text-align: center;">
${p("This newsletter is a story of the whole team. Every department plays a part in what comes next.", 16)}
<p style="margin: 0; font-family: ${FONTS}; font-size: 14px; font-weight: 600; color: ${BRAND.foreground};">Feel free to reach out to Stefan with questions or ideas.</p>
</td></tr>`,
  };
}

function footerSection(): EmailSection {
  return {
    id: "footer",
    label: "Footer",
    html: `<tr><td style="background-color: ${BRAND.obsidian}; padding: 24px 32px; text-align: center;"><p style="margin: 0; font-family: ${FONT_LOGO}; font-size: 11px; letter-spacing: 0.05em; color: ${BRAND.slate400};">Rhosonics — Ultrasonic Measurement Solutions</p></td></tr>`,
  };
}

// ── Public API ──

/** Get all sections with their email-ready HTML */
export async function getEmailSections(): Promise<EmailSection[]> {
  const [crossMeterB64, crossMeterSettingsB64, ampcB64] = await Promise.all([
    imageToBase64(crossMeterImg),
    imageToBase64(crossMeterSettingsImg),
    imageToBase64(ampcImg),
  ]);

  return [
    headerSection(),
    introSection(),
    samsungSection(),
    productionSection(),
    massflowSection(crossMeterB64, crossMeterSettingsB64),
    calibrationSection(ampcB64),
    initiativesSection(),
    challengesSection(),
    comingSection(),
    closingSection(),
    footerSection(),
  ];
}

/** Get a single section's HTML by ID */
export async function getSectionHtml(id: SectionId): Promise<string> {
  const sections = await getEmailSections();
  const section = sections.find((s) => s.id === id);
  return section?.html ?? "";
}

/** Wrap section HTML in a minimal table container for standalone use */
export function wrapSectionForCopy(sectionHtml: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="max-width: 600px; background-color: ${BRAND.white}; font-family: ${FONTS};">
${sectionHtml}
</table>`;
}

/** Generate the full email HTML (all sections combined) */
export async function generateEmailHtml(): Promise<string> {
  const sections = await getEmailSections();
  const allSectionsHtml = sections
    .map((s, i) => {
      // Add dividers between sections (skip before header and after footer)
      if (i === 0 || i === sections.length - 1) return s.html;
      return divider() + "\n" + s.html;
    })
    .join("\n\n");

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="x-apple-disable-message-reformatting" />
  <meta name="format-detection" content="telephone=no, date=no, address=no, email=no" />
  <title>R&amp;D Newsletter — February 2026</title>
  <!--[if mso]>
  <noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
  <![endif]-->
  <style type="text/css">
    body, table, td, p, a, li { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; }
    body { margin: 0; padding: 0; width: 100% !important; height: 100% !important; }
    a[x-apple-data-detectors] { color: inherit !important; text-decoration: none !important; }
    @media (prefers-color-scheme: dark) { .email-bg { background-color: #1a1a2e !important; } }
    @media only screen and (max-width: 640px) {
      .email-container { width: 100% !important; max-width: 100% !important; }
      .email-padding { padding-left: 20px !important; padding-right: 20px !important; }
      .metric-cell { display: block !important; width: 100% !important; text-align: center !important; padding: 8px 0 !important; }
      .img-grid-cell { display: block !important; width: 100% !important; padding-bottom: 8px !important; }
      .dept-cell { display: block !important; width: 100% !important; padding-bottom: 8px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: ${BRAND.slate100}; font-family: ${FONTS};">
  <div style="display: none; max-height: 0; overflow: hidden; mso-hide: all;">R&amp;D pushed the CCM-SMART to ±0.04% accuracy for Samsung — a 10× improvement.&#847; &#847; &#847; &#847; &#847;</div>
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: ${BRAND.slate100};" class="email-bg">
    <tr>
      <td align="center" style="padding: 32px 16px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" class="email-container" style="max-width: 600px; background-color: ${BRAND.white}; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
${allSectionsHtml}
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
