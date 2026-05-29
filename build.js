// Static-HTML generator for the Oriire Canva templates.
// Ports the original React/Babel design system (palette intact)
// into 10 self-contained, JS-free HTML files ready for Canva import.
const fs = require('fs');
const path = require('path');

const LOCK = fs.readFileSync(path.join(__dirname, 'assets', 'lock.txt'), 'utf8').trim();

// ─── tokens (palette, verbatim from source templates) ─────────────────
const Z2 = {
  cream: '#FCFBF8', creamAlt: '#F4F1EA', ink: '#0F0C08',
  fg: '#14110D', line: '#E6E2D8', muted: '#6B655C',
};

const PILL_VARS = `
  --myth-pill:#F2D6CB; --myth-pill-fg:#8C3D2A;
  --tradition-pill:#C8D4E6; --tradition-pill-fg:#2A3F5C;
  --memory-pill:#CFDDD0; --memory-pill-fg:#2E4A37;
  --encounter-pill:#DFCCDF; --encounter-pill-fg:#553D54;
  --listicle-pill:#CCDBD0; --listicle-pill-fg:#3F5C49;`;

const SANS = `'Satoshi', -apple-system, sans-serif`;
const SERIF = `'Newsreader', serif`;

// ─── primitives ───────────────────────────────────────────────────────
const Scene = (children, bg = Z2.cream, fg = Z2.fg, style = '') => `
  <div style="position:relative;width:100%;height:100%;background:${bg};color:${fg};font-family:${SANS};overflow:hidden;${style}">
    ${children}
  </div>`;

const Lock = (size = 64, invert = false) =>
  `<img src="${LOCK}" alt="Oriire" style="height:${size}px;width:auto;filter:${invert ? 'invert(1)' : 'none'}" />`;

const Url = (color = Z2.fg, style = '') =>
  `<span style="font-size:15px;font-weight:500;color:${color};${style}">oriire.com</span>`;

const PILL_SIZE = {
  sm: 'font-size:11px;padding:4px 11px',
  md: 'font-size:14px;padding:7px 16px',
  lg: 'font-size:18px;padding:10px 22px',
  xl: 'font-size:24px;padding:14px 28px',
};
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const Pill = (pillar = 'myth', size = 'md', label) =>
  `<span style="display:inline-flex;align-items:center;border-radius:999px;background:var(--${pillar}-pill);color:var(--${pillar}-pill-fg);font-weight:500;letter-spacing:0.005em;${PILL_SIZE[size]}">${label || cap(pillar)}</span>`;

const PillRow = (size = 'md', gap = 10) =>
  `<div style="display:flex;gap:${gap}px">${Pill('myth', size)}${Pill('tradition', size)}${Pill('memory', size)}</div>`;

const ImgSlot = (pillar = 'myth', { caption, credit } = {}, style = '') => `
  <figure style="margin:0;display:flex;flex-direction:column;${style}">
    <div style="flex:1;background:var(--${pillar}-pill);position:relative;box-shadow:inset 0 0 0 1px rgba(15,12,8,0.08)">
      <span style="position:absolute;top:14px;left:14px;width:10px;height:10px;border-top:1px solid rgba(15,12,8,0.25);border-left:1px solid rgba(15,12,8,0.25)"></span>
      <span style="position:absolute;bottom:14px;right:14px;width:10px;height:10px;border-bottom:1px solid rgba(15,12,8,0.25);border-right:1px solid rgba(15,12,8,0.25)"></span>
      ${credit ? `<span style="position:absolute;bottom:16px;left:18px;font-size:12px;color:var(--${pillar}-pill-fg);opacity:0.75">${credit}</span>` : ''}
    </div>
    ${caption ? `<figcaption style="margin-top:10px;font-size:12px;color:rgba(15,12,8,0.55);display:flex;justify-content:space-between"><span>${caption}</span></figcaption>` : ''}
  </figure>`;

