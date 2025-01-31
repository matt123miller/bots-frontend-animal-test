// It seems like something that would be a factory
// though I've not implemented a full-featured factory pattern here

import {
  DaschundData,
  DogBreed,
  LabradorData,
  PoodleData,
} from "./SharedTypes";

export default class AnimalFactory {
  public static Create(breed: DogBreed) {
    switch (breed) {
      case "Daschund":
        return { ...DaschundData };
      case "Labrador":
        return { ...LabradorData };
      case "Poodle":
        return { ...PoodleData };
      default:
        throw new Error("This breed doesn't exist");
    }
  }
}
