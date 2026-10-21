# Gencys GED + GOS prototype — v16

Buildless, browser-local prototype using plain HTML, CSS and JavaScript. All figures, names, dates and portfolio classifications are illustrative. No production backend, authentication or live integrations are implemented.

## Run locally

From this directory, run `python3 -m http.server 8000 --directory dist`, then open `http://localhost:8000`. Any static HTTP server works. There are no dependencies or build steps.

## Current navigation

- GED: Group overview, KPIs & targets, Executive brief, Data & integrations.
- GOS: PACE reports, Weekly reporting, Executive brief, Data & integrations, with a shortcut back to GED.
- Removed standalone modules: GED Finance, Action plans, Projects, Nexus, Corelink and Pulse; GOS Daily huddle, Work board, Issues & escalation.
- Removed alternate launchers, project preview cards, action-plan entry points and the issues notification button. Removed routes safely fall back to the current application's default view.

Existing financial KPI cards and overview metrics remain part of Group overview. Portfolio classifications and support-score data remain within the retained KPI tracker, rather than opening standalone portfolio pages. Historical browser-local sample actions, projects and operational records remain in storage; the removed modules are no longer accessible in the UI. Retained legacy helpers do not grant a navigable route.

## Boundaries

State is stored under `gencys-demo-v1` in the visitor's localStorage. PACE creation and updates happen in HRIS; GOS is read-only. Legacy browser-local PACE drafts remain stored but are ignored by the HRIS report viewer. Existing sample data is not deleted by the module removal. Reset demo explicitly restores sample values only when selected by the visitor.

The KPI tracker supports synthetic BU inputs, 30/60/90-day KPIs, manual statuses and local change history. Demo roles are not real accounts, access controls or multiuser synchronization. No source-sheet changes, financial reporting, HRIS submission, real assignment, notification or approval takes place. Production implementation still requires approved metric definitions, authentication, durable storage, data contracts and governance.

## Files

- `dist/index.html`: application entry point.
- `dist/app.js`: sample data, UI rendering, local interactions and exports.
- `dist/styles.css`: responsive styling.
- `tests/module-removal.cjs`: focused dependency-free regression checks.
- `.openai/hosting.json`: existing Site identity and static publication directory. No secrets.

## Checks

Run `node --check dist/app.js` and `node tests/module-removal.cjs` with Node.js. The tests cover eight supported mode/view combinations, removed route fallbacks, absence of removed navigation and modal launchers, retained KPI details, read-only PACE details, KPI exception details and unchanged sample data. Responsive CSS is preserved. These focused checks do not replace full production testing.

The complete source archive includes checksums so its application files can be compared with the published version. Do not put credentials or private production data in this public demo.
