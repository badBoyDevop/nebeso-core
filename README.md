# NeBeso Core

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

**The open-source foundation for AI cost tracking.**

NeBeso Core contains the generic, reusable Layer 1 components that power [NeBeso](https://github.com/badBoyDevop/nebeso-platform) — UI primitives, auth pages, base models, and API utilities. Apache 2.0, free forever.

---

## Why This Exists

AI cost tracking means routing your traffic through a third party. That's a trust problem.

We solve it by open-sourcing the foundation. You can read every line of code in this repo. The core tracking layer — the part that handles your data — is transparent, auditable, and yours to fork.

The proprietary platform layer (dashboards, budgets, alerts, org management) is in [nebeso-platform](https://github.com/badBoyDevop/nebeso-platform).

---

## What's In This Repo

### Frontend (React + TypeScript)
Generic UI components you can use in any project:

| Component | Path |
|-----------|------|
| Badge | `frontend/src/components/ui/Badge.tsx` |
| Card | `frontend/src/components/ui/Card.tsx` |
| Modal | `frontend/src/components/ui/Modal.tsx` |
| DataTable | `frontend/src/components/ui/DataTable.tsx` |
| EmptyState | `frontend/src/components/ui/EmptyState.tsx` |
| Skeleton | `frontend/src/components/ui/Skeleton.tsx` |
| UsageBar | `frontend/src/components/ui/UsageBar.tsx` |
| Landing page | `frontend/src/pages/Landing.tsx` |
| Login / Register | `frontend/src/pages/Login.tsx`, `Register.tsx` |
| API client | `frontend/src/api/client.ts` |
| Formatters | `frontend/src/lib/formatters.ts` |

### Backend (Python + FastAPI)
Generic foundation you can build on:

| Component | Path |
|-----------|------|
| Base model | `api/app/models/base.py` |
| User model | `api/app/models/user.py` |
| Event model | `api/app/models/event.py` |
| Health check | `api/app/routers/health.py` |
| Config | `api/app/config.py` |
| Database setup | `api/app/database.py` |
| App entrypoint | `api/app/main.py` |

---

## What's Not Here

The NeBeso platform layer lives in [nebeso-platform](https://github.com/badBoyDevop/nebeso-platform):
- Dashboard, Analytics, Projects, Budgets, Alerts pages
- Organization/team management
- Business API routers and services
- Admin tooling
- Python and JavaScript SDKs

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md). We welcome bug fixes, accessibility improvements, and generic utility contributions.

---

## License

Apache 2.0 — see [LICENSE](./LICENSE) and [NOTICE](./NOTICE).

Based on [TokenBudget](https://github.com/badBoyDevop/nebeso-core) by Harsha Krishne Gowda.
Copyright 2026 NeBeso (Dorian Lapi).
