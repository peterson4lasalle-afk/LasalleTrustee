import { jsPDF } from 'jspdf';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

// ============================================================================
// CMYK Color Constants (0.0 to 1.0)
// Matched exactly to the campaign design:
// - Deep Petrol Teal: (#003b46 / #002c33)
// - Signature GECDSB Teal: (#005961)
// - Warm Amber Gold: (#f59e0b / #fbbf24)
// ============================================================================
const CMYK = {
  // Pure K100 for black type: C0, M0, Y0, K100
  BLACK: [0, 0, 0, 1.0],
  
  // Clean white
  WHITE: [0, 0, 0, 0],

  // Deep Petrol Teal Header & Footer Background
  GECDSB_950: [0.95, 0.25, 0.35, 0.70],

  // Signature GECDSB Teal for titles, circles, borders
  GECDSB_TEAL: [0.95, 0.15, 0.35, 0.40],

  // Warm Amber Gold Accent (#f59e0b / #fbbf24)
  AMBER_GOLD: [0.0, 0.30, 0.95, 0.02],

  // Soft Pale Blue-Gray Card Fill for Platform Cards (#ebf1f3)
  CARD_BG: [0.08, 0.02, 0.03, 0.04],

  // Soft Pale Teal Fill for Badges/Pills (#e8f4f4)
  PILL_BG: [0.07, 0.01, 0.03, 0.02],
};

function prepareCMYKHeadshot() {
  const src = path.resolve('public/candidate-headshot.jpg');
  const dest = path.resolve('public/candidate-headshot-cmyk-300dpi.jpg');
  
  console.log('Preparing 300 DPI CMYK headshot...');
  // Crop North, scale to 345x450 (1.15" x 1.50" @ 300 DPI), convert to CMYK
  execSync(
    `convert "${src}" -gravity North -crop 1011x1320+0+0 +repage -resize 345x450! -colorspace CMYK -density 300 -units PixelsPerInch "${dest}"`
  );
  console.log('CMYK 300 DPI headshot created successfully:', dest);
  return dest;
}

// ============================================================================
// SHARED HEADER BAR (Deep Teal + Let's Put Students First + Vote Peterson button)
// ============================================================================
function drawHeader(doc) {
  // Deep Petrol Teal Header Bar (0 to 6.0", 0 to 0.58")
  doc.setFillColor(...CMYK.GECDSB_950);
  doc.rect(0, 0, 6, 0.58, 'F');

  // Amber Gold accent divider line below header
  doc.setFillColor(...CMYK.AMBER_GOLD);
  doc.rect(0, 0.58, 6, 0.025, 'F');

  // Top Line: Adam Peterson for GECDSB Trustee: LaSalle & Amherstburg
  doc.setTextColor(...CMYK.WHITE);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.6);
  doc.text('Adam Peterson for GECDSB Trustee: LaSalle & Amherstburg', 0.35, 0.23);

  // Main Slogan Line: Let's Put Students First (in elegant bold serif)
  doc.setFont('times', 'bold');
  doc.setFontSize(14.5);
  doc.text("Let’s Put Students First", 0.35, 0.47);

  // Right Gold/Amber Button: Vote Peterson
  const btnW = 1.30;
  const btnH = 0.30;
  const btnX = 4.35;
  const btnY = 0.15;
  doc.setFillColor(...CMYK.AMBER_GOLD);
  doc.roundedRect(btnX, btnY, btnW, btnH, 0.035, 0.035, 'F');

  doc.setTextColor(...CMYK.GECDSB_950);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.6);
  doc.text('Vote Peterson', btnX + btnW / 2, btnY + 0.19, { align: 'center' });
}

// ============================================================================
// SHARED FOOTER STRIP (Amber divider + Deep Teal + Centered Website & Email)
// ============================================================================
function drawFooter(doc) {
  // Top Amber accent border
  doc.setFillColor(...CMYK.AMBER_GOLD);
  doc.rect(0, 3.58, 6, 0.025, 'F');

  // Deep Teal footer bar (0 to 6.0", 3.605" to 4.0")
  doc.setFillColor(...CMYK.GECDSB_950);
  doc.rect(0, 3.605, 6, 0.395, 'F');

  // Centered contact links
  doc.setTextColor(...CMYK.WHITE);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.6);
  doc.text('www.petersonforlasalle.com', 3.0, 3.76, { align: 'center' });
  doc.text('Peterson4LaSalle@gmail.com', 3.0, 3.91, { align: 'center' });
}

