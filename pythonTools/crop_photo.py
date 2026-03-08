from PIL import Image
from pathlib import Path

assets_dir = Path("assets")

# Process all gf_*.png files inside the assets folder
for src in assets_dir.glob("gf_*.png"):
    dst = src.with_name(src.stem + "_cropped" + src.suffix)

    im = Image.open(src).convert("RGBA")
    bbox = im.split()[3].getbbox()  # alpha channel bounding box

    if bbox:
        cropped = im.crop(bbox)
        cropped.save(dst)
        print(f"Saved: {dst}")
    else:
        print(f"{src} is fully transparent; nothing to crop.")