const Glyph = (glyph = 'A', pillar = 'myth', ratio = '4 / 5', size, style = '') => `
  <div style="aspect-ratio:${ratio};background:var(--${pillar}-pill);position:relative;box-shadow:inset 0 0 0 1px rgba(15,12,8,0.06);display:grid;place-items:center;${style}">
    <div style="position:absolute;inset:12px;border:1px solid rgba(15,12,8,0.10)"></div>
    <span style="font-family:${SERIF};font-style:italic;font-weight:400;font-size:${size || 'clamp(60px, 38%, 200px)'};color:var(--${pillar}-pill-fg);letter-spacing:-0.02em;line-height:1">${glyph}</span>
  </div>`;

// ─── designs ────────────────────────────────────────────────────────────
const designs = {};

designs['instagram-square-article'] = {
  w: 1080, h: 1080, title: 'IGSquareArticle (1080×1080)',
  body: Scene(`
    ${ImgSlot('myth', { credit: 'Hero illustration' }, 'position:absolute;top:0;left:0;right:0;height:52%')}
    <div style="position:absolute;top:52%;left:0;right:0;bottom:0;padding:48px 56px;display:flex;flex-direction:column;justify-content:space-between">
      <div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:22px">${Lock(44)}${Pill('myth', 'md')}</div>
        <span style="font-size:14px;color:${Z2.muted};font-weight:500">New long-form article</span>
        <h1 style="font-family:${SANS};font-weight:700;font-size:44px;line-height:1.08;letter-spacing:-0.018em;margin:10px 0 14px;color:${Z2.fg}">The Man-Eating Tree of Madagascar: Myth or Fact?</h1>
        <p style="font-size:16px;line-height:1.5;color:${Z2.muted};margin:0">How an 1874 newspaper fabrication shaped seventy years of racial imagination about Africa.</p>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:baseline;padding-top:16px;border-top:1px solid ${Z2.line};font-size:14px">
        <span style="color:${Z2.fg}">By Olubayo Stephen · 8 min read</span>${Url()}
      </div>
    </div>`),
};

designs['instagram-square-quote'] = {
  w: 1080, h: 1080, title: 'IGSquareQuote (1080×1080)',
  body: Scene(`
    <div style="position:absolute;inset:0;padding:60px;display:flex;flex-direction:column;justify-content:space-between">
      <div style="display:flex;justify-content:space-between;align-items:center">${Lock(44, true)}${Pill('myth', 'md')}</div>
      <div>
        <span style="font-family:${SERIF};font-style:italic;font-weight:400;font-size:140px;line-height:0.78;color:var(--myth-pill);display:block;margin-bottom:-8px">&ldquo;</span>
        <blockquote style="font-family:${SERIF};font-style:italic;font-weight:400;font-size:44px;line-height:1.18;letter-spacing:-0.005em;margin:0;color:${Z2.cream}">African communities and peoples are no strangers to myths and legends. The myths we rally around as Africans have historically been our saving grace and sanctuary.</blockquote>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:baseline;padding-top:20px;border-top:1px solid rgba(252,251,248,0.18)">
        <div>
          <div style="font-size:13px;color:rgba(252,251,248,0.55)">From the essay</div>
          <div style="font-size:16px;font-weight:500;margin-top:4px">The Man-Eating Tree of Madagascar</div>
        </div>
        ${Url('rgba(252,251,248,0.85)')}
      </div>
    </div>`, Z2.ink, Z2.cream),
};

designs['instagram-square-codex'] = {
  w: 1080, h: 1080, title: 'IGSquareCodex (1080×1080)',
  body: Scene(`
    <div style="position:absolute;inset:0;padding:60px;display:flex;flex-direction:column;justify-content:space-between">
      <div style="display:flex;justify-content:space-between;align-items:center">${Lock(44)}<span style="font-size:14px;color:${Z2.muted};font-weight:500">From the Codex</span></div>
      <div style="display:grid;grid-template-columns:1fr 1.1fr;gap:36px;align-items:center">
        ${Glyph('A', 'myth', '4 / 5', '240px')}
        <div>
          ${Pill('myth', 'md')}
          <h1 style="font-family:${SANS};font-weight:700;font-size:96px;line-height:0.95;letter-spacing:-0.028em;margin:18px 0 10px;color:${Z2.fg}">Adze</h1>
          <div style="font-family:${SERIF};font-style:italic;font-size:19px;color:${Z2.muted};margin-bottom:18px">/ˈɑːdz/ · n. · Ewe (Ghana, Togo, Benin)</div>
          <p style="font-family:${SERIF};font-size:17px;line-height:1.5;color:${Z2.fg};margin:0">A vampiric spirit that takes the form of a firefly. When captured, it reveals a human shape.</p>
        </div>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;padding-top:18px;border-top:1px solid ${Z2.line}">
        <span style="font-size:14px;color:${Z2.muted}">26 entries in the Oriire Codex</span>${Url()}
      </div>
    </div>`),
};

