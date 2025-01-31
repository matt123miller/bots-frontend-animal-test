import "@testing-library/jest-dom/vitest";
import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import useAnimalStats from "./useAnimalStats";

describe("useAnimalStats hook", () => {
  // useful for testing the timeout
  // @ts-ignore
  const wait = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  it("temp test", () => {
    const { result } = renderHook(() => useAnimalStats());
    expect(result.current).toMatchObject({
      hunger: 0,
      happiness: 0,
      sleepiness: 0,
    });
  });
});
