# Decisions — oriire-canva

## 0001 — Recreate the templates by importing PDFs, not by AI-generating in Canva
Date: 2026-05-29
Status: Accepted

Context. The 10 Oriire social templates existed as React/Babel HTML "design candidate"
files. Goal was fully editable Canva versions with the original palette intact.

Options considered.
- Canva AI generate (`generate-design`): tested on the Codex square. It ignored the
  supplied palette (came out black/amber), rewrote the copy, swapped the logo, and made
  a 3-slide carousel. Rejected — no fidelity, no palette control.
- Import raw HTML (`import-design-from-url`): faithful visually but Canva flattened it to
  one non-editable layer on an oversized canvas. Rejected — not editable, wrong size.
- Import PDF: editable text/shape layers + exact page size + faithful palette/logo.
  Accepted.

Decision. Port each design to static, JS-free HTML, print to an exact-size PDF via
headless Chrome, host on this public repo, and import the PDF into Canva.

Trade-offs.
- Canva reconstructs words from per-glyph PDF positioning; this jams some serif body
  paragraphs (inconsistent, not fixable from our side). Accepted — text is editable, so
  the few jammed paragraphs get retyped in Canva. (Sesi chose "just ship the PDFs".)
- Satoshi is not a stock Canva font, so headings fall back on import and need re-picking.

Follow-ups. Retype jammed serif paragraphs; re-pick heading font; delete throwaway test
designs; swap placeholder art for commissioned art.

## 0002 — Self-host a static Newsreader instead of the variable Google Fonts build
Date: 2026-05-29
Status: Accepted

Context. Variable-font Newsreader (Google Fonts) produced worse PDF text extraction in
Canva than the static Satoshi build.

Decision. Instance static Regular + Italic cuts from the variable font with
`fonttools varLib.instancer` and `@font-face` them locally.

Trade-offs. Adds ~250 KB of font files to the repo; pins one optical size. Improved
extraction overall, though it did not fully eliminate the jamming (see 0001).
