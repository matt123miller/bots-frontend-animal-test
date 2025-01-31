//@ts-ignore - ignore the unused import
import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { NewAnimal } from "./NewAnimal";

describe("NewAnimal component", () => {
  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it("should create successfully", () => {
    const onCreation = vi.fn();
    render(<NewAnimal onCreation={onCreation} />);

    const heading = screen.getByText("New Animal", { exact: true });
    expect(heading).toBeInTheDocument();
  });
});
