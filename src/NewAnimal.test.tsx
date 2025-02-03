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

    const newButton = screen.getByText("New");
    fireEvent.click(newButton);

    const createButton = screen.getByText("Create");
    const form = screen.getByRole<HTMLFormElement>("form");
    fireEvent.click(createButton);

    expect(form.reportValidity()).toBe(false);
    expect(onCreation).not.toHaveBeenCalled();
  });

  it("should submit the form when the form is valid", async () => {
    const onCreation = vi.fn();
    render(<NewAnimal onCreation={onCreation} />);

    const newButton = screen.getByText("New");
    fireEvent.click(newButton);

    expect(newButton).not.toBeInTheDocument();

    const createButton = screen.getByText("Create");
    const form = screen.getByRole<HTMLFormElement>("form");
    const nameInput = screen.getByLabelText<HTMLInputElement>("Name");
    const breedInput = screen.getByLabelText<HTMLSelectElement>("Breed");

    expect(form).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(breedInput).toBeInTheDocument();

    fireEvent.change(nameInput, { target: { value: "Test Name" } });
    fireEvent.change(breedInput, { target: { value: "Daschund" } });

    // Need to check the validity before clicking the create button as I reset the form on submit
    expect(form.checkValidity()).toBe(true);

    fireEvent.click(createButton);

    expect(onCreation).toHaveBeenCalled();
    // A bit gross but I only want to know that the UI inputs have been reported correctly
    // not the resulting data from the animal factory
    expect(onCreation.mock.calls[0][0]).toMatchObject({
      name: "Test Name",
      breed: "Daschund",
    });
  });
});
