-- Story 1.1: initial no-op migration so `db:migrate` runs end to end.
-- Real tables arrive in Story 1.2+. Migrations are merged to main, then applied
-- once via the manual "Migrate production" workflow (never in a Vercel build).
-- Each must be backward compatible with the version deployed before it
-- (expand first, contract later).
SELECT 1;
