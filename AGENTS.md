# AGENTS.md

## Project overview
- This repository is a single-page portfolio website built as a static site in [index.html](index.html).
- The contact form submits to a Google Apps Script endpoint configured in [index.html](index.html) and implemented in [google-apps-script/Code.gs](google-apps-script/Code.gs).
- The setup steps for the backend live in [google-apps-script/SETUP.md](google-apps-script/SETUP.md).

## Working conventions
- Prefer small, targeted edits to [index.html](index.html) rather than introducing frameworks or build tooling unless explicitly requested.
- Preserve the current visual style, animations, accessibility labels, and SEO/meta tags unless a change specifically requires updating them.
- Keep the contact form behavior consistent with the existing client-side validation and fallback email link.
- If the Google Apps Script endpoint changes, update both [index.html](index.html) and [google-apps-script/Code.gs](google-apps-script/Code.gs) together.
- Avoid breaking the CSP-related meta tags, internal anchors, and social/contact links.

## Editing guidance
- When changing content, keep copy concise and portfolio-focused.
- When editing styles, preserve responsive behavior and avoid introducing large layout rewrites without a clear reason.
- When updating the contact backend, keep validation rules aligned between the frontend and Apps Script.

## Verification
- There is no automated build or test pipeline for this repository.
- Verify changes by opening the site locally in a browser and checking the relevant section affected by the edit.
- For contact-form changes, confirm the form still validates and that the backend status messaging remains sensible.
