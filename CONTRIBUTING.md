# Code conventions

## Naming

- React components and component files use `PascalCase`: `ContactForm.tsx`.
- Functions, variables, hooks and route handlers use `camelCase`.
- Constants that are shared across modules use `camelCase` unless they are true global constants.
- Types and interfaces use `PascalCase`; prefer `type` for object shapes.
- Next.js special files keep their framework-required names, such as `page.tsx`, `layout.tsx` and `route.ts`.
- URLs and route segments use lowercase kebab-case when a multi-word segment is needed.

## Structure

- Keep route-specific UI close to its route.
- Put reusable UI in `src/app/components` and shared logic in `src/lib`.
- Keep static content in `src/content`.
- Use path aliases (`@/...`) for imports from `src`.

## TypeScript and React

- Keep components small and give props explicit types.
- Prefer `Readonly` props for components that do not mutate them.
- Validate external input at the boundary with the existing Zod schemas.
- Use semantic HTML and preserve keyboard and reduced-motion accessibility.
- Do not use `any`; add a narrow type guard when a value is uncertain.

## Formatting and checks

Run these commands before opening a pull request:

```bash
npm run lint
npm run typecheck
npm run build
```

Prettier and the Tailwind plugin define formatting. Avoid unrelated formatting changes in feature pull requests.
