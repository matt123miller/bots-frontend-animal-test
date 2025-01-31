import "@testing-library/jest-dom/vitest";
import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import usePeriodicUpdate from "./usePeriodicUpdate";

describe("usePeriodicUpdate hook", () => {
  // useful for testing the timeout
  const wait = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  it("should not update the time if the period is invalid", async () => {
    const { result, unmount } = renderHook(() => usePeriodicUpdate(-50));
    expect(result.current.timeSinceStarted).toBe(0);

    await act(() => wait(70));
    // value should not change
    expect(result.current.timeSinceStarted).toBe(0);

    unmount();

    await act(() => wait(70));
    // value should not change
    expect(result.current.timeSinceStarted).toBe(0);
  });

  it("should update the time every period", async () => {
    const { result } = renderHook(() => usePeriodicUpdate(50));

    // ensuring the hook returns new values every multiple of period

    await act(() => wait(70));
    expect(result.current.timeSinceStarted).toBe(50);

    await act(() => wait(50));
    expect(result.current.timeSinceStarted).toBe(100);

    // skipping 3 to make sure it's not just adding the period

    await act(() => wait(100));
    expect(result.current.timeSinceStarted).toBe(200);
  });

  it("should stop the timer if component unmounts", async () => {
    const { result, unmount } = renderHook(() => usePeriodicUpdate(50));

    await act(() => wait(70));
    expect(result.current.timeSinceStarted).toBe(50);

    await act(() => wait(50));
    expect(result.current.timeSinceStarted).toBe(100);

    unmount();

    // value shouldn't change, as hook was unmounted
    await act(() => wait(50));
    expect(result.current.timeSinceStarted).toBe(100);
  });
});
