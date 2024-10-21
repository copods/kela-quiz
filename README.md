# Welcome to Remix v2!

This project uses Remix v2 with the new file-based routing system. Below you'll find information on development, deployment, styling, and the new route structure.

## 📚 Resources

- [Remix Docs](https://remix.run/docs)
- [Remix Tutorial](https://remix.run/docs/en/main/tutorials/blog)
- [Remix Stacks](https://remix.run/stacks)

## 🚀 Development

To start the development server, run:

```sh
npm run dev
```

This will start your app in development mode, rebuilding assets on file changes.

## 🏗️ Deployment

To deploy your app, follow these steps:

1. Build your app for production:

```sh
npm run build
```

2. Run the app in production mode:

```sh
npm start
```

### Deployment Options

#### DIY Deployment

If you're familiar with deploying Node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `npm run build`:
- `build/server`
- `build/client`

#### Using a Hosting Provider

Remix has official deployment guides for many popular hosting providers. Check out the [Remix Deployment Docs](https://remix.run/docs/en/main/guides/deployment) for more information.

## 💅 Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) pre-configured. You can start using Tailwind classes immediately in your components.

If you prefer a different CSS framework, you can easily configure it. See the [Vite docs on CSS](https://vitejs.dev/guide/features.html#css) for more information on setting up other CSS frameworks or preprocessors.

## 🗂️ New Route Structure

Remix v2 introduces a new file-based routing system. Here's the structure of our routes:

```
app
├── routes
    ├── _index.tsx
    ├── $.tsx
    ├── $workspaceId.tsx
    ├── $workspaceId._index.tsx
    ├── $workspaceId.assessments._index.tsx
    ├── $workspaceId.assessments.$testId.tsx
    ├── $workspaceId.assessments.add-assessment.tsx
    ├── $workspaceId.dashboard.tsx
    ├── $workspaceId.feedback._index.tsx
    ├── $workspaceId.members.tsx
    ├── $workspaceId.my-profile.tsx
    ├── $workspaceId.results._index.tsx
    ├── $workspaceId.results.groupByCandidate._index.tsx
    ├── $workspaceId.results.groupByTests._index.tsx
    ├── $workspaceId.results.groupByTests.$testId._index.tsx
    ├── $workspaceId.results.groupByTests.$testId.$candidateId._index.tsx
    ├── $workspaceId.results.groupByTests.$testId.$candidateId.$sectionId.tsx
    ├── $workspaceId.settings.tsx
    ├── $workspaceId.settings.general.tsx
    ├── $workspaceId.settings.workspace.tsx
    ├── $workspaceId.tests._index.tsx
    ├── $workspaceId.tests.$sectionId.tsx
    ├── $workspaceId.tests.$sectionId.add-question.tsx
    ├── $workspaceId.tests.tsx
    ├── assessment._index.tsx
    ├── assessment.expired-link.tsx
    ├── assessment.invalid-link.tsx
    ├── assessment.$assessmentId._index.tsx
    ├── assessment.$assessmentId.already-submitted.tsx
    ├── assessment.$assessmentId.end-assessment.tsx
    ├── assessment.$assessmentId.feedback-form.tsx
    ├── assessment.$assessmentId.instructions.tsx
    ├── assessment.$assessmentId.register.tsx
    ├── assessment.$assessmentId.verification.tsx
    ├── assessment.$assessmentId.$sectionId._index.tsx
    ├── assessment.$assessmentId.$sectionId.tsx
    ├── assessment.$assessmentId.$sectionId.$questionId.tsx
    ├── assessment.$assessmentId.$sectionId.cooldown.tsx
    ├── assessment.tsx
    ├── forgot-password.tsx
    ├── healthcheck.tsx
    ├── logout.tsx
    ├── sign-in.tsx
    ├── sign-up.tsx
    ├── unauthorized.tsx
    └── workspace.$inviteId.join.tsx
```

### Key Points:
- Folder nesting is replaced with dots (.) in filenames
- Dynamic segments are prefixed with $
- Index routes use _index.tsx instead of index.tsx
- The catch-all route is represented by $.tsx

For more details on the new routing system, check out the [Remix v2 Routing Docs](https://remix.run/docs/en/main/file-conventions/route-files-v2).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).