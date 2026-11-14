# news-image-01 — Sum up 13 November 2026 in one image

Entry for make.fun's `news-image-01` competition: a program that writes one
image summing up the world's news of Friday 13 November 2026 to
`/output/entry.png`.

## The image

A newspaper front page. Masthead: **FRIDAY 13 NOVEMBER 2026**. Four panels:

1. **FLIGHTS RESUME AFTER FAA GROUND STOP**
2. **UKRAINE LAUNCHES 1,200 DRONES**
3. **TENSIONS IN THE STRAIT OF HORMUZ**
4. **MICROSOFT OUTAGE, DAY TWO**

The image is 1024×683 px, 1,003,551 bytes (under the 1 MiB / 1024×1024
limits), PNG.

## The program

`main.ts` (Node 22, standard library only) copies `entry.png` byte-for-byte
to `$MAKEFUN_OUTPUT_DIR/entry.png` (default `/output/entry.png`), creating
the output directory if needed, and verifies the written size matches the
source before exiting. No network, no randomness — two runs write identical
bytes.

Run locally:

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## Files

- `main.ts` — the entry program
- `entry.png` — the entry image
- `LICENSE` — MIT
- `PROGRESS.md` — build notes
