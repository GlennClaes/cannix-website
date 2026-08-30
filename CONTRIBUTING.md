# Contributing

Thanks for helping improve the Cannix website.

## Development workflow

1. Create a branch from `main`.
2. Keep changes focused and scoped to the task.
3. Run the project checks before opening a pull request.
4. Open a pull request with a clear summary and testing notes.

## Local setup

```bash
npm ci
cp .env.example .env.local
npm run dev
```

## Required checks

Before submitting a PR, run:

```bash
npm run lint
npm run typecheck
npm run build
```

Optional formatting:

```bash
npm run format
```

## Code standards

### Naming

- React components and files use `PascalCase`, such as `ContactForm.tsx`
- Functions, variables, hooks, and route handlers use `camelCase`
- Types and interfaces use `PascalCase`
- Route segments and URLs use lowercase kebab-case when needed
- Keep Next.js framework files as required: `page.tsx`, `layout.tsx`, `route.ts`, etc.

### Structure

- Keep route-specific UI close to its route
- Put reusable UI into `src/app/components`
- Put shared logic into `src/lib`
- Keep content and copy in `src/content` when appropriate
- Prefer path aliases such as `@/lib/...` and `@/app/...`

### TypeScript and React

- Prefer explicit prop types and avoid `any`
- Keep components small and readable
- Validate server-bound inputs with the existing Zod schemas
- Preserve semantic HTML and keyboard accessibility
- Respect reduced-motion and focus states
- Avoid unrelated formatting churn in the same PR

## Commit guidance

Use clear commit messages. Breaking changes should follow the project release policy:

```bash
git commit -m "feat!: rewrite booking form flow"
```

or:

```bash
git commit -m "fix: improve locale support"
```

The project creates a major release only for breaking changes, not for every commit.

## Pull request checklist

- [ ] Changes are tested locally
- [ ] Lint, typecheck, and build pass
- [ ] No secrets or environment files are committed
- [ ] Documentation updated when behavior or configuration changes
- [ ] PR description clearly explains the problem and the fix

## Reporting issues

Open a regular GitHub issue for feature requests or bugs that are safe to discuss publicly. For security issues, follow the private reporting process in `SECURITY.md`.