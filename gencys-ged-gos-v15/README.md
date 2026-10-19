# Gencys GED & GOS — source code (v15)

Complete, standalone source for the published interactive prototype. This is a static application built with plain HTML, CSS and JavaScript. There are no third-party packages, installation steps, compilation steps or backend services.

## Run locally

1. Extract the ZIP and open a terminal in the `gencys-ged-gos-v15` folder.
2. With Python 3 installed, run:

   ```sh
   python3 -m http.server 8080 --bind 127.0.0.1
   ```

   On Windows, use `py -m http.server 8080 --bind 127.0.0.1` if needed.
3. Open **http://127.0.0.1:8080** in a modern browser.
4. Stop the server with Ctrl+C.

An editor's local static-server extension also works. Serving over HTTP is recommended rather than opening the HTML as a file, for predictable browser storage behavior.

## Files and editing

- `index.html` — entry point; loads the local CSS and JavaScript
- `styles.css` — responsive layout, design tokens and all component styles
- `app.js` — synthetic sample data, view rendering, filters, dialogs, local updates, history and exports
- `SOURCE_VERSION.txt` — release identification and source-file checksums

These are editable, handwritten source files, not compiled or minified bundles. They are copied byte-for-byte from the verified v15 release. Their original checkout location was a folder named `dist`; they are placed at the ZIP root here for convenience. Changes can be made directly in a text editor and checked by refreshing the browser.

To host elsewhere, upload the three application files together to a static web host. Platform-specific deployment configuration is intentionally excluded. Changing these downloaded files does not update the existing published site.

## Included experience

- GED executive overview, six KPI cards, financial filters and drill-downs, charts, exceptions, portfolio views and executive brief
- KPI & Targets rollups, editable synthetic sales/reserves inputs, Pulse support scores, a 30/60/90-day KPI register, manual statuses and local history
- Linked Action Plans with owner, timing, deadline, progress, status and notes; bidirectional KPI links and Corporate Planning exception remarks
- Project milestones and a separate Pulse people/systems view
- Read-only GOS PACE reports, date/BU/person/status filters, details/history, weekly reporting stages and operational summaries
- Data and integration-readiness explanations

## Demo data and storage

All seed figures, people, dates, targets and operational examples are illustrative. Finance, HRIS and project-sheet integrations are planned dependencies; the app makes no live connection to them.

Editable GED records are saved only in the current browser's localStorage under `gencys-demo-v1`. Different browsers, devices and local addresses have separate data. This is not multiuser synchronization. To restore seed data, open GED → Data & integrations → Reset demo. This removes that browser's demo changes only. Existing browser-local drafts are not packaged in this download.

GOS is a viewing layer. PACE creation and updates belong in HRIS; the prototype's PACE reports and other GOS operational views are read-only. Role selection in the KPI module is a workflow preview, not authentication or secure access control.

## Production boundaries

This export is the complete prototype front end. It does not contain a production backend, database, login implementation, security enforcement or API credentials. The former pre-public sign-in screen was provided by the hosting platform and is not part of this application.

Production work would require approved metric definitions, authentication and enforced roles, server-side validation, durable audit history, approved integrations and appropriate data governance. Financial formulas and performance thresholds in the demo must not be treated as approved reporting rules.

## Verification

The three application files match both the v15 source commit and its local publication archive byte-for-byte. JavaScript syntax was checked during export. The live v15 deployment was confirmed successful and latest on 19 October 2026. This export did not modify or redeploy the site.
