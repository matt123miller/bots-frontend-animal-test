export type AnimalType = {
  name: string;
  breed: string;
  data: {
    hunger: number;
    hungerRate: number;
    happiness: number;
    happinessRate: number;
    sleepiness: number;
    sleepinessRate: number;
  };
};

export const AllDogBreeds = ["Daschund", "Labrador", "Poodle"] as const;
export type DogBreed = (typeof AllDogBreeds)[number];

type AnimalData = AnimalType["data"] & { __kind: DogBreed };

export const PoodleData: AnimalData = {
  __kind: "Poodle",
  hunger: 50,
  hungerRate: 3,
  happiness: 50,
  happinessRate: 5,
  sleepiness: 50,
  sleepinessRate: 2,
} as const;

export const LabradorData: AnimalData = {
  __kind: "Labrador",
  hunger: 50,
  hungerRate: 5,
  happiness: 50,
  happinessRate: 2,
  sleepiness: 50,
  sleepinessRate: 3,
} as const;

export const DaschundData: AnimalData = {
  __kind: "Daschund",
  hunger: 50,
  hungerRate: 2,
  happiness: 50,
  happinessRate: 3,
  sleepiness: 50,
  sleepinessRate: 5,
} as const;