// ============================================================================
// FRONT POSTCARD (CORE PLATFORM - Matching Postcard1.png)
// ============================================================================
function generateFrontRawPDF(rawOutputPath) {
  console.log('Generating Front side raw PDF (Core Platform)...');
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'in',
    format: [6, 4]
  });

  // Background: clean white
  doc.setFillColor(...CMYK.WHITE);
  doc.rect(0, 0, 6, 4, 'F');

  // Header
  drawHeader(doc);

  // Section Title: CORE PLATFORM
  doc.setTextColor(...CMYK.BLACK);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.6);
  doc.text('CORE PLATFORM', 0.38, 0.79);

  // 3 Rounded Platform Cards
  const cardX = 0.38;
  const cardW = 5.24;
  const cardH = 0.77;

  const platformCards = [
    {
      num: '1',
      title: 'Focus on Student Success',
      cardY: 0.88,
      bullets: [
        { label: 'Evidence Based Academics:', text: 'Boost foundational skills' },
        { label: 'Student Well Being & Safety:', text: 'Foster inclusive, positive & safe environments' },
        { label: 'Equitable Opportunity:', text: 'Equal access to specialized programs' }
      ]
    },
    {
      num: '2',
      title: 'Collaboration, Not Division',
      cardY: 1.74,
      bullets: [
        { label: 'Consensus Based Governance:', text: 'Finding common ground' },
        { label: 'Strengthen Community Partnerships:', text: 'Build active & meaningful relationships' },
        { label: 'Respect:', text: 'Ensure clear boundaries exist for the board and administrators' }
      ]
    },
    {
      num: '3',
      title: 'Transparency and Responsibility',
      cardY: 2.60,
      bullets: [
        { label: 'Fiscal Stewardship:', text: 'Ensure funds are allocated efficiently' },
        { label: 'Open Community Consultation:', text: 'Engage with parents, students, and community' },
        { label: 'Clear Policy & Accountability:', text: 'Evaluate and report on goals direct to the public' }
      ]
    }
  ];

  platformCards.forEach((c) => {
    // Card background fill
    doc.setFillColor(...CMYK.CARD_BG);
    doc.roundedRect(cardX, c.cardY, cardW, cardH, 0.06, 0.06, 'F');

    // Number circle: dark teal circle with white text
    const circleCenterX = cardX + 0.18;
    const circleCenterY = c.cardY + 0.16;
    doc.setFillColor(...CMYK.GECDSB_TEAL);
    doc.circle(circleCenterX, circleCenterY, 0.08, 'F');

    doc.setTextColor(...CMYK.WHITE);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.8);
    doc.text(c.num, circleCenterX, circleCenterY + 0.03, { align: 'center' });

    // Title next to circle in bold dark teal
    doc.setTextColor(...CMYK.GECDSB_TEAL);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.0);
    doc.text(c.title, cardX + 0.32, c.cardY + 0.19);

    // 3 Bullets
    const bulletDotX = cardX + 0.33;
    const bulletTextX = cardX + 0.43;
    const bulletSpacing = 0.14;

    c.bullets.forEach((b, bIdx) => {
      const bY = c.cardY + 0.35 + bIdx * bulletSpacing;

      // Small black bullet dot
      doc.setFillColor(...CMYK.BLACK);
      doc.circle(bulletDotX, bY - 0.025, 0.014, 'F');

      // Bold label
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.3);
      doc.setTextColor(...CMYK.BLACK);
      doc.text(b.label, bulletTextX, bY);

      // Normal text following label
      const labelW = doc.getTextWidth(b.label);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.3);
      const spaceW = doc.getTextWidth(' ');
      doc.text(b.text, bulletTextX + labelW + spaceW, bY);
    });
  });

  // Footer
  drawFooter(doc);

  // Save Raw PDF
  const buffer = Buffer.from(doc.output('arraybuffer'));
  fs.writeFileSync(rawOutputPath, buffer);
  console.log(`Front raw PDF generated: ${rawOutputPath} (${buffer.length} bytes)`);
}

