import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const OUT_DIR = path.resolve('public/tshirt');
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

// ============================================================================
// SVG BUILDERS
// ============================================================================

// 1. FULL CHEST BANNER (Dark & Light) - Streamlined 3-Element Design
// Dimensions: 1200 x 480
function buildChestBannerSVG({ isDark }) {
  const textColor = isDark ? '#ffffff' : '#00262b';
  const goldColor = isDark ? '#fbbf24' : '#d97706';
  const pillBg = isDark ? '#f59e0b' : '#005961';
  const pillText = isDark ? '#001b1e' : '#ffffff';

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 480" width="1200" height="480">
  <defs>
    <style>
      .font-sans-heavy { font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; font-weight: 900; }
      .font-sans-bold { font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; font-weight: 800; }
      .font-sans-med { font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; font-weight: 700; }
    </style>
  </defs>

  <g transform="translate(0, 20)">
    <!-- Top Pill Badge: VOTE -->
    <g transform="translate(470, 45)">
      <rect x="0" y="0" width="260" height="62" rx="31" fill="${pillBg}" />
      <text x="130" y="42" text-anchor="middle" fill="${pillText}" class="font-sans-heavy" font-size="28" letter-spacing="6">★ VOTE ★</text>
    </g>

    <!-- Main Candidate Name: PETERSON -->
    <text x="600" y="245" text-anchor="middle" fill="${textColor}" class="font-sans-heavy" font-size="146" letter-spacing="4">PETERSON</text>

    <!-- Accent Divider Bar with Stars -->
    <g transform="translate(150, 288)">
      <!-- Left Line -->
      <line x1="40" y1="0" x2="380" y2="0" stroke="${goldColor}" stroke-width="6" stroke-linecap="round" />
      <!-- Center Stars -->
      <g transform="translate(450, 0)">
        <text x="-45" y="8" text-anchor="middle" fill="${goldColor}" font-size="28">★</text>
        <text x="0" y="11" text-anchor="middle" fill="${goldColor}" font-size="38">★</text>
        <text x="45" y="8" text-anchor="middle" fill="${goldColor}" font-size="28">★</text>
      </g>
      <!-- Right Line -->
      <line x1="520" y1="0" x2="860" y2="0" stroke="${goldColor}" stroke-width="6" stroke-linecap="round" />
    </g>

    <!-- Office Title: FOR GECDSB TRUSTEE -->
    <text x="600" y="380" text-anchor="middle" fill="${goldColor}" class="font-sans-heavy" font-size="56" letter-spacing="8">FOR GECDSB TRUSTEE</text>
  </g>
</svg>`;
}

// 2. POCKET / ROUNDEL BADGE (3.5" to 4" Circular Logo)
// Dimensions: 800 x 800
function buildPocketRoundelSVG({ isDark }) {
  const textColor = isDark ? '#ffffff' : '#00262b';
  const tealColor = isDark ? '#2dd4bf' : '#005961';
  const goldColor = isDark ? '#fbbf24' : '#d97706';
  const circleBg = isDark ? '#001e22' : '#ffffff';
  const ringColor = isDark ? '#005961' : '#005961';

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">
  <defs>
    <style>
      .font-sans-heavy { font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; font-weight: 900; }
      .font-sans-bold { font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; font-weight: 800; }
    </style>
    <path id="text-path-top" d="M 170,400 A 230,230 0 0,1 630,400" />
    <path id="text-path-bottom" d="M 640,400 A 240,240 0 0,1 160,400" />
  </defs>

  <g transform="translate(400, 400)">
    <!-- Outer Decorative Ring -->
    <circle r="375" fill="none" stroke="${goldColor}" stroke-width="8" />
    <circle r="355" fill="${circleBg}" stroke="${ringColor}" stroke-width="24" />
    <circle r="275" fill="none" stroke="${goldColor}" stroke-width="5" />
    <circle r="260" fill="${isDark ? '#001417' : '#f0f9fa'}" />

    <!-- Arched Text Top: VOTE ADAM PETERSON -->
    <text fill="${isDark ? '#ffffff' : '#ffffff'}" class="font-sans-heavy" font-size="34" letter-spacing="8">
      <textPath href="#text-path-top" startOffset="50%" text-anchor="middle">
        ★ VOTE ADAM PETERSON ★
      </textPath>
    </text>

    <!-- Arched Text Bottom: GECDSB TRUSTEE -->
    <text fill="${goldColor}" class="font-sans-heavy" font-size="32" letter-spacing="7">
      <textPath href="#text-path-bottom" startOffset="50%" text-anchor="middle">
        GECDSB TRUSTEE • 2026
      </textPath>
    </text>

    <!-- Center Icon: Star -->
    <g transform="translate(0, -110)">
      <polygon points="0,-35 11,-12 35,-12 16,3 23,26 0,12 -23,26 -16,3 -35,-12 -11,-12" fill="${goldColor}" />
    </g>

    <!-- Inner Core: PETERSON -->
    <g transform="translate(0, -10)">
      <text x="0" y="0" text-anchor="middle" fill="${textColor}" class="font-sans-heavy" font-size="74" letter-spacing="4">PETERSON</text>
      
      <!-- Divider bar -->
      <line x1="-160" y1="22" x2="160" y2="22" stroke="${goldColor}" stroke-width="4" />

      <!-- Office & Town -->
      <text x="0" y="52" text-anchor="middle" fill="${tealColor}" class="font-sans-bold" font-size="22" letter-spacing="5">PUBLIC SCHOOL TRUSTEE</text>
      <text x="0" y="84" text-anchor="middle" fill="${isDark ? '#cbd5e1' : '#475569'}" class="font-sans-bold" font-size="18" letter-spacing="3">LASALLE &amp; AMHERSTBURG</text>
      <text x="0" y="118" text-anchor="middle" fill="${goldColor}" class="font-sans-heavy" font-size="15" letter-spacing="2">“PUTTING STUDENTS FIRST”</text>
    </g>
  </g>
</svg>`;
}

