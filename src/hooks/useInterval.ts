import { useEffect, useRef } from "react";

// There's a few implementations of this floating around the internet, but most look something like this.

/**
 *
 * @param callback The function periodically called.
 * @param delay The delay after which to call the callback, in milliseconds.
 */
export default function useInterval(cb: VoidFunction, delay: number) {
  const callbackRef = useRef<() => void>();

  // update callback function whenever that changes.
  // In this programming test that won't happen but still, good practice.
  useEffect(() => {
    callbackRef.current = cb;
  }, [cb]);

  // Create the interval in an effect, created whenever delay changes.
  useEffect(() => {
    if (delay === undefined || delay === null || delay === 0) {
      return () => {};
    }

    // Call the function saved in the ref inside of the interval.
    const interval = setInterval(() => {
      callbackRef.current && callbackRef.current();
    }, delay);
    // The current interval is cleared when the component unmounts.
    return () => clearInterval(interval);
  }, [delay]);
}
