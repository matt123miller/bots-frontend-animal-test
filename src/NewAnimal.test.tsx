//@ts-ignore - ignore the unused import
import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
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

  it("should not submit the form when the form is invalid", () => {
    const onCreation = vi.fn();
    render(<NewAnimal onCreation={onCreation} />);
    const createButton = screen.getByText("Create");
    const form = screen.getByRole<HTMLFormElement>("form");
    fireEvent.click(createButton);
    expect(form.reportValidity()).toBe(false);
    expect(onCreation).not.toHaveBeenCalled();
  });

  it("should submit the form when the form is valid", () => {
    const onCreation = vi.fn();
    render(<NewAnimal onCreation={onCreation} />);
    const createButton = screen.getByText("Create");
    const form = screen.getByRole<HTMLFormElement>("form");
    const nameInput = screen.getByLabelText<HTMLInputElement>("Name");
    const breedInput = screen.getByLabelText<HTMLSelectElement>("Breed");
    fireEvent.change(nameInput, { target: { value: "Test Name" } });
    fireEvent.change(breedInput, { target: { value: "Daschund" } });
    fireEvent.click(createButton);
    expect(form.reportValidity()).toBe(true);
    // A bit gross but I only want to know that the UI inputs have been reported correctly
    // not the resulting data from the animal factory
    expect(onCreation.mock.calls[0][0]).toMatchObject({
      name: "Test Name",
      breed: "Daschund",
    });
  });
});
