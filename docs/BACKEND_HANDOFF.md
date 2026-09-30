# Backend handoff: Careers and Admin portal

The frontend is finished and currently stores everything in the browser
(localStorage). This document lists what the backend needs to provide so the
frontend can switch from localStorage to a real API.

## Where the frontend needs to change

Only three files talk to storage. Replace their internals with `fetch` calls:

| File | Now | Replace with |
|---|---|---|
| `src/lib/jobs.ts` + `src/hooks/useJobs.ts` | localStorage `baa_jobs` | Jobs API |
| `src/lib/applications.ts` + `src/hooks/useApplications.ts` | localStorage `baa_applications` | Applications API |
| `src/context/AuthContext.tsx` | hard-coded email/password, sessionStorage flag | Login API + token |

Suggested env var: `VITE_API_URL=https://api.example.com`

## Data models

```ts
Job {
  id: string
  title: string
  department: string
  location: string
  type: "Full-time" | "Part-time" | "Contract" | "Internship" | "Volunteer"
  deadline: string          // "yyyy-mm-dd" or "" (open until filled)
  description: string
  apply: string             // optional fallback: email or URL
  createdAt: number         // unix ms
}

Application {
  id: string
  jobId: string
  jobTitle: string
  firstName: string
  lastName: string
  email: string
  phone: string
  portfolio: string         // optional URL
  github: string            // optional URL
  linkedin: string          // optional URL
  description: string
  createdAt: number
}
```

## Endpoints

| Method | Path | Auth | Purpose |
|---|---|---|---|
| POST | `/api/auth/login` | public | Body `{ email, password }`. Returns `{ token }` or 401 |
| GET | `/api/jobs` | public | List all jobs (newest first) |
| POST | `/api/jobs` | admin | Create job |
| PUT | `/api/jobs/:id` | admin | Update job |
| DELETE | `/api/jobs/:id` | admin | Delete job |
| POST | `/api/applications` | public | Candidate submits application |
| GET | `/api/applications` | admin | List applications (newest first) |
| DELETE | `/api/applications/:id` | admin | Delete application |

Admin endpoints take `Authorization: Bearer <token>`.

## Backend requirements

- Hash the admin password (bcrypt or argon2). Never store it in plain text.
- Validate all input on the server: required fields, email format, URL format, length limits.
- Rate-limit `POST /api/applications` and `POST /api/auth/login` (spam and brute force).
- Enable CORS for the frontend origin only.
- Use short-lived tokens (JWT or session cookie) and return 401 when they expire; the frontend should then log out.
- Applications contain personal data (name, email, phone). Store and expose them to admins only.
- Optional: send a notification email to HR when an application arrives. The frontend currently also posts to Web3Forms for this; remove that call in `src/components/common/ApplyForm.tsx` once the backend sends the email.

## Frontend behaviour to keep

- `/admin` redirects to `/admin/login` when there is no valid session (`ProtectedRoute`).
- A job is shown as "Closed" on `/careers` when its `deadline` is before today.
- The job form (`Dashboard.tsx`) and application form (`ApplyForm.tsx`) already validate required fields in the browser.

## Newsletter subscribe

`src/components/ui/SubscribeForm.tsx` POSTs `{ email, country }` as JSON to the URL in
`VITE_SUBSCRIBE_API_URL` and expects `{ message }` back. Until that variable is set the
form shows "Subscriptions are not available yet". Point it at BAA's own endpoint
(or a Mailchimp/Brevo proxy). Add the Privacy Policy link target in the same file.
