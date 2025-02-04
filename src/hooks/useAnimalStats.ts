import { useCallback, useEffect, useReducer } from "react";
import { AnimalType } from "../SharedTypes";
import usePeriodicUpdate from "./usePeriodicUpdate";

type AnimalStats = AnimalType["data"];

type Actions =
  | {
      type: "updateHunger";
      amount: number;
    }
  | {
      type: "updateHappiness";
      amount: number;
    }
  | {
      type: "updateSleepiness";
      amount: number;
    }
  | {
      type: "tick";
      timeSinceStarted: number;
    };

const rateModifier = 1;
const increasedRateModifier = 10;

function reducer(state: AnimalStats, action: Actions) {
  switch (action.type) {
    case "tick":
      const happinessModifier =
        state.sleepiness === 100 || state.hunger === 100
          ? increasedRateModifier
          : rateModifier;
      const tickedHappiness = Math.max(0, state.happiness - happinessModifier);

      return {
        happiness: tickedHappiness,
        hunger: Math.min(100, state.hunger + rateModifier),
        sleepiness: Math.min(100, state.sleepiness + rateModifier),
      };
    case "updateHunger":
      const hunger = Math.min(100, state.hunger - action.amount);
      return {
        ...state,
        hunger,
      };
    case "updateHappiness":
      const happiness = Math.min(100, state.happiness + action.amount);
      return {
        ...state,
        happiness,
      };
    case "updateSleepiness":
      const sleepiness = Math.min(100, state.sleepiness - action.amount);
      return {
        ...state,
        sleepiness,
      };
    default:
      return state;
  }
}

/**
 *
 * @param initialValues
 * @param updateInterval Default is 1000ms
 */
export default function useAnimalStats(
  initialValues: AnimalStats,
  updateInterval: number = 1000
) {
  // decided to make the usePeriodicUpdate a dependency, felt better for tests.
  const { timeSinceStarted } = usePeriodicUpdate(updateInterval);

  // add a usereducer for the values, uses the `timeSinceStarted` and `updateInterval` to compute values
  const [values, dispatch] = useReducer(reducer, initialValues);

  useEffect(() => {
    dispatch({ type: "tick", timeSinceStarted });
  }, [timeSinceStarted]);

  const updateHunger = useCallback((amount: number) => {
    dispatch({ type: "updateHunger", amount });
  }, []);

  const updateHappiness = useCallback((amount: number) => {
    dispatch({ type: "updateHappiness", amount });
  }, []);

  const updateSleepiness = useCallback((amount: number) => {
    dispatch({ type: "updateSleepiness", amount });
  }, []);

  return {
    timeSinceStarted, // remove later, useful for dev
    values,
    updateHunger,
    updateHappiness,
    updateSleepiness,
  };
}
