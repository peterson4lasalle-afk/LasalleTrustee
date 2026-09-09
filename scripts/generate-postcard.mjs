import { jsPDF } from 'jspdf';
import fs from 'fs';
import path from 'path';

async function generatePostcard() {
  console.log('Generating 4x6 Postcard PDF...');

  // 6 inches wide by 4 inches high (Standard 4x6 landscape postcard)
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'in',
    format: [6, 4]
  });

  // Color Palette Constants
  const NAVY_DARK = [15, 35, 55];       // #0f2337
  const NAVY_PRIMARY = [20, 55, 90];    // #14375a
  const NAVY_LIGHT = [240, 246, 252];   // #f0f6fc
  const AMBER_GOLD = [217, 119, 6];     // #d97706
  const AMBER_BG = [254, 243, 199];     // #fef3c7
  const EMERALD_DARK = [4, 120, 87];    // #047857
  const EMERALD_BG = [236, 253, 245];   // #ecfdf5
  const SLATE_DARK = [15, 23, 42];      // #0f172a
  const SLATE_BODY = [51, 65, 85];      // #334155
  const SLATE_MUTED = [100, 116, 139];  // #64748b
  const SLATE_BORDER = [226, 232, 240]; // #e2e8f0
  const WHITE = [255, 255, 255];

  // =========================================================================
  // PAGE 1: FRONT - ALL BULLETS AND PLATFORM SUMMARY
  // =========================================================================
  
  // Page background: clean crisp white
  doc.setFillColor(...WHITE);
  doc.rect(0, 0, 6, 4, 'F');

  // Top Navy Header Bar
  doc.setFillColor(...NAVY_DARK);
  doc.rect(0, 0, 6, 0.72, 'F');

  // Gold accent divider line below header
  doc.setFillColor(...AMBER_GOLD);
  doc.rect(0, 0.72, 6, 0.035, 'F');

  // Top pre-header
  doc.setTextColor(217, 119, 6); // amber
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.text('PUBLIC SCHOOL TRUSTEE CAMPAIGN  •  LASALLE & AMHERSTBURG', 0.25, 0.22);

  doc.setTextColor(200, 220, 245);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.text('GREATER ESSEX COUNTY DISTRICT SCHOOL BOARD (GECDSB)', 5.75, 0.22, { align: 'right' });

  // Main Header Title on Navy
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14.5);
  doc.text('3-Pillar Action Platform & Key Priorities', 0.25, 0.46);

  // Subtitle slogan
  doc.setTextColor(254, 243, 199);
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8);
  doc.text('Putting Students First: Collaborative Governance & Real Accountability', 0.25, 0.62);

  // Badge on the right of header
  doc.setFillColor(217, 119, 6);
  doc.roundedRect(4.45, 0.36, 1.3, 0.25, 0.04, 0.04, 'F');
  doc.setTextColor(...WHITE);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.text('COMMUNITY PLATFORM', 5.1, 0.52, { align: 'center' });

  // -------------------------------------------------------------------------
  // 3 PILLARS SUMMARY CARDS (HORIZONTAL / VERTICAL STACK)
  // -------------------------------------------------------------------------
  const cardX = 0.22;
  const cardW = 5.56;
  const cardH = 0.84;
  const startY = 0.82;
  const gapY = 0.88;

  // --- PILLAR 1 CARD ---
  const p1Y = startY;
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(...SLATE_BORDER);
  doc.setLineWidth(0.01);
  doc.roundedRect(cardX, p1Y, cardW, cardH, 0.05, 0.05, 'FD');

  // Left accent bar
  doc.setFillColor(...NAVY_PRIMARY);
  doc.roundedRect(cardX, p1Y, 0.1, cardH, 0.03, 0.03, 'F');

  // Pillar 1 Number Badge & Title
  doc.setFillColor(...NAVY_PRIMARY);
  doc.circle(cardX + 0.26, p1Y + 0.16, 0.09, 'F');
  doc.setTextColor(...WHITE);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.text('1', cardX + 0.26, p1Y + 0.19, { align: 'center' });

  doc.setTextColor(...NAVY_DARK);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.text('Focus on Student Success & Academic Excellence', cardX + 0.42, p1Y + 0.19);

  doc.setTextColor(...AMBER_GOLD);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.text('ACADEMICS & WELL-BEING', cardX + cardW - 0.12, p1Y + 0.18, { align: 'right' });

  // Pillar 1 Bullets
  doc.setTextColor(...SLATE_BODY);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.3);
  doc.text('• Evidence-Based Academics:', cardX + 0.22, p1Y + 0.36);
  doc.text('Boost foundational literacy & math skills benchmarked for year-over-year gains.', cardX + 1.48, p1Y + 0.36);

  doc.text('• Classroom & Frontline Support:', cardX + 0.22, p1Y + 0.52);
  doc.text('Equip educators and Educational Assistants (EAs) with direct classroom learning tools.', cardX + 1.62, p1Y + 0.52);

  doc.text('• Special Education & Wellness:', cardX + 0.22, p1Y + 0.68);
  doc.text('Nurture inclusive, positive schools; reduce wait-times for student behavioral and mental health services.', cardX + 1.66, p1Y + 0.68);

  // --- PILLAR 2 CARD ---
  const p2Y = startY + gapY;
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(...SLATE_BORDER);
  doc.roundedRect(cardX, p2Y, cardW, cardH, 0.05, 0.05, 'FD');

  // Left accent bar
  doc.setFillColor(...EMERALD_DARK);
  doc.roundedRect(cardX, p2Y, 0.1, cardH, 0.03, 0.03, 'F');

  // Pillar 2 Badge & Title
  doc.setFillColor(...EMERALD_DARK);
  doc.circle(cardX + 0.26, p2Y + 0.16, 0.09, 'F');
  doc.setTextColor(...WHITE);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.text('2', cardX + 0.26, p2Y + 0.19, { align: 'center' });

  doc.setTextColor(...NAVY_DARK);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.text('Safe, Modern Facilities & Constructive Governance', cardX + 0.42, p2Y + 0.19);

  doc.setTextColor(...EMERALD_DARK);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.text('SAFE SCHOOLS & PARTNERSHIP', cardX + cardW - 0.12, p2Y + 0.18, { align: 'right' });

  // Pillar 2 Bullets
  doc.setTextColor(...SLATE_BODY);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.3);
  doc.text('• Facility Upgrades & Ventilation:', cardX + 0.22, p2Y + 0.36);
  doc.text('Prioritize school maintenance, modern HVAC filtration, and cutting-edge classroom tech.', cardX + 1.62, p2Y + 0.36);

  doc.text('• Safe Routes & Reliable Transit:', cardX + 0.22, p2Y + 0.52);
  doc.text('Advocate for protected pedestrian school zones, crosswalk safety, and dependable busing.', cardX + 1.66, p2Y + 0.52);

  doc.text('• Stability & Respectful Dialogue:', cardX + 0.22, p2Y + 0.68);
  doc.text('Work respectfully with fellow trustees and educators to deliver steady leadership over gridlock.', cardX + 1.64, p2Y + 0.68);

  // --- PILLAR 3 CARD ---
  const p3Y = startY + gapY * 2;
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(...SLATE_BORDER);
  doc.roundedRect(cardX, p3Y, cardW, cardH, 0.05, 0.05, 'FD');

  // Left accent bar
  doc.setFillColor(...AMBER_GOLD);
  doc.roundedRect(cardX, p3Y, 0.1, cardH, 0.03, 0.03, 'F');

  // Pillar 3 Badge & Title
  doc.setFillColor(...AMBER_GOLD);
  doc.circle(cardX + 0.26, p3Y + 0.16, 0.09, 'F');
  doc.setTextColor(...WHITE);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.text('3', cardX + 0.26, p3Y + 0.19, { align: 'center' });

  doc.setTextColor(...NAVY_DARK);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.text('Fiscal Transparency, Accountability & Parent Voice', cardX + 0.42, p3Y + 0.19);

  doc.setTextColor(...AMBER_GOLD);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.text('FISCAL CARE & INTEGRITY', cardX + cardW - 0.12, p3Y + 0.18, { align: 'right' });

  // Pillar 3 Bullets
  doc.setTextColor(...SLATE_BODY);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.3);
  doc.text('• Classroom-First Budgeting:', cardX + 0.22, p3Y + 0.36);
  doc.text('Review board expenditures to maximize direct classroom investment vs. admin overhead.', cardX + 1.48, p3Y + 0.36);

  doc.text('• Active Community Consultation:', cardX + 0.22, p3Y + 0.52);
  doc.text('Host regular town halls and partner closely with Parent Involvement Committees (PICs) & councils.', cardX + 1.64, p3Y + 0.52);

  doc.text('• Open Voting Records & Audits:', cardX + 0.22, p3Y + 0.68);
  doc.text('Ensure 100% public visibility of board motions, financial audits, and multi-year strategic progress.', cardX + 1.62, p3Y + 0.68);

  // -------------------------------------------------------------------------
  // BOTTOM STRIP: LOCAL SCHOOLS & REVERSE INSTRUCTION
  // -------------------------------------------------------------------------
  doc.setFillColor(...NAVY_DARK);
  doc.rect(0, 3.52, 6, 0.48, 'F');

  doc.setFillColor(...AMBER_GOLD);
  doc.rect(0, 3.52, 6, 0.025, 'F');

  doc.setTextColor(254, 243, 199);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.8);
  doc.text('COMMUNITY SCHOOLS REPRESENTED IN LASALLE & AMHERSTBURG:', 0.25, 3.66);

  doc.setTextColor(220, 235, 250);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.4);
  doc.text('Sandwich West PS  •  Sandwich Secondary  •  North Star High School  •  Malden Central  •  Anderdon PS  •  Amherstburg PS  •  Western SS', 0.25, 3.79);

  // Reverse Prompt Arrow Banner
  doc.setFillColor(217, 119, 6);
  doc.roundedRect(4.2, 3.86, 1.65, 0.11, 0.02, 0.02, 'F');
  doc.setTextColor(...WHITE);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.2);
  doc.text('SEE CANDIDATE BIO & INFO ON BACK  -->', 5.02, 3.94, { align: 'center' });


  // =========================================================================
  // PAGE 2: BACK - CANDIDATE NAME, PHOTO, QUALIFICATIONS & CONTACT INFO
  // =========================================================================
  doc.addPage([6, 4], 'landscape');

  // Background
  doc.setFillColor(...WHITE);
  doc.rect(0, 0, 6, 4, 'F');

  // Top Navy Banner
  doc.setFillColor(...NAVY_DARK);
  doc.rect(0, 0, 6, 0.75, 'F');

  // Gold accent divider line below banner
  doc.setFillColor(...AMBER_GOLD);
  doc.rect(0, 0.75, 6, 0.035, 'F');

  // Candidate Name & Office Title on Header
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(19);
  doc.text('ADAM PETERSON', 0.25, 0.35);

  doc.setTextColor(254, 243, 199);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('CANDIDATE FOR PUBLIC SCHOOL TRUSTEE', 0.25, 0.52);

  doc.setTextColor(200, 220, 245);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.text('Town of LaSalle & Town of Amherstburg  •  Greater Essex County DSB', 0.25, 0.67);

  // Right Top Callout Badge
  doc.setFillColor(...AMBER_GOLD);
  doc.roundedRect(4.3, 0.18, 1.45, 0.42, 0.05, 0.05, 'F');
  doc.setTextColor(...WHITE);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('VOTE PETERSON', 5.02, 0.36, { align: 'center' });
  doc.setFontSize(6.5);
  doc.text('FOR GECDSB TRUSTEE', 5.02, 0.49, { align: 'center' });

  // -------------------------------------------------------------------------
  // LEFT COLUMN: PHOTO & CORE IDENTITY
  // -------------------------------------------------------------------------
  const photoX = 0.25;
  const photoY = 0.90;
  const photoW = 1.35;
  const photoH = 1.75;

  // Frame background / border for photo
  doc.setFillColor(...NAVY_DARK);
  doc.roundedRect(photoX - 0.03, photoY - 0.03, photoW + 0.06, photoH + 0.06, 0.04, 0.04, 'F');
  doc.setFillColor(...AMBER_GOLD);
  doc.roundedRect(photoX - 0.015, photoY - 0.015, photoW + 0.03, photoH + 0.03, 0.03, 0.03, 'F');

  // Embed Candidate Photo
  const headshotPath = path.resolve('public/candidate-headshot.jpg');
  if (fs.existsSync(headshotPath)) {
    const imgData = fs.readFileSync(headshotPath);
    const base64 = 'data:image/jpeg;base64,' + imgData.toString('base64');
    doc.addImage(base64, 'JPEG', photoX, photoY, photoW, photoH);
  }

  // Badges under photo
  const badgeY = photoY + photoH + 0.08;
  doc.setFillColor(...NAVY_LIGHT);
  doc.setDrawColor(...SLATE_BORDER);
  doc.roundedRect(photoX, badgeY, photoW, 0.20, 0.03, 0.03, 'FD');
  doc.setTextColor(...NAVY_PRIMARY);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.text('COLLEGE PROFESSOR', photoX + photoW / 2, badgeY + 0.14, { align: 'center' });

  const badge2Y = badgeY + 0.23;
  doc.setFillColor(...EMERALD_BG);
  doc.setDrawColor(167, 243, 208);
  doc.roundedRect(photoX, badge2Y, photoW, 0.20, 0.03, 0.03, 'FD');
  doc.setTextColor(...EMERALD_DARK);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.text('PUBLIC SCHOOL PARENT', photoX + photoW / 2, badge2Y + 0.14, { align: 'center' });

  // -------------------------------------------------------------------------
  // RIGHT COLUMN: SLOGAN, CREDENTIALS & PERSONAL COMMITMENT
  // -------------------------------------------------------------------------
  const rightX = 1.82;
  const rightW = 3.95;

  // Slogan Card
  doc.setFillColor(254, 243, 199);
  doc.setDrawColor(251, 191, 36);
  doc.setLineWidth(0.01);
  doc.roundedRect(rightX, 0.88, rightW, 0.35, 0.04, 0.04, 'FD');

  doc.setTextColor(146, 64, 14); // amber-800
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8.2);
  doc.text('"Putting Students First: Collaborative Governance & Real Accountability"', rightX + 0.12, 1.09);

  // Background & Qualifications Header
  doc.setTextColor(...NAVY_DARK);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.8);
  doc.text('CANDIDATE QUALIFICATIONS & LEADERSHIP EXPERIENCE:', rightX, 1.40);

  // 5 Bulleted Qualifications
  const credentials = [
    { title: 'Former College Professor', desc: 'Taught at two Ontario colleges; understands student learning from the front of the room.' },
    { title: 'Nearly Two Decades of Professional Experience', desc: 'Proven leadership, management discipline, and fiscal oversight.' },
    { title: 'Deep Educator Roots', desc: 'Raised by a teacher, married to an educator; education is the fabric of daily family life.' },
    { title: 'Local Public School Parent', desc: 'Two children currently enrolled in our local public schools; directly invested in results.' },
    { title: 'Fiscal Stewardship', desc: 'Pragmatic, non-partisan approach to balancing school budgets and prioritizing classrooms.' }
  ];

  let credY = 1.56;
  credentials.forEach((cred) => {
    // Green checkmark bullet symbol
    doc.setFillColor(...EMERALD_DARK);
    doc.circle(rightX + 0.06, credY - 0.03, 0.04, 'F');

    doc.setTextColor(...SLATE_DARK);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.4);
    doc.text(cred.title + ':', rightX + 0.16, credY);

    doc.setTextColor(...SLATE_BODY);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    const titleWidth = doc.getTextWidth(cred.title + ': ');
    doc.text(cred.desc, rightX + 0.16 + titleWidth, credY);

    credY += 0.195;
  });

  // Candidate Quote Box
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(...SLATE_BORDER);
  doc.roundedRect(rightX, 2.58, rightW, 0.58, 0.04, 0.04, 'FD');

  doc.setFillColor(...NAVY_PRIMARY);
  doc.rect(rightX, 2.58, 0.08, 0.58, 'F');

  doc.setTextColor(...NAVY_DARK);
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7.2);
  doc.text(
    '"Every child in our community deserves a world-class education, and every parent deserves a school board that leads with accountability, fiscal integrity, and heart. I will be your accessible, dedicated voice at the GECDSB."',
    rightX + 0.15,
    2.74,
    { maxWidth: rightW - 0.25 }
  );

  // -------------------------------------------------------------------------
  // BOTTOM STRIP: CONTACT INFO, ELECTION DETAILS & AUTHORIZATION
  // -------------------------------------------------------------------------
  doc.setFillColor(...NAVY_DARK);
  doc.rect(0, 3.28, 6, 0.72, 'F');

  doc.setFillColor(...AMBER_GOLD);
  doc.rect(0, 3.28, 6, 0.025, 'F');

  // Contact Info Row
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text('GET IN TOUCH & LEARN MORE:', 0.25, 3.48);

  doc.setTextColor(254, 243, 199);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.text('Email: Peterson4LaSalle@gmail.com', 0.25, 3.65);

  doc.setTextColor(200, 225, 250);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.text('Serving LaSalle & Amherstburg, Ontario', 0.25, 3.82);

  // Voting Callout on Bottom Right
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.text('MUNICIPAL & SCHOOL BOARD ELECTION', 5.75, 3.48, { align: 'right' });

  doc.setTextColor(254, 243, 199);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text('Vote for Adam Peterson • Trustee for LaSalle & Amherstburg', 5.75, 3.64, { align: 'right' });

  doc.setTextColor(148, 163, 184); // slate-400
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.text('Authorized by the Official Campaign of Adam Peterson', 5.75, 3.82, { align: 'right' });

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
