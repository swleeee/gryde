# Gryde

Gryde는 구조화된 데이터를 다양한 방식으로 보여주기 위한 React Grid 컴포넌트입니다.

## Core Features

- To be written.

## Example

- To be written.

## Tech Stack

- pnpm
- Vite
- TypeScript
- React
- CSS Modules
- CSS Variables
- Storybook
- Vitest
- Testing Library

## Verification

```sh
pnpm --filter @gryde/react build
pnpm exec tsc -p packages/react/tsconfig.json --noEmit
pnpm --filter @gryde/docs build
pnpm lint
pnpm format:check
```

## Project Structure

```txt
gryde/
  apps/
    docs/
  packages/
    react/
      src/
        components/
        hooks/
        models/
        utils/
        styles/
        index.ts
```
