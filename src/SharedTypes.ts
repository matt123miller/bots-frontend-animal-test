export type AnimalType = {
  name: string;
  breed: string;
  data: {
    hunger: number;
    happiness: number;
    sleepiness: number;
  };
};

export const AllDogBreeds = ["Daschund", "Labrador", "Poodle"] as const;
export type DogBreed = (typeof AllDogBreeds)[number];

type AnimalData = AnimalType["data"] & { __kind: DogBreed };

export const PoodleData: AnimalData = {
  __kind: "Poodle",
  hunger: 50,
  happiness: 30,
  sleepiness: 75,
} as const;

export const LabradorData: AnimalData = {
  __kind: "Labrador",
  hunger: 80,
  happiness: 100,
  sleepiness: 65,
} as const;

export const DaschundData: AnimalData = {
  __kind: "Daschund",
  hunger: 50,
  happiness: 30,
  sleepiness: 75,
} as const;