// ============================================================================
// BACK POSTCARD (Vision, Perspective, Leadership, Photo & Pills - Postcard.png)
// ============================================================================
function generateBackRawPDF(cmykImagePath, rawOutputPath) {
  console.log('Generating Back side raw PDF (Vision, Perspective, Leadership)...');
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'in',
    format: [6, 4]
  });

  // Background: clean white
  doc.setFillColor(...CMYK.WHITE);
  doc.rect(0, 0, 6, 4, 'F');

  // Header
  drawHeader(doc);

  // -------------------------------------------------------------------------
  // LEFT COLUMN: CANDIDATE HEADSHOT WITH AMBER BORDER
  // -------------------------------------------------------------------------
  const photoX = 0.38;
  const photoY = 0.90;
  const photoW = 1.15;
  const photoH = 1.50;

  // Embed CMYK 300 DPI raster photo
  const imgData = fs.readFileSync(cmykImagePath).toString('base64');
  doc.addImage(`data:image/jpeg;base64,${imgData}`, 'JPEG', photoX, photoY, photoW, photoH);

  // Amber Gold border around photo
  doc.setDrawColor(...CMYK.AMBER_GOLD);
  doc.setLineWidth(0.025);
  doc.rect(photoX, photoY, photoW, photoH, 'D');

  // -------------------------------------------------------------------------
  // RIGHT COLUMN: VISION, PERSPECTIVE, LEADERSHIP
  // -------------------------------------------------------------------------
  const rightX = 1.70;
  const rightW = 3.92;

  // 1. Vision
  doc.setTextColor(...CMYK.GECDSB_TEAL);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.2);
  doc.text('Vision', rightX, 0.97);

  doc.setTextColor(...CMYK.BLACK);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.text('Every single child in our community deserves a best-in-class education.', rightX, 1.13);

  // 2. Perspective
  doc.setTextColor(...CMYK.GECDSB_TEAL);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.2);
  doc.text('Perspective', rightX, 1.45);

  doc.setTextColor(...CMYK.BLACK);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  const pLines = doc.splitTextToSize(
    'I experience our school system every day as a local parent, a former college professor, and as part of a family of dedicated educators.',
    rightW
  );
  doc.text(pLines, rightX, 1.61, { lineHeightFactor: 1.35 });

  // 3. Leadership
  doc.setTextColor(...CMYK.GECDSB_TEAL);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.2);
  doc.text('Leadership', rightX, 2.12);

  doc.setTextColor(...CMYK.BLACK);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  const lLines = doc.splitTextToSize(
    "Progress isn't just about promises. It's about practical leadership, classroom support, applying 20 years of management and director experience toward strong fiscal stewardship.",
    rightW
  );
  doc.text(lLines, rightX, 2.28, { lineHeightFactor: 1.35 });

  // -------------------------------------------------------------------------
  // BOTTOM ROW: 4 HORIZONTAL PILL BADGES
  // Parent, Educator, Leader, Integrity
  // -------------------------------------------------------------------------
  const pillsY = 2.92;
  const pillH = 0.26;
  const pillW = 1.22;
  const pillGap = 0.12;
  const pills = ['Parent', 'Educator', 'Leader', 'Integrity'];

  pills.forEach((label, i) => {
    const px = 0.38 + i * (pillW + pillGap);

    // Pill background fill & dark teal border
    doc.setFillColor(...CMYK.PILL_BG);
    doc.setDrawColor(...CMYK.GECDSB_TEAL);
    doc.setLineWidth(0.014);
    doc.roundedRect(px, pillsY, pillW, pillH, 0.035, 0.035, 'FD');

    // Centered label
    doc.setTextColor(...CMYK.GECDSB_TEAL);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.0);
    doc.text(label, px + pillW / 2, pillsY + 0.175, { align: 'center' });
  });

  // Footer
  drawFooter(doc);

  // Save Raw PDF
  const buffer = Buffer.from(doc.output('arraybuffer'));
  fs.writeFileSync(rawOutputPath, buffer);
  console.log(`Back raw PDF generated: ${rawOutputPath} (${buffer.length} bytes)`);
}

