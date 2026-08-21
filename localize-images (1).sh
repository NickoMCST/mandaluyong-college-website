#!/usr/bin/env bash
# Run this from the root of the mandaluyong-college-website project.
# Downloads all hotlinked MCST images into public/images/ and rewrites data.ts to use local paths.
set -uo pipefail

BASE_URL="https://www.mandaluyongcollege.edu.ph/images"
OUT_DIR="public/images"

paths=(
  "RecentEvents/1.jpeg" "RecentEvents/2.jpeg" "RecentEvents/3.jpeg" "RecentEvents/4.jpeg"
  "bece.jpeg" "bscrim.jpeg" "bsne.jpeg"
  "program_logo/bacom.jpg" "program_logo/bpad.jpg" "program_logo/bped.jpg"
  "program_logo/bsis.png" "program_logo/bsmath.jpg" "program_logo/bsn.jpg"
  "slides/image1.jpg" "slides/image2.jpg" "slides/image4.jpeg" "slides/image6.jpg"
  "slides/image7.jpg" "slides/image9.jpeg" "slides/image10.jpeg" "slides/image24.jpeg"
  "slides/mcst-drone.png"
)

for p in "${paths[@]}"; do
  dest="$OUT_DIR/$p"
  mkdir -p "$(dirname "$dest")"
  echo "Downloading $p ..."
  curl -sS --connect-timeout 8 --max-time 20 -A "Mozilla/5.0" "$BASE_URL/$p" -o "$dest"
  if [ $? -ne 0 ]; then
    echo "  !! FAILED or TIMED OUT: $p"
    rm -f "$dest"
  fi
done

echo ""
echo "Done. Now update src/data.ts:"
echo '  Change:  export const BASE = "https://www.mandaluyongcollege.edu.ph/images";'
echo '  To:      export const BASE = "/images";'
