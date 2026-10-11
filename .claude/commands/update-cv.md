# Update the cv in my homepage

The CV is no longer written by hand. It is generated from the database `~/Documents/service/skojaku-cv/data/*.yaml`, and a push to `skojaku/skojaku-cv` master rebuilds the PDF and copies it to `assets/attachments/docs/cv/cv-skojaku.pdf` here through GitHub Actions.

Follow the `cv-database` skill: edit the YAML, `uv run scripts/build.py`, show the user the diff, push master. Do not edit `libs/skojaku-cv/main.tex` and do not copy a PDF here by hand.
