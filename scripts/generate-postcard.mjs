import { jsPDF } from 'jspdf';
import fs from 'fs';
import path from 'path';

async function generatePostcard() {
  console.log('Generating spacious, un-crowded 4x6 Postcard PDF with smaller picture...');

  // Standard 6" x 4" landscape postcard dimensions
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'in',
    format: [6, 4]
  });

  // Sophisticated Campaign Color Palette
  const NAVY_DARK = [15, 30, 50];       // #0f1e32
  const NAVY_PRIMARY = [20, 55, 90];    // #14375a
  const NAVY_LIGHT = [241, 245, 249];   // #f1f5f9
  const AMBER_GOLD = [217, 119, 6];     // #d97706
  const AMBER_BG = [254, 243, 199];     // #fef3c7
  const EMERALD_DARK = [5, 122, 85];    // #057a55
  const EMERALD_BG = [236, 253, 245];   // #ecfdf5
  const SLATE_DARK = [15, 23, 42];      // #0f172a
  const SLATE_BODY = [51, 65, 85];      // #334155
  const SLATE_MUTED = [100, 116, 139];  // #64748b
  const SLATE_BORDER = [226, 232, 240]; // #e2e8f0
  const WHITE = [255, 255, 255];

  // =========================================================================
  // PAGE 1: FRONT - 3-PILLAR ACTION PLATFORM (Clean, Spacious, Un-crowded)
  // =========================================================================

  // Page background: clean crisp white
  doc.setFillColor(...WHITE);
  doc.rect(0, 0, 6, 4, 'F');

  // Top Navy Header Bar (Sleek 0.52" height for generous vertical breathing space)
  doc.setFillColor(...NAVY_DARK);
  doc.rect(0, 0, 6, 0.52, 'F');

  // Gold accent divider line below header
  doc.setFillColor(...AMBER_GOLD);
  doc.rect(0, 0.52, 6, 0.025, 'F');

  // Pre-header line
  doc.setTextColor(217, 119, 6); // amber
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.8);
  doc.text('PUBLIC SCHOOL TRUSTEE CANDIDATE  •  LASALLE & AMHERSTBURG', 0.35, 0.17);

  doc.setTextColor(200, 220, 245);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.text('GECDSB PUBLIC SCHOOLS', 5.65, 0.17, { align: 'right' });

  // Main Header Title
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12.5);
  doc.text('3-Pillar Action Plan & Platform Priorities', 0.35, 0.38);

  // Right Badge on Header
  doc.setFillColor(...AMBER_GOLD);
  doc.roundedRect(4.45, 0.25, 1.20, 0.20, 0.03, 0.03, 'F');
  doc.setTextColor(...WHITE);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.text('COMMUNITY PLATFORM', 5.05, 0.38, { align: 'center' });

  // -------------------------------------------------------------------------
  // 3 PILLARS SUMMARY CARDS (Comfortable vertical gaps, clear breathing space)
  // -------------------------------------------------------------------------
  const cardX = 0.35;
  const cardW = 5.30;
  const cardH = 0.80;
  const cardStartY = 0.66;
  const cardGap = 0.92; // 0.12" of whitespace between cards

  // --- PILLAR 1: Student Success ---
  const p1Y = cardStartY;
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(...SLATE_BORDER);
  doc.setLineWidth(0.008);
  doc.roundedRect(cardX, p1Y, cardW, cardH, 0.04, 0.04, 'FD');

  // Left accent bar
  doc.setFillColor(...NAVY_PRIMARY);
  doc.roundedRect(cardX, p1Y, 0.08, cardH, 0.03, 0.03, 'F');

  // Number circle & Header
  doc.setFillColor(...NAVY_PRIMARY);
  doc.circle(cardX + 0.24, p1Y + 0.16, 0.085, 'F');
  doc.setTextColor(...WHITE);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.text('1', cardX + 0.24, p1Y + 0.19, { align: 'center' });

  doc.setTextColor(...NAVY_DARK);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('Student Success & Academic Support', cardX + 0.38, p1Y + 0.19);

  doc.setTextColor(...AMBER_GOLD);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.8);
  doc.text('CLASSROOM FIRST', cardX + cardW - 0.15, p1Y + 0.19, { align: 'right' });

  // Bullets (Concise, airy, generous whitespace)
  doc.setTextColor(...SLATE_BODY);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.3);

  doc.setFillColor(...NAVY_PRIMARY);
  doc.circle(cardX + 0.24, p1Y + 0.34, 0.025, 'F');
  doc.text('Target classroom funding to foundational literacy & math benchmark gains.', cardX + 0.35, p1Y + 0.36);

  doc.circle(cardX + 0.24, p1Y + 0.50, 0.025, 'F');
  doc.text('Equip frontline educators & Educational Assistants (EAs) with direct classroom tools.', cardX + 0.35, p1Y + 0.52);

  doc.circle(cardX + 0.24, p1Y + 0.66, 0.025, 'F');
  doc.text('Strengthen special education resources and proactive student mental health supports.', cardX + 0.35, p1Y + 0.68);


  // --- PILLAR 2: Safe & Modern Schools ---
  const p2Y = cardStartY + cardGap;
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(...SLATE_BORDER);
  doc.roundedRect(cardX, p2Y, cardW, cardH, 0.04, 0.04, 'FD');

  // Left accent bar
  doc.setFillColor(...EMERALD_DARK);
  doc.roundedRect(cardX, p2Y, 0.08, cardH, 0.03, 0.03, 'F');

  // Number circle & Header
  doc.setFillColor(...EMERALD_DARK);
  doc.circle(cardX + 0.24, p2Y + 0.16, 0.085, 'F');
  doc.setTextColor(...WHITE);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.text('2', cardX + 0.24, p2Y + 0.19, { align: 'center' });

  doc.setTextColor(...NAVY_DARK);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('Safe, Welcoming & Modern Facilities', cardX + 0.38, p2Y + 0.19);

  doc.setTextColor(...EMERALD_DARK);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.8);
  doc.text('HEALTHY SCHOOLS', cardX + cardW - 0.15, p2Y + 0.19, { align: 'right' });

  // Bullets
  doc.setTextColor(...SLATE_BODY);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.3);

  doc.setFillColor(...EMERALD_DARK);
  doc.circle(cardX + 0.24, p2Y + 0.34, 0.025, 'F');
  doc.text('Prioritize school repairs, modern HVAC air filtration & safe learning environments.', cardX + 0.35, p2Y + 0.36);

  doc.circle(cardX + 0.24, p2Y + 0.50, 0.025, 'F');
  doc.text('Advocate for safe walking routes, crosswalk protections, and dependable busing.', cardX + 0.35, p2Y + 0.52);

  doc.circle(cardX + 0.24, p2Y + 0.66, 0.025, 'F');
  doc.text('Foster safe, respectful school communities with collaborative board leadership.', cardX + 0.35, p2Y + 0.68);


  // --- PILLAR 3: Fiscal Accountability ---
  const p3Y = cardStartY + cardGap * 2;
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(...SLATE_BORDER);
  doc.roundedRect(cardX, p3Y, cardW, cardH, 0.04, 0.04, 'FD');

  // Left accent bar
  doc.setFillColor(...AMBER_GOLD);
  doc.roundedRect(cardX, p3Y, 0.08, cardH, 0.03, 0.03, 'F');

  // Number circle & Header
  doc.setFillColor(...AMBER_GOLD);
  doc.circle(cardX + 0.24, p3Y + 0.16, 0.085, 'F');
  doc.setTextColor(...WHITE);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.text('3', cardX + 0.24, p3Y + 0.19, { align: 'center' });

  doc.setTextColor(...NAVY_DARK);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('Fiscal Accountability & Parent Voice', cardX + 0.38, p3Y + 0.19);

  doc.setTextColor(...AMBER_GOLD);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.8);
  doc.text('REAL TRANSPARENCY', cardX + cardW - 0.15, p3Y + 0.19, { align: 'right' });

  // Bullets
  doc.setTextColor(...SLATE_BODY);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.3);

  doc.setFillColor(...AMBER_GOLD);
  doc.circle(cardX + 0.24, p3Y + 0.34, 0.025, 'F');
  doc.text('Direct taxpayer dollars into classroom instruction rather than administrative overhead.', cardX + 0.35, p3Y + 0.36);

  doc.circle(cardX + 0.24, p3Y + 0.50, 0.025, 'F');
  doc.text('Active parent engagement via regular community town halls & School Council support.', cardX + 0.35, p3Y + 0.52);

  doc.circle(cardX + 0.24, p3Y + 0.66, 0.025, 'F');
  doc.text('Ensure open voting records, transparent budgets, and pragmatic solutions for families.', cardX + 0.35, p3Y + 0.68);


  // -------------------------------------------------------------------------
  // BOTTOM STRIP: CLEAN & SPACIOUS (0.38" Height)
  // -------------------------------------------------------------------------
  doc.setFillColor(...NAVY_DARK);
  doc.rect(0, 3.62, 6, 0.38, 'F');

  doc.setFillColor(...AMBER_GOLD);
  doc.rect(0, 3.62, 6, 0.02, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.2);
  doc.text('Municipal & School Board Election  •  petersonforlasalle.com', 0.35, 3.78);
  doc.link(0.35, 3.68, doc.getTextWidth('Municipal & School Board Election  •  petersonforlasalle.com') + 0.05, 0.12, { url: 'https://petersonforlasalle.com' });

  doc.setTextColor(254, 243, 199);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.8);
  doc.text('Candidate Info & Bio on Back  -->', 5.65, 3.78, { align: 'right' });

  doc.setTextColor(180, 205, 230);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.3);
  doc.text('Greater Essex County District School Board  •  peterson4lasalle@gmail.com', 0.35, 3.92);
  doc.link(0.35, 3.82, doc.getTextWidth('Greater Essex County District School Board  •  peterson4lasalle@gmail.com') + 0.05, 0.12, { url: 'mailto:peterson4lasalle@gmail.com' });

  doc.setTextColor(200, 220, 240);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.6);
  doc.text('Vote Peterson for Trustee', 5.65, 3.92, { align: 'right' });


  // =========================================================================
  // PAGE 2: BACK - CANDIDATE NAME, SMALLER PICTURE, QUALIFICATIONS & CONTACT
  // =========================================================================
  doc.addPage([6, 4], 'landscape');

  // Background: clean crisp white
  doc.setFillColor(...WHITE);
  doc.rect(0, 0, 6, 4, 'F');

  // Top Navy Header Bar (Sleek 0.54" height)
  doc.setFillColor(...NAVY_DARK);
  doc.rect(0, 0, 6, 0.54, 'F');

  // Gold accent divider line
  doc.setFillColor(...AMBER_GOLD);
  doc.rect(0, 0.54, 6, 0.025, 'F');

  // Candidate Name & Office Title on Header
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  doc.text('ADAM PETERSON', 0.35, 0.27);

  doc.setTextColor(254, 243, 199);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.8);
  doc.text('CANDIDATE FOR PUBLIC SCHOOL TRUSTEE  •  LASALLE & AMHERSTBURG', 0.35, 0.43);

  // Right Top Callout Badge
  doc.setFillColor(...AMBER_GOLD);
  doc.roundedRect(4.45, 0.14, 1.20, 0.30, 0.03, 0.03, 'F');
  doc.setTextColor(...WHITE);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.8);
  doc.text('VOTE PETERSON', 5.05, 0.26, { align: 'center' });
  doc.setFontSize(6.2);
  doc.text('GECDSB TRUSTEE', 5.05, 0.37, { align: 'center' });

  // -------------------------------------------------------------------------
  // LEFT COLUMN: SMALLER PICTURE & ELEGANT BADGES (Spacious & Balanced)
  // -------------------------------------------------------------------------
  // Noticeably smaller picture: 0.90" wide x 1.15" high (down from 1.35" x 1.75")
  const photoX = 0.38;
  const photoY = 0.76;
  const photoW = 0.90;
  const photoH = 1.15;

  // Thin outer gold accent frame
  doc.setFillColor(...NAVY_DARK);
  doc.roundedRect(photoX - 0.02, photoY - 0.02, photoW + 0.04, photoH + 0.04, 0.03, 0.03, 'F');
  doc.setFillColor(...AMBER_GOLD);
  doc.roundedRect(photoX - 0.01, photoY - 0.01, photoW + 0.02, photoH + 0.02, 0.025, 0.025, 'F');

  // Embed Candidate Photo
  const headshotPath = path.resolve('public/candidate-headshot.jpg');
  if (fs.existsSync(headshotPath)) {
    const imgData = fs.readFileSync(headshotPath);
    const base64 = 'data:image/jpeg;base64,' + imgData.toString('base64');
    doc.addImage(base64, 'JPEG', photoX, photoY, photoW, photoH);
  }

  // 2 Clean Badges under photo with comfortable spacing
  const badge1Y = photoY + photoH + 0.12;
  doc.setFillColor(...NAVY_LIGHT);
  doc.setDrawColor(...SLATE_BORDER);
  doc.setLineWidth(0.008);
  doc.roundedRect(photoX, badge1Y, photoW, 0.19, 0.025, 0.025, 'FD');
  doc.setTextColor(...NAVY_PRIMARY);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.2);
  doc.text('College Professor', photoX + photoW / 2, badge1Y + 0.13, { align: 'center' });

  const badge2Y = badge1Y + 0.25;
  doc.setFillColor(...EMERALD_BG);
  doc.setDrawColor(167, 243, 208);
  doc.roundedRect(photoX, badge2Y, photoW, 0.19, 0.025, 0.025, 'FD');
  doc.setTextColor(...EMERALD_DARK);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.2);
  doc.text('Public School Parent', photoX + photoW / 2, badge2Y + 0.13, { align: 'center' });

  const badge3Y = badge2Y + 0.25;
  doc.setFillColor(254, 243, 199);
  doc.setDrawColor(252, 211, 77);
  doc.roundedRect(photoX, badge3Y, photoW, 0.19, 0.025, 0.025, 'FD');
  doc.setTextColor(180, 83, 9);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.2);
  doc.text('Educator Family', photoX + photoW / 2, badge3Y + 0.13, { align: 'center' });

  // -------------------------------------------------------------------------
  // RIGHT COLUMN: SLOGAN, QUALIFICATIONS & COMMITMENT (Airy, No Crowding)
  // -------------------------------------------------------------------------
  const rightX = 1.55;
  const rightW = 4.10;

  // Slogan Card (Compact, warm accent)
  doc.setFillColor(254, 243, 199);
  doc.setDrawColor(251, 191, 36);
  doc.setLineWidth(0.008);
  doc.roundedRect(rightX, 0.74, rightW, 0.28, 0.035, 0.035, 'FD');

  doc.setTextColor(146, 64, 14); // amber-800
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7.6);
  doc.text('"Putting Students First: Collaborative Governance & Real Accountability"', rightX + 0.10, 0.91);

  // Qualifications Header with comfortable spacing
  doc.setTextColor(...NAVY_DARK);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text('KEY QUALIFICATIONS & LEADERSHIP EXPERIENCE:', rightX, 1.23);

  // 4 Clear, Single-Line Well-Spaced Credentials
  const credentials = [
    {
      title: 'Former College Professor',
      desc: 'Deep understanding of classroom teaching & student learning.'
    },
    {
      title: 'Local Public School Parent',
      desc: 'Two children currently enrolled in our local public schools.'
    },
    {
      title: 'Educator Family Roots',
      desc: 'Raised by a teacher, married to an educator; deeply invested.'
    },
    {
      title: 'Pragmatic Leadership',
      desc: '20 years of professional management & fiscal accountability.'
    }
  ];

  let credY = 1.44;
  credentials.forEach((cred) => {
    // Emerald green bullet circle
    doc.setFillColor(...EMERALD_DARK);
    doc.circle(rightX + 0.06, credY - 0.03, 0.03, 'F');

    // Title
    doc.setTextColor(...SLATE_DARK);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.4);
    const titleText = cred.title + ': ';
    doc.text(titleText, rightX + 0.15, credY);

    // Description (clean single-line fit with plenty of margin)
    doc.setTextColor(...SLATE_BODY);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.1);
    const titleW = doc.getTextWidth(titleText);
    doc.text(cred.desc, rightX + 0.15 + titleW, credY);

    credY += 0.24; // Generous 0.24" line-height
  });

  // Short Candidate Commitment Statement Box (Airy and elegant)
  const quoteY = 2.48;
  const quoteH = 0.44;
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(...SLATE_BORDER);
  doc.setLineWidth(0.008);
  doc.roundedRect(rightX, quoteY, rightW, quoteH, 0.035, 0.035, 'FD');

  doc.setFillColor(...NAVY_PRIMARY);
  doc.rect(rightX, quoteY, 0.06, quoteH, 'F');

  doc.setTextColor(...NAVY_DARK);
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7.1);
  doc.text(
    '"Dedicated to bringing collaborative, transparent, and solutions-focused leadership to the Greater Essex County District School Board for LaSalle & Amherstburg families."',
    rightX + 0.14,
    quoteY + 0.18,
    { maxWidth: rightW - 0.26 }
  );

  // -------------------------------------------------------------------------
  // BOTTOM STRIP: CONTACT & VOTING INFO (Clean 0.40" Height)
  // -------------------------------------------------------------------------
  doc.setFillColor(...NAVY_DARK);
  doc.rect(0, 3.60, 6, 0.40, 'F');

  doc.setFillColor(...AMBER_GOLD);
  doc.rect(0, 3.60, 6, 0.02, 'F');

  // Row 1: Website & Election Callout
  doc.setTextColor(254, 243, 199); // warm amber gold
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.0);
  doc.text('Website: petersonforlasalle.com', 0.35, 3.75);
  doc.link(0.35, 3.65, doc.getTextWidth('Website: petersonforlasalle.com') + 0.05, 0.13, { url: 'https://petersonforlasalle.com' });

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.6);
  doc.text('Vote Adam Peterson for Public School Trustee', 5.65, 3.75, { align: 'right' });

  // Row 2: Email & Official Authorization
  doc.setTextColor(220, 240, 255); // crisp light cyan/white
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.6);
  doc.text('Email: peterson4lasalle@gmail.com', 0.35, 3.90);
  doc.link(0.35, 3.80, doc.getTextWidth('Email: peterson4lasalle@gmail.com') + 0.05, 0.13, { url: 'mailto:peterson4lasalle@gmail.com' });

  doc.setTextColor(148, 163, 184);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.2);
  doc.text('Authorized by the Official Campaign of Adam Peterson  •  LaSalle & Amherstburg', 5.65, 3.90, { align: 'right' });

  // Save the PDF
  const pdfBuffer = Buffer.from(doc.output('arraybuffer'));
  
  const destPath = path.resolve('public/adam-peterson-4x6-postcard.pdf');
  fs.writeFileSync(destPath, pdfBuffer);
  console.log(`Successfully generated: ${destPath} (${pdfBuffer.length} bytes)`);

  // Also write alias paths so any link works
  fs.writeFileSync(path.resolve('public/aaron-peterson-4x6-postcard.pdf'), pdfBuffer);
  fs.writeFileSync(path.resolve('public/4x6-postcard-platform.pdf'), pdfBuffer);
  fs.writeFileSync(path.resolve('public/postcard-4x6.pdf'), pdfBuffer);

  console.log('All PDF aliases created successfully in /public!');
}

generatePostcard().catch(err => {
  console.error('Failed to generate postcard PDF:', err);
  process.exit(1);
});