designs['instagram-square-podcast'] = {
  w: 1080, h: 1080, title: 'IGSquarePodcast (1080×1080)',
  body: Scene(`
    <div style="position:absolute;inset:0;padding:60px;display:flex;flex-direction:column;justify-content:space-between">
      <div style="display:flex;justify-content:space-between;align-items:center">
        ${Lock(44, true)}
        <span style="display:inline-flex;align-items:center;gap:10px;font-size:14px;color:rgba(252,251,248,0.75);font-weight:500"><span style="width:8px;height:8px;border-radius:999px;background:var(--myth-pill)"></span>New episode</span>
      </div>
      <div>
        <div style="display:flex;align-items:baseline;gap:22px;margin-bottom:24px">
          <span style="font-size:18px;color:rgba(252,251,248,0.55)">Episode</span>
          <span style="font-family:${SANS};font-weight:700;font-size:150px;line-height:0.85;letter-spacing:-0.028em;color:${Z2.cream}">31</span>
        </div>
        ${Pill('myth', 'md')}
        <h1 style="font-family:${SANS};font-weight:700;font-size:42px;line-height:1.08;letter-spacing:-0.02em;margin:18px 0 14px;color:${Z2.cream}">Mutu: The Practice of Attaching Humans to Animals</h1>
        <p style="font-size:16px;line-height:1.5;color:rgba(252,251,248,0.7);margin:0">Haleemah &amp; Maria sit with the Hausa practice of binding a person to an animal — consent, inheritance, and theological friction.</p>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;padding-top:18px;border-top:1px solid rgba(252,251,248,0.18)">
        <span style="font-size:14px">Spotify · Apple Podcasts · YouTube</span>${Url('rgba(252,251,248,0.85)')}
      </div>
    </div>`, Z2.ink, Z2.cream),
};

designs['instagram-portrait-4x5'] = {
  w: 1080, h: 1350, title: 'IGPortrait (1080×1350)',
  body: Scene(`
    ${ImgSlot('memory', { credit: 'Hero photograph' }, 'position:absolute;top:0;left:0;right:0;height:38%')}
    <div style="position:absolute;top:38%;left:0;right:0;bottom:0;padding:54px 64px;display:flex;flex-direction:column;justify-content:space-between">
      <div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:22px">${Lock(44)}${Pill('memory', 'md')}</div>
        <span style="font-family:${SERIF};font-style:italic;font-size:112px;line-height:0.78;color:var(--memory-pill-fg);display:block;margin-bottom:-6px">&ldquo;</span>
        <blockquote style="font-family:${SERIF};font-style:italic;font-weight:400;font-size:40px;line-height:1.18;letter-spacing:-0.005em;margin:0;color:${Z2.fg}">A mountain understood as divine dwelling cannot be treated as a resource to be extracted. The forests of Kĩrĩnyaga's slopes were protected — not by legislation, but by <em>cosmological prohibition</em>.</blockquote>
        <div style="margin-top:28px;padding-top:18px;border-top:1px solid ${Z2.line}">
          <div style="font-size:14px;color:${Z2.muted}">From the essay</div>
          <div style="font-size:18px;font-weight:500;margin-top:4px;color:${Z2.fg}">Divinity, Ecology &amp; the Moral Geography of Gĩkũyũ Cosmology</div>
          <div style="font-size:14px;color:${Z2.muted};margin-top:4px">By Favour Ayuba</div>
        </div>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:baseline">
        ${Url()}<span style="font-size:14px;color:${Z2.muted}">Independent, non-profit, ad-free.</span>
      </div>
    </div>`),
};

