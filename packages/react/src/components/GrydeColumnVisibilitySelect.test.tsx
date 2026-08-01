import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { GrydeColumnVisibilitySelect } from "./GrydeColumnVisibilitySelect";
import type { GrydeColumn } from "../models";

interface User {
  id: number;
  name: string;
  email: string;
}

const columns: GrydeColumn<User>[] = [
  { id: "name", header: "Name", accessor: (row) => row.name },
  { id: "email", header: "Email", accessor: (row) => row.email }
];

describe("GrydeColumnVisibilitySelect", () => {
  it("컬럼을 숨길 때 다음 visibility 상태를 전달한다", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<GrydeColumnVisibilitySelect columns={columns} value={{}} onChange={onChange} />);

    await user.click(screen.getByLabelText("Email"));

    expect(onChange).toHaveBeenCalledWith({ email: false });
  });

  it("false인 컬럼을 unchecked 상태로 표시한다", () => {
    render(
      <GrydeColumnVisibilitySelect columns={columns} value={{ email: false }} onChange={vi.fn()} />
    );

    expect(screen.getByLabelText("Name")).toBeChecked();
    expect(screen.getByLabelText("Email")).not.toBeChecked();
  });
});
