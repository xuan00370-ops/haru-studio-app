# Task for Antigravity: Auto Sync NAS + Google Drive into Haru App

## Goal
Implement an automated sync pipeline so Haru app can:
1) scan NAS folders,
2) scan Google Drive assets,
3) map results to projects,
4) update customer links in app safely.

## Hard constraints (must keep)
- Do NOT break existing app behavior.
- Keep business rules intact:
  - each project requires CD-CR + Package
  - services grouped by date in detail view
- Preserve manual links (only update same source when newer).

## Deliverables to implement

### 1) NAS scanner service
- Scan configured NAS root folders.
- Detect project folders by CD-CR / project-id patterns.
- Normalize output records:
```js
{ projectKey, source: 'nas', path, updatedAt }
```

### 2) Google Drive scanner service
- Scan configured Drive source (API or export source abstraction).
- Detect matching project assets by projectKey/CD-CR first.
- Normalize output records:
```js
{ projectKey, source: 'drive', link, updatedAt }
```

### 3) Merge/update layer
- Merge scanner outputs into app project data.
- Matching priority:
  1. CD-CR/projectKey exact match
  2. fallback: client + date
- Update project deliverables links in detail data.
- Keep audit info (added/updated/skipped/errors counts).

### 4) Sync UI
Add/extend Sync screen with actions:
- Scan NAS
- Scan Drive
- Merge & Update
- Show summary logs (added/updated/skipped/errors)

### 5) Config + error handling
- Add config file for source paths/mapping.
- Handle unavailable source/network/parsing errors clearly.

## Output required after coding
1) List changed files + reason for each.
2) Build result (`npm run build`).
3) Test steps for sync flow.
4) Known limitations + next improvements.

## Notes for implementation
- Prefer modular services in separate files.
- Keep code readable and extensible.
- Avoid hardcoding environment-specific paths into logic.