designs['vertical-story-reel-tiktok-short'] = {
  w: 1080, h: 1920, title: 'VerticalStory (1080×1920)',
  body: Scene(`
    <div style="position:absolute;top:110px;left:0;right:0;bottom:220px;padding:0 70px;display:flex;flex-direction:column">
      <div style="display:flex;justify-content:space-between;align-items:center">${Lock(56, true)}${Url('rgba(252,251,248,0.85)', 'font-size:18px')}</div>
      <div style="margin-top:80px">${Glyph('N', 'memory', '4 / 5', '280px', 'max-width:540px')}</div>
      <div style="margin-top:56px">
        ${Pill('memory', 'lg')}
        <h1 style="font-family:${SANS};font-weight:700;font-size:96px;line-height:0.98;letter-spacing:-0.026em;margin:22px 0 26px;color:${Z2.cream}">The Sacred<br />Mountain.</h1>
        <p style="font-family:${SERIF};font-style:italic;font-size:30px;line-height:1.32;color:rgba(252,251,248,0.86);margin:0;max-width:720px">What it means when a people anchor divinity to a particular piece of ground.</p>
      </div>
      <div style="margin-top:auto;padding-top:28px;display:flex;justify-content:space-between;align-items:center">
        <div>
          <div style="font-size:16px;color:rgba(252,251,248,0.55)">An essay by</div>
          <div style="font-family:${SERIF};font-style:italic;font-size:32px;color:var(--memory-pill);margin-top:6px">Favour Ayuba</div>
        </div>
        <div style="padding:14px 26px;border-radius:999px;border:1px solid rgba(252,251,248,0.5);color:${Z2.cream};font-size:15px;font-weight:500">Swipe up ↗</div>
      </div>
    </div>`, Z2.ink, Z2.cream),
};

designs['facebook-post'] = {
  w: 1200, h: 630, title: 'FacebookPost (1200×630)',
  body: Scene(`
    <div style="position:absolute;inset:0;padding:52px 64px;display:grid;grid-template-columns:1.1fr 1fr;gap:48px;align-items:center">
      <div>
        ${Lock(48)}
        <div style="margin-top:24px">
          ${Pill('tradition', 'md')}
          <h1 style="font-family:${SANS};font-weight:700;font-size:44px;line-height:1.06;letter-spacing:-0.018em;margin:12px 0 16px;color:${Z2.fg}">Four new entries in the Oriire Codex this week.</h1>
          <p style="font-size:16px;line-height:1.5;color:${Z2.muted};margin:0;max-width:460px">Adze (Ewe spirit), Mami Wata (Pan-African deity), Ọfọ (Igbo staff of moral authority), and a new translation of Mutu.</p>
        </div>
        <div style="margin-top:22px;padding-top:16px;border-top:1px solid ${Z2.line};display:flex;justify-content:space-between;align-items:center;font-size:14px">
          <span style="color:${Z2.fg}">Open the Codex →</span>${Url()}
        </div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(2, 1fr);gap:12px">
        ${Glyph('A', 'myth')}${Glyph('M', 'myth')}${Glyph('O', 'tradition')}${Glyph('M', 'memory')}
      </div>
    </div>`),
};

designs['linkedin-post'] = {
  w: 1200, h: 627, title: 'LinkedInPost (1200×627)',
  body: Scene(`
    <div style="position:absolute;inset:0;padding:56px 72px;display:flex;flex-direction:column;justify-content:space-between">
      <div style="display:flex;justify-content:space-between;align-items:flex-end">${Lock(52, true)}<span style="font-size:16px;color:rgba(252,251,248,0.65)">State of Oriire — Q1 2026</span></div>
      <div>
        <div style="display:flex;gap:44px;align-items:baseline;margin-bottom:22px">
          ${[['249', 'Articles'], ['43', 'Episodes'], ['26', 'Codex entries'], ['85', 'Paid contributors']].map(([n, l]) =>
            `<div><div style="font-family:${SANS};font-weight:700;font-size:60px;letter-spacing:-0.024em;color:${Z2.cream}">${n}</div><div style="font-size:13px;color:rgba(252,251,248,0.6);margin-top:4px">${l}</div></div>`).join('')}
        </div>
        <h1 style="font-family:${SANS};font-weight:600;font-size:36px;line-height:1.14;letter-spacing:-0.012em;margin:0;color:${Z2.cream};max-width:920px">Independent, non-profit, ad-free. Documenting African heritage for the long haul.</h1>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;padding-top:18px;border-top:1px solid rgba(252,251,248,0.18)">${PillRow('sm')}${Url('rgba(252,251,248,0.85)')}</div>
    </div>`, Z2.ink, Z2.cream),
};

