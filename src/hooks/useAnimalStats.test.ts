import "@testing-library/jest-dom/vitest";
import { act, cleanup, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import useAnimalStats from "./useAnimalStats";

describe("useAnimalStats hook", () => {
  // useful for testing the timeout
  // @ts-ignore
  const wait = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  afterEach(() => {
    cleanup();
  });

  it("Should initialize with the correct values, starting with the supplied initial values", () => {
    const { result } = renderHook(() =>
      useAnimalStats({ hunger: 10, happiness: 10, sleepiness: 10 }, 1000)
    );
    const { values, updateHunger, updateHappiness, updateSleepiness } =
      result.current;

    // The initial values are ticked by 1
    expect(values).toMatchObject({
      happiness: 9,
      hunger: 11,
      sleepiness: 11,
    });
  });

  it("Should update the values correctly when state change functions are called", async () => {
    const { result } = renderHook(() =>
      useAnimalStats({ hunger: 10, happiness: 10, sleepiness: 10 }, 50)
    );
    const { updateHunger, updateHappiness, updateSleepiness } = result.current;

    await act(() => {
      updateHunger(10);
      updateHappiness(10);
      updateSleepiness(10);
      return wait(10);
    });

    const { values } = result.current;

    expect(values).toMatchObject({
      happiness: 19,
      hunger: 1,
      sleepiness: 1,
    });
  });

  it("Should update the values correctly over time", async () => {
    const { result } = renderHook(() =>
      useAnimalStats({ hunger: 10, happiness: 10, sleepiness: 10 }, 50)
    );
    const valuesBefore = result.current.values;

    await act(() => wait(70));

    const valuesAfter = result.current.values;

    expect(valuesAfter).not.toMatchObject(valuesBefore);

    expect(valuesAfter.happiness).toBeLessThan(valuesBefore.happiness);
    expect(valuesAfter.hunger).toBeGreaterThan(valuesBefore.hunger);
    expect(valuesAfter.sleepiness).toBeGreaterThan(valuesBefore.sleepiness);

    expect(valuesAfter).toMatchObject({
      happiness: 8,
      hunger: 12,
      sleepiness: 12,
    });

    await act(() => wait(70));

    expect(result.current.values).toMatchObject({
      happiness: 7,
      hunger: 13,
      sleepiness: 13,
    });
  });

  it("Should update the happiness value at the increased rate when hunger and sleepiness are full", async () => {
    const { result } = renderHook(() =>
      useAnimalStats({ hunger: 98, happiness: 50, sleepiness: 98 }, 50)
    );

    // initial setup, 0th tick
    expect(result.current.values).toMatchObject({
      happiness: 49,
      hunger: 99,
      sleepiness: 99,
    });

    await act(() => wait(50));

    // 1st tick
    expect(result.current.values).toMatchObject({
      happiness: 48,
      hunger: 100,
      sleepiness: 100,
    });

    await act(() => wait(50));

    // 3rd tick
    // Now hunger and sleepiness are full, subsequent ticks will decrease happiness at a higher rate
    expect(result.current.values).toMatchObject({
      happiness: 38,
      hunger: 100,
      sleepiness: 100,
    });

    await act(() => wait(50));

    // 4th tick
    expect(result.current.values).toMatchObject({
      happiness: 28,
      hunger: 100,
      sleepiness: 100,
    });
  });
});