// 3. MODERN ATHLETIC / VARSITY STACK (Dynamic Slogan Style)
// Dimensions: 1000 x 700
function buildVarsitySVG({ isDark }) {
  const textColor = isDark ? '#ffffff' : '#00262b';
  const tealColor = isDark ? '#2dd4bf' : '#005961';
  const goldColor = isDark ? '#fbbf24' : '#d97706';
  const subColor = isDark ? '#e2e8f0' : '#334155';

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 700" width="1000" height="700">
  <defs>
    <style>
      .font-sans-heavy { font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; font-weight: 900; }
      .font-sans-bold { font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; font-weight: 800; }
    </style>
  </defs>

  <g transform="translate(500, 70)">
    <!-- Top banner -->
    <text x="0" y="50" text-anchor="middle" fill="${goldColor}" class="font-sans-heavy" font-size="32" letter-spacing="8">LET’S PUT STUDENTS FIRST</text>
    
    <!-- Big VOTE -->
    <text x="0" y="140" text-anchor="middle" fill="${tealColor}" class="font-sans-heavy" font-size="76" letter-spacing="12">VOTE</text>

    <!-- Massive PETERSON -->
    <text x="0" y="275" text-anchor="middle" fill="${textColor}" class="font-sans-heavy" font-size="138" letter-spacing="4">PETERSON</text>

    <!-- Underline bar -->
    <rect x="-380" y="305" width="760" height="8" rx="4" fill="${goldColor}" />

    <!-- FOR GECDSB TRUSTEE -->
    <text x="0" y="380" text-anchor="middle" fill="${textColor}" class="font-sans-heavy" font-size="46" letter-spacing="6">FOR GECDSB TRUSTEE</text>

    <!-- LASALLE & AMHERSTBURG -->
    <text x="0" y="435" text-anchor="middle" fill="${subColor}" class="font-sans-bold" font-size="28" letter-spacing="6">LASALLE &amp; AMHERSTBURG</text>
  </g>
</svg>`;
}

// ============================================================================
// GENERATION & RASTER CONVERSION WITH SHARP
// ============================================================================
async function generateAll() {
  console.log('Generating T-shirt vector SVGs and 300 DPI transparent PNGs with Sharp...');

  const items = [
    { name: 'vote-peterson-chest-dark', svg: buildChestBannerSVG({ isDark: true }), width: 3000 },
    { name: 'vote-peterson-chest-light', svg: buildChestBannerSVG({ isDark: false }), width: 3000 },
    { name: 'vote-peterson-pocket-dark', svg: buildPocketRoundelSVG({ isDark: true }), width: 2400 },
    { name: 'vote-peterson-pocket-light', svg: buildPocketRoundelSVG({ isDark: false }), width: 2400 },
    { name: 'vote-peterson-varsity-dark', svg: buildVarsitySVG({ isDark: true }), width: 3000 },
    { name: 'vote-peterson-varsity-light', svg: buildVarsitySVG({ isDark: false }), width: 3000 }
  ];

  for (const item of items) {
    const svgPath = path.join(OUT_DIR, `${item.name}.svg`);
    const pngPath = path.join(OUT_DIR, `${item.name}.png`);

    fs.writeFileSync(svgPath, item.svg, 'utf8');
    console.log(`Wrote SVG: ${svgPath}`);

    // Render to high-resolution transparent PNG with Sharp
    const buffer = Buffer.from(item.svg);
    await sharp(buffer, { density: 300 })
      .resize({ width: item.width })
      .png()
      .toFile(pngPath);

    console.log(`Rendered 300 DPI PNG: ${pngPath} (${item.width}px)`);
  }

  // Also create root public convenience copies
  fs.copyFileSync(path.join(OUT_DIR, 'vote-peterson-chest-dark.svg'), path.resolve('public/vote-peterson-tshirt-logo.svg'));
  fs.copyFileSync(path.join(OUT_DIR, 'vote-peterson-chest-dark.png'), path.resolve('public/vote-peterson-tshirt-logo.png'));
  console.log('Convenience copies created in public/vote-peterson-tshirt-logo.*');
}

generateAll().catch((err) => {
  console.error('Error generating t-shirt logos:', err);
  process.exit(1);
});
