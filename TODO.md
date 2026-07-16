# TODO

## Frontend React modernization (DineExpress)

1. Read/verify wrapper + layout usage:
   - Confirm `AppLayout` vs `Layout.jsx` and how pages are wrapped.
   - Confirm `AppRoutes.jsx` route element usage.
✅ Completed (initial wrapper, layout, motion, UI structure validated)

2. Implement route-level code splitting:

   - Use `React.lazy` + `Suspense` for heavy shells/pages.
   - Ensure compatibility with `PageTransition`.
✅ Completed (lazy loading added in `frontend/src/routes/AppRoutes.jsx`)


3. Standardize layout wrapping:
   - Ensure `AppLayout` is applied consistently across relevant routes.
   - Remove/avoid duplicated wrappers.

4. Improve accessibility + UI consistency:
   - Audit button inputs and semantics.
   - Ensure focus rings and labels follow best practices.

5. Prepare for backend integration:
   - Standardize API call patterns and error handling for future endpoints.

6. Performance pass:
   - Verify images (alt), avoid unnecessary re-renders.
   - Confirm Framer Motion usage doesn’t harm reduced-motion users.

7. Build verification:
   - Run `cd frontend && npm run build`
   - Run `cd frontend && npm run lint`

