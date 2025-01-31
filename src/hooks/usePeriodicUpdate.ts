import { useEffect, useState } from "react";

// There's a few implementations of this floating around the internet, but most look something like this.

/**
 * @param period The delay after which to call the callback, in milliseconds.
 * @returns {timeSinceStarted} The time since the component started, in milliseconds.
 */
export default function usePeriodicUpdate(period: number) {
  const [timeSinceStarted, setTimeSinceStarted] = useState<number>(0);

  // Create the interval in an effect as this is inherently a side effect, created whenever delay changes.
  useEffect(() => {
    if (period === undefined || period === null || period < 0) {
      return () => {};
    }

    // Create the interval, updating every `period` milliseconds.
    const interval = setInterval(() => {
      setTimeSinceStarted((prev) => prev + period);
    }, period);
    // The current interval is cleared when the component unmounts.
    return () => clearInterval(interval);
  }, [period]);

  return { timeSinceStarted };
}
