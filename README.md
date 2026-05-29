# oriire-canva

Static, self-contained HTML versions of the 10 Oriire social templates, built for
importing into Canva as fully editable designs (Canva fetches the raw HTML over HTTPS).

Each file is one artboard at its exact export size, using the Oriire palette, the
Satoshi + Newsreader type, the pillar pills (Myth / Tradition / Memory), and the
Oriire lock logo inlined as an SVG data URI. No JavaScript at runtime.

## Files

| File | Design | Size |
|------|--------|------|
| `facebook-post.html` | Codex roundup | 1200×630 |
| `instagram-portrait-4x5.html` | Essay quote | 1080×1350 |
| `instagram-square-article.html` | Article promo | 1080×1080 |
| `instagram-square-codex.html` | Codex entry | 1080×1080 |
| `instagram-square-podcast.html` | Podcast episode | 1080×1080 |
| `instagram-square-quote.html` | Quote card | 1080×1080 |
| `linkedin-post.html` | State-of-Oriire stats | 1200×627 |
| `twitter-x-post.html` | Thread hook | 1600×900 |
| `vertical-story-reel-tiktok-short.html` | Sacred Mountain | 1080×1920 |
| `youtube-thumbnail.html` | Mountain deities thumbnail | 1280×720 |

## Build

```
node build.js
```

Regenerates all 10 HTML files from the shared component system in `build.js`.
The lock logo data URI is read from `assets/lock.txt`.