// ============================================================================
// Post-Processing with Ghostscript:
// 1. Outlines all fonts (-dNoOutputFonts=true) -> 0 embedded fonts
// 2. Strict Prepress CMYK conversion (-sProcessColorModel=DeviceCMYK)
// 3. BleedBox: 6" x 4" [0 0 432 288], TrimBox: 5.875" x 3.875" [4.5 4.5 427.5 283.5]
// 4. MediaBox: 6" x 4" [0 0 432 288]
// ============================================================================
function finalizePrepressPDF(inputPath, outputPath) {
  console.log(`Finalizing prepress PDF: ${outputPath}...`);
  const gsCmd = [
    'gs',
    `-o "${outputPath}"`,
    '-sDEVICE=pdfwrite',
    '-dPDFSETTINGS=/prepress',
    '-dNoOutputFonts=true',
    '-sProcessColorModel=DeviceCMYK',
    '-sColorConversionStrategy=CMYK',
    '-dOverrideICC=true',
    '-dDEVICEWIDTHPOINTS=432',
    '-dDEVICEHEIGHTPOINTS=288',
    '-dFIXEDMEDIA',
    '-c "[/BleedBox [0 0 432 288] /TrimBox [4.5 4.5 427.5 283.5] /PAGE pdfmark"',
    `-f "${inputPath}"`
  ].join(' ');

  execSync(gsCmd);
  console.log(`Prepress PDF successfully compiled: ${outputPath}`);
}

async function main() {
  const cmykImage = prepareCMYKHeadshot();

  const tmpFrontRaw = '/tmp/postcard-front-raw.pdf';
  const tmpBackRaw = '/tmp/postcard-back-raw.pdf';

  // Generate raw single-page PDFs
  generateFrontRawPDF(tmpFrontRaw);
  generateBackRawPDF(cmykImage, tmpBackRaw);

  // Output paths for the two separate files
  const frontFinal = path.resolve('public/adam-peterson-postcard-front.pdf');
  const backFinal = path.resolve('public/adam-peterson-postcard-back.pdf');

  // Convert to production-ready outlined CMYK prepress PDFs
  finalizePrepressPDF(tmpFrontRaw, frontFinal);
  finalizePrepressPDF(tmpBackRaw, backFinal);

  // Also create convenient standard aliases
  fs.copyFileSync(frontFinal, path.resolve('public/postcard-front.pdf'));
  fs.copyFileSync(backFinal, path.resolve('public/postcard-back.pdf'));

  // Also maintain the 2-page combined version for convenience
  console.log('Creating combined 2-page outlined prepress PDF...');
  const combinedRaw = '/tmp/postcard-combined-raw.pdf';
  execSync(`gs -dNOPAUSE -dBATCH -sDEVICE=pdfwrite -sOutputFile="${combinedRaw}" "${tmpFrontRaw}" "${tmpBackRaw}"`);
  const combinedFinal = path.resolve('public/adam-peterson-4x6-postcard.pdf');
  finalizePrepressPDF(combinedRaw, combinedFinal);
  fs.copyFileSync(combinedFinal, path.resolve('public/4x6-postcard-platform.pdf'));

  // Automatically generate fresh 300 DPI preview PNGs for UI modal
  console.log('Rendering 300 DPI preview PNGs for UI modal...');
  const frontPreview = path.resolve('public/postcard-front-preview.png');
  const backPreview = path.resolve('public/postcard-back-preview.png');
  execSync(`gs -dSAFER -dBATCH -dNOPAUSE -sDEVICE=png16m -r300 -o "${frontPreview}" "${frontFinal}"`);
  execSync(`gs -dSAFER -dBATCH -dNOPAUSE -sDEVICE=png16m -r300 -o "${backPreview}" "${backFinal}"`);
  console.log('Preview PNGs generated successfully.');

  console.log('\n======================================================');
  console.log('ALL PREPRESS POSTCARD FILES GENERATED SUCCESSFULLY:');
  console.log('1. Front Side: public/adam-peterson-postcard-front.pdf');
  console.log('2. Back Side:  public/adam-peterson-postcard-back.pdf');
  console.log('3. Combined:   public/adam-peterson-4x6-postcard.pdf');
  console.log('======================================================\n');
}

main().catch((err) => {
  console.error('Error generating prepress postcards:', err);
  process.exit(1);
});
