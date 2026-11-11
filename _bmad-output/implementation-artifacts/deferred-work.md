- source_spec: `_bmad-output/implementation-artifacts/spec-1-1-deployable-project-foundation.md`
  summary: Add CSP violation reporting (report-to/report-uri) so production CSP violations are visible.
  evidence: Blind review #17. Observability beyond Vercel logs is deferred by the architecture spine; no endpoint exists to receive reports.
- source_spec: `_bmad-output/implementation-artifacts/spec-1-1-deployable-project-foundation.md`
  summary: Consider Strict-Transport-Security (for custom domains), Permissions-Policy and Cross-Origin-Opener-Policy headers.
  evidence: Blind review #18. Not required by AD-11 or the Story 1.1 intent; Vercel serves HSTS on vercel.app domains.