designs['twitter-x-post'] = {
  w: 1600, h: 900, title: 'TwitterPost (1600×900)',
  body: Scene(`
    <div style="position:absolute;inset:0;padding:72px 88px;display:flex;flex-direction:column;justify-content:space-between">
      <div style="display:flex;justify-content:space-between;align-items:center">${Lock(56)}${Pill('memory', 'md')}</div>
      <div>
        <span style="font-size:16px;color:${Z2.muted};font-weight:500">A thread — 1 of 8</span>
        <h1 style="font-family:${SANS};font-weight:700;font-size:78px;line-height:1.04;letter-spacing:-0.025em;margin:14px 0 0;color:${Z2.fg};max-width:1300px">How a single fabricated newspaper story in 1874 invented a tribe, a forest, and seventy years of fear.</h1>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;padding-top:22px;border-top:1px solid ${Z2.line}">
        <div>
          <div style="font-size:16px;color:${Z2.fg};font-weight:500">By Olubayo Stephen</div>
          <div style="font-size:14px;color:${Z2.muted};margin-top:4px">The Man-Eating Tree of Madagascar · 8 min read</div>
        </div>
        ${Url()}
      </div>
    </div>`),
};

designs['youtube-thumbnail'] = {
  w: 1280, h: 720, title: 'YouTubeThumb (1280×720)',
  body: Scene(`
    <div style="position:absolute;inset:0;padding:36px 44px;display:flex;flex-direction:column;justify-content:space-between">
      <div style="display:flex;justify-content:space-between;align-items:center">${Lock(44, true)}<span style="font-size:15px;color:rgba(252,251,248,0.7)">The Sacred Mountain</span></div>
      <div style="display:grid;grid-template-columns:1fr 280px;gap:36px;align-items:center">
        <div>
          <div style="display:flex;gap:10px;margin-bottom:16px">${Pill('myth', 'md')}${Pill('memory', 'md')}</div>
          <h1 style="font-family:${SANS};font-weight:800;font-size:72px;line-height:0.96;letter-spacing:-0.028em;margin:0;color:${Z2.cream}">Why African deities live on mountains.</h1>
        </div>
        ${Glyph('N', 'memory', '4 / 5', '160px')}
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center">
        ${Url('rgba(252,251,248,0.85)')}
        <div style="padding:6px 14px;border-radius:4px;background:${Z2.cream};color:${Z2.ink};font-size:14px;font-weight:600">12:48</div>
      </div>
    </div>`, Z2.ink, Z2.cream),
};

// ─── emit ─────────────────────────────────────────────────────────────
const page = (d) => `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Oriire — ${d.title}</title>
<style>
@import url('https://api.fontshare.com/v2/css?f%5B%5D=satoshi@300,400,500,700,900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,300;6..72,400;6..72,500;6..72,600;6..72,700&display=swap');
:root {${PILL_VARS}
}
* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; background: ${Z2.creamAlt}; }
#root { width: ${d.w}px; height: ${d.h}px; margin: 0 auto; overflow: hidden; }
@page { size: ${d.w}px ${d.h}px; margin: 0; }
@media print { html, body { background: #fff; } #root { margin: 0; } }
</style>
</head>
<body>
<div id="root">${d.body}</div>
</body>
</html>`;

const outDir = __dirname;
let count = 0;
for (const [name, d] of Object.entries(designs)) {
  fs.writeFileSync(path.join(outDir, name + '.html'), page(d));
  count++;
}
console.log(`wrote ${count} files to ${outDir}`);
