# v2 motion homepage — asset manifest

## Generated assets

| Asset | Source | Job ID | Placement |
|---|---|---|---|
| `bg.mp4` (4.3 MB, 1280×720, 8s, all-keyframe) | Higgsfield Seedance 1.5 Pro (`seedance1_5`, **39.6 cr measured** — 8s/720p costs ~4× the 4s ladder figure) | `c5b61f4d-ed1b-47b3-96bb-73b6347aaaba` | Fixed full-screen background, scroll-scrubbed |
| `poster.jpg` (62 KB) | Frame 0 of bg.mp4 via ffmpeg | — | `<video poster>` — LCP image + reduced-motion/mobile fallback |

Original prompt: *"Slow cinematic macro shot of light refracting through layered dark emerald green glass and liquid, soft volumetric light rays drifting through deep atmospheric haze, faint mountain ridge silhouette dissolving in the depth of field, dark navy base tones, gentle continuous drifting motion, shallow depth of field, premium restrained mood, seamless loop, no people, no text, no logos"* — 16:9, 720p, 8s.

## Regenerating the background video

```bash
# 0. COST WARNING: 8s/720p measured 39.6 credits (2026-06-11). Duration 4 is ~¼ the price
#    and still scrubs fine. Preflight cost before any unfamiliar model+config.
# 1. Generate a new clip (tweak the prompt, keep 16:9 / 720p)
higgsfield generate create seedance1_5 --prompt "..." \
  --aspect_ratio 16:9 --resolution 720p --duration 4 --wait --json

# 2. Download result_url, then re-encode ALL-KEYFRAME (non-negotiable for smooth scrub)
ffmpeg -y -i raw.mp4 -an -c:v libx264 -preset slow -crf 24 -vf "scale=1280:-2" \
  -g 1 -keyint_min 1 -sc_threshold 0 -pix_fmt yuv420p -movflags +faststart v2/bg.mp4

# 3. Refresh the poster
ffmpeg -y -i v2/bg.mp4 -frames:v 1 -q:v 4 v2/poster.jpg
```

No code changes needed after a swap — the scrub maps scroll → duration automatically.

## Notes

- Scrub is desktop-only (`hover:hover` + `pointer:fine`); touch devices get a slow ambient loop (0.55×); `prefers-reduced-motion` gets the poster only (zero video bytes).
- The background deliberately slows to 0.35× scrub speed during the services pin (`k = 0.35` in the scroll handler) so cards sit on a calmer backdrop.
- serve.mjs needed HTTP Range support for local `<video>` seeking — added 2026-06-11. GitHub Pages/production already supports ranges.
- Verified 2026-06-11: Lighthouse Perf 100 / A11y 100 / LCP 1.51s / CLS 0.000 / TBT 0ms / 0 axe failures.
