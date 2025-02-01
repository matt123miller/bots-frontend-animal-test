import { useRef, useState } from "react";
import AnimalFactory from "./AnimalsFactory";
import { AllDogBreeds, AnimalType, DogBreed } from "./SharedTypes";

type NewAnimalProps = {
  onCreation: (newAnimal: AnimalType) => void;
};

export function NewAnimal({ onCreation }: NewAnimalProps) {
  const [newClick, setNewClicked] = useState(false);

  // Avoid using controlled inputs for this, no need to rerender the component on every key press.
  const formRef = useRef<HTMLFormElement>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(formRef.current!);
    const name = formData.get("name") as string;
    const breed = formData.get("breed") as DogBreed;
    const data = AnimalFactory.Create(breed);
    onCreation({
      name,
      breed,
      data,
    });
    formRef.current?.reset();
    setNewClicked(false);
  }

  // Split the form and the creation button into a separate component, in this file will do
  return (
    <div className="animal-container">
      <h2>New Animal</h2>

      {!newClick && (
        <button className="action-button" onClick={() => setNewClicked(true)}>
          Create
        </button>
      )}
      {newClick && (
        <form
          role="form"
          className="new-animal-form centred-flex-layout"
          ref={formRef}
          onSubmit={handleSubmit}
        >
          <div className="new-animal-form-row">
            <label htmlFor="name-input">Name</label>
            <input
              type="text"
              name="name"
              id="name-input"
              placeholder="Name"
              required
            />
          </div>
          <div className="new-animal-form-row">
            <label htmlFor="breed-input">Breed</label>
            <select title="Breed" name="breed" id="breed-input" required>
              {/* Allows us to have a placeholder option that won't allow form submission */}
              <option value="">Select a breed</option>
              {AllDogBreeds.map((breed) => {
                return <option value={breed}>{breed}</option>;
              })}
            </select>
          </div>
          <button className="action-button" type="submit">
            Create
          </button>
        </form>
      )}
    </div>
  );
}
