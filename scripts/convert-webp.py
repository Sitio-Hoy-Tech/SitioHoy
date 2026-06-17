"""
Resize + convert assets/showcase/*.png to WebP.
Target sizes are 2×/3× the CSS frame display dimensions at the lg breakpoint,
giving pixel-perfect sharpness on retina screens with no browser scaling.

  desktop → 1520×950  (760px CSS × 2x DPR)
  tablet  → 624×832   (312px CSS × 2x DPR)
  mobile  → 600×1300  (200px CSS × 3x DPR)
"""
from pathlib import Path
from PIL import Image

showcase = Path(__file__).parent.parent / 'assets' / 'showcase'

TARGETS = {
    'desktop': (1520, 950),
    'tablet':  (624,  832),
    'mobile':  (600,  1300),
}

for png in sorted(showcase.glob('*.png')):
    device = png.stem.split('-')[-1]   # bar-desktop → desktop
    target = TARGETS.get(device)
    if not target:
        print(f'skip {png.name} (unknown device suffix)')
        continue

    webp = png.with_suffix('.webp')
    img = Image.open(png)

    orig_w, orig_h = img.size
    target_w, target_h = target

    # Cover-crop: scale so smallest dimension fills target, then centre-crop
    scale = max(target_w / orig_w, target_h / orig_h)
    scaled_w = round(orig_w * scale)
    scaled_h = round(orig_h * scale)
    img = img.resize((scaled_w, scaled_h), Image.LANCZOS)

    left = (scaled_w - target_w) // 2
    top  = 0   # keep top of page (above-the-fold)
    img = img.crop((left, top, left + target_w, top + target_h))

    img.save(webp, 'WEBP', quality=88, method=6)
    print(f'{png.name} ({orig_w}×{orig_h}) → {webp.name} ({target_w}×{target_h})  {webp.stat().st_size//1024}KB')

print('\nDone.')
