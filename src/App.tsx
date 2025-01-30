import { useState } from "react";
import { Animal } from "./Animal";
import "./App.css";
import { NewAnimal } from "./NewAnimal";
import { AnimalType } from "./SharedTypes";

function App() {
  const [newClick, setNewClicked] = useState(false);
  const animals: Array<AnimalType> = [
    {
      name: "Drago",
      type: "Dog",
      data: { hunger: 10, happiness: 10, sleepiness: 10 },
    },
  ];

  return (
    <div className="animal-page">
      {newClick && <NewAnimal />}
      {!newClick && (
        <>
          <button onClick={() => setNewClicked(true)}>Add Animal</button>
          <div className="animal-wrapper">
            {/* TODO: Add an id to uniquely identify each animal for using as key */}
            {animals.map((animal) => (
              <Animal
                key={animal.name}
                name={animal.name}
                type={animal.type}
                data={animal.data}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
