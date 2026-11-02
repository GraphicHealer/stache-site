---
version: "0.1.2"
level: pair
processes:
  design: pair
  implementation: pair
  testing: pair
  documentation: pair
  review: pair
  deployment: pair
components:
  src/assets/icon.svg: none
  public/favicon.svg: none
  public/shots: none
  public/shots-docs: none
---

This format is based on [AI-DECLARATION.md](https://ai-declaration.md/en/0.1.2).

## Notes

- stache-site is built by a human (product direction, copy approval, review)
  pairing with an AI agent (Devin, Cognition) that writes most of the code
  and prose. The human reviews every change before it deploys.
- `src/assets/icon.svg` and `public/favicon.svg` derive from the app icon,
  hand-made by the human in Inkscape.
- `public/shots/` and `public/shots-docs/` are real screenshots of a seeded
  Stache demo instance, not generated imagery (see `/credits/` for the demo
  photo sources).
