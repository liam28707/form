# SmartLife Registration (Frontend)

This project includes a `RegisterForm` component to collect worker information (name, age, email, phone, address, password, etc.). The form currently performs client-side validation and a mock submit; data is logged to the console and prepared for a future Convex backend integration.

To run the app locally:

```bash
npm install
npm run dev
```

The registration UI is implemented in `src/components/RegisterForm.tsx` and styled by `src/components/RegisterForm.css`.

Integration notes:

- Replace the mock submit in `RegisterForm.tsx` (the `handleSubmit` function) with Convex client calls to persist data when you're ready.
- Ensure passwords are hashed server-side or handled according to your security policies before storing.
