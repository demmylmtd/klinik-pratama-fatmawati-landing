# Klinik TriHati Plus — Landing Page v1

No-build-tools landing page: plain HTML + CSS + vanilla JS. Inspector gate (design-taste-frontend `inspect.mjs`): **0 FAIL** at 1440 / 768 / 390 (5 defensible warnings, see below).

## Files

- `index.html` — all 14 sections in order (navbar → footer), WhatsApp floating button, sticky mobile bar, SVG trefoil clip-path defs
- `styles.css` — tokens, layout, motion, responsive (1024 / 768 / 420 breakpoints)
- `app.js` — drawer, hide-on-scroll mobile bar, IntersectionObserver entrances, gallery "index with preview", booking form → WhatsApp deep link
- `assets/*.jpg` — 12 placeholder photos (Unsplash, see credits)

## Three design decisions

1. **One motif: the trefoil.** "TriHati" (three hearts) is drawn as three overlapping circles — used as the logo, bullet dots, and inline SVG `clipPath` masks (`#trefoil`, `#arch`) that shape every photo. No second motif is allowed to compete.
2. **Warm clinic palette + characterful type.** Cream `#F8F6F1`, deep teal `#0E7C6B`, coral `#E98A6E`; Fraunces (display, soft-serif warmth) paired with Plus Jakarta Sans (body — typeface designed for Indonesian, a quiet nod to the audience).
3. **Booking as a coupon, not a form.** The booking section is a notched coupon card that composes a `wa.me/6285782073587` deep link from name / phone / service / date — one tap from intent to chat. The mobile sticky bar hides while scrolling down and returns on scroll-up so it never sits on top of content.

## Real data (verified) vs placeholders

**Real:** address (Royal Palace Blok A-5, Jl. DR. Soepomo, Tebet); hours (Sen–Jum 09.00–19.30, Sab 09.00–17.00, Min tutup); WA 0857-8207-3587; IG @trihatiplus; the five Google reviews quoted verbatim in Testimoni (Faridah Nurhanan, ronaria sitompul, Vica Bonita, Sisilia Arti C, Just Anni).

**Placeholders — all marked `<!-- EDIT -->`:**
- Doctor names/photos + STR numbers ("STR 31xxxxxx")
- Tahun berdiri 2015, "10.000+ pasien"
- Harga per layanan (Rp100rb / Rp150rb / Rp250rb)
- Izin & akreditasi ("Izin Penuh, Terakreditasi… Kemenkes")
- All 12 photos (Unsplash stand-ins)

## Warnings left on the meter (defended)

- `palette-cream` — the warmth is the brief; cream is committed as the page ground, not an accent.
- `size-count` (19 sizes) — fluid `clamp()` type scale produces intermediate sizes by design; the roles are still five (display / heading / lead / body / small).
- `no-footage` — no honest video exists for a clinic we have no footage of; a fabricated clip would be worse than none.
- `still-page` (8 moving elements) — at the meter's floor: ambient kenburns on photos, entrances, float/bob on WA button and hero tag.
- `card-rows` @390 — the stacked price tiers are a price list, not decorative cards.

## Photo credits

Placeholder photos are from Unsplash (free license, no attribution required). Replace all before launch with real clinic photography; the credits note also lives in the page footer.
