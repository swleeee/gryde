# Gryde

Gryde는 정렬, 페이지네이션, 선택, 컬럼 표시 제어와 보기 전환을 지원하는 가벼운
React Grid 컴포넌트입니다.

## Core Features

- React-first column API와 generic row type
- client sorting과 controlled sorting
- client pagination과 controlled pagination
- row selection과 column visibility 제어
- `compact`, `normal`, `comfortable` density
- Adaptive Height와 sticky header
- sorting, pagination, column visibility, density, 높이를 묶는 View Preset
- CSS Variables 기반 theme-ready 스타일

## Basic Usage

```tsx
import { Gryde } from "@gryde/react";
import type { GrydeColumn } from "@gryde/react";

interface User {
  id: number;
  name: string;
  email: string;
  amount: number;
}

const columns: GrydeColumn<User>[] = [
  {
    id: "name",
    header: "Name",
    accessor: (row) => row.name,
    sortable: true
  },
  {
    id: "email",
    header: "Email",
    accessor: (row) => row.email
  },
  {
    id: "amount",
    header: "Amount",
    accessor: (row) => row.amount,
    format: (value) => `$${value.toLocaleString()}`,
    sortable: true,
    align: "right"
  }
];

<Gryde
  rows={users}
  columns={columns}
  getRowId={(row) => row.id}
  sorting={{
    defaultValue: [{ columnId: "amount", direction: "desc" }]
  }}
  pagination={{
    defaultValue: { page: 1, pageSize: 20 },
    pageSizeOptions: [10, 20, 50]
  }}
/>;
```

## Controlled State

`sorting`, `pagination`, `columnVisibility`, `rowSelection`은 `value`와 `onChange`로
제어할 수 있습니다.

```tsx
const [sorting, setSorting] = useState<SortingState>([{ columnId: "name", direction: "asc" }]);

<Gryde
  rows={users}
  columns={columns}
  getRowId={(row) => row.id}
  sorting={{ value: sorting, onChange: setSorting }}
/>;
```

## Adaptive Height

`heightMode`는 row가 적을 때에는 자연스러운 높이를 유지하고, `maxRows`를 넘으면
Grid 내부 영역만 스크롤합니다.

```tsx
<Gryde
  rows={users}
  columns={columns}
  getRowId={(row) => row.id}
  heightMode={{
    type: "adaptive",
    minRows: 3,
    maxRows: 10,
    rowHeight: 44
  }}
/>
```

## View Preset

Preset은 한 번에 적용할 보기 상태를 정의합니다. preset 선택 UI는 Grid 내부에
강제하지 않으며, `GrydePresetSelect` 또는 앱의 자체 UI와 조합합니다.

```tsx
import { Gryde, GrydePresetSelect } from "@gryde/react";
import type { GrydePreset } from "@gryde/react";

const presets: GrydePreset[] = [
  {
    id: "compact",
    label: "Compact view",
    state: {
      sorting: [{ columnId: "name", direction: "asc" }],
      pagination: { page: 1, pageSize: 10 },
      columnVisibility: { email: false },
      density: "compact"
    },
    layout: {
      heightMode: {
        type: "adaptive",
        minRows: 3,
        maxRows: 8,
        rowHeight: 36
      }
    }
  }
];

const [activePresetId, setActivePresetId] = useState("compact");
const activePreset = presets.find((preset) => preset.id === activePresetId);

<GrydePresetSelect presets={presets} value={activePresetId} onChange={setActivePresetId} />;

<Gryde rows={users} columns={columns} getRowId={(row) => row.id} preset={activePreset} />;
```

`preset`이 바뀌면 preset에 정의한 sorting, pagination, column visibility가
적용됩니다. `density`와 `layout.heightMode`는 현재 preset을 기준으로 즉시
반영됩니다. 해당 상태를 `value` prop으로 controlled 방식으로 전달했다면 부모
컴포넌트가 최종 상태를 반영합니다.

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
