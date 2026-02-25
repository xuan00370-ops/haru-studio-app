# Common Error Patterns

Use this file only when logs are noisy and a quick mapping helps.

## Build and bundler

- `Failed to resolve import`, `Cannot find module`: check file path, extension, alias config, and case sensitivity.
- `Unexpected token` during build: check syntax error, unsupported syntax in current toolchain, or malformed JSON.
- `vite` / `rollup` plugin error: inspect the first stack frame outside `node_modules`, then confirm plugin config order.

## Runtime and JavaScript

- `ReferenceError`: variable/function not defined in scope or loaded in wrong order.
- `TypeError: ... is not a function`: wrong import shape (default vs named), null value, or API mismatch.
- `Cannot read properties of undefined/null`: missing data guard, async race, or selector not found.

## Environment and config

- `process is not defined` in browser: server-side code or Node-only package is running in client bundle.
- `import.meta.env.*` missing: env var prefix or `.env` load issue.
- `EADDRINUSE`: dev server port already in use.

## Firebase and Google APIs

- `permission-denied` / `403`: auth context or IAM role is wrong.
- `invalid-api-key`: wrong env key, project mismatch, or restricted key settings.
- OAuth credential errors: verify redirect URI and client ID/secret pair.
