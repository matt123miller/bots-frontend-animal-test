import "@testing-library/jest-dom/vitest";
import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import useInterval from "./useInterval";

// Either I've configured these wrong or vitest is smarter than I think because all the tests pass for me.
// So either it is mocking the setTimeout to skip forward in time or I'm not testing the timeout properly.
// I've tried using both expect.poll and my own wait function and they both pass.

describe("useInterval hook", () => {
  // useful for testing the timeout
  const wait = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  it("should not call the callback if the delay is invalid", () => {
    const callback = vi.fn();

    renderHook(() => useInterval(callback, 0));
    expect(callback).not.toHaveBeenCalled();

    // @ts-expect-error - testing the invalid case
    renderHook(() => useInterval(callback, undefined));
    expect(callback).not.toHaveBeenCalled();

    // @ts-expect-error - testing the invalid case
    renderHook(() => useInterval(callback, null));
    expect(callback).not.toHaveBeenCalled();
  });

  it("should call the callback after the delay", async () => {
    const callback = vi.fn();

    renderHook(() => useInterval(callback, 50));

    await wait(70);
    expect(callback).toHaveBeenCalledTimes(1);

    await wait(50);
    expect(callback).toHaveBeenCalledTimes(2);

    await wait(100);
    expect(callback).toHaveBeenCalledTimes(4);
  });

  it("should stop calling the callback if component unmounts", async () => {
    const callback = vi.fn();

    const { unmount } = renderHook(() => useInterval(callback, 50));

    await expect.poll(
      () => {
        expect(callback).toHaveBeenCalledTimes(1);
      },
      {
        timeout: 75,
      }
    );

    unmount();

    await expect.poll(
      () => {
        // should still only have been called once
        expect(callback).toHaveBeenCalledTimes(1);
      },
      {
        timeout: 100,
      }
    );
  });
});
