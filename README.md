# Welcome to Remix!

- 📖 [Remix docs](https://remix.run/docs)

## Development

Run the dev server:

```shellscript
npm run dev
```

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying Node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `npm run build`

- `build/server`
- `build/client`

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever css framework you prefer. See the [Vite docs on css](https://vitejs.dev/guide/features.html#css) for more information.

New Route structure

app
├── routes
│   ├── _index.tsx
│   ├── $.tsx
│   ├── $workspaceId.tsx
│   ├── $workspaceId._index.tsx
│   ├── $workspaceId.assessments._index.tsx
│   ├── $workspaceId.assessments.$testId.tsx
│   ├── $workspaceId.assessments.add-assessment.tsx
│   ├── $workspaceId.dashboard.tsx
│   ├── $workspaceId.feedback._index.tsx
│   ├── $workspaceId.members.tsx
│   ├── $workspaceId.my-profile.tsx
│   ├── $workspaceId.results._index.tsx
│   ├── $workspaceId.results.groupByCandidate._index.tsx
│   ├── $workspaceId.results.groupByTests._index.tsx
│   ├── $workspaceId.results.groupByTests.$testId._index.tsx
│   ├── $workspaceId.results.groupByTests.$testId.$candidateId._index.tsx
│   ├── $workspaceId.results.groupByTests.$testId.$candidateId.$sectionId.tsx
│   ├── $workspaceId.settings.tsx
│   ├── $workspaceId.settings.general.tsx
│   ├── $workspaceId.settings.workspace.tsx
│   ├── $workspaceId.tests._index.tsx
│   ├── $workspaceId.tests.$sectionId.tsx
│   ├── $workspaceId.tests.$sectionId.add-question.tsx
│   ├── $workspaceId.tests.tsx
│   ├── assessment._index.tsx
│   ├── assessment.expired-link.tsx
│   ├── assessment.invalid-link.tsx
│   ├── assessment.$assessmentId._index.tsx
│   ├── assessment.$assessmentId.already-submitted.tsx
│   ├── assessment.$assessmentId.end-assessment.tsx
│   ├── assessment.$assessmentId.feedback-form.tsx
│   ├── assessment.$assessmentId.instructions.tsx
│   ├── assessment.$assessmentId.register.tsx
│   ├── assessment.$assessmentId.verification.tsx
│   ├── assessment.$assessmentId.$sectionId._index.tsx
│   ├── assessment.$assessmentId.$sectionId.tsx
│   ├── assessment.$assessmentId.$sectionId.$questionId.tsx
│   ├── assessment.$assessmentId.$sectionId.cooldown.tsx
│   ├── assessment.tsx
│   ├── forgot-password.tsx
│   ├── healthcheck.tsx
│   ├── logout.tsx
│   ├── sign-in.tsx
│   ├── sign-up.tsx
│   ├── unauthorized.tsx
│   └── workspace.$inviteId.join.tsx
