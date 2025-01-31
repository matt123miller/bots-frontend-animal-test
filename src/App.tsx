import { useState } from "react";
import { Animal } from "./Animal";
import "./App.css";
import { NewAnimal } from "./NewAnimal";
import { AnimalType } from "./SharedTypes";

function App() {
  const [newClick, setNewClicked] = useState(false);
  const [animals, setAnimals] = useState<AnimalType[]>([]);

  return (
    <div className="centred-flex-layout animal-page">
      {newClick && (
        <NewAnimal
          onCreation={(newAnimal) => {
            setNewClicked(false);
            setAnimals([...animals, newAnimal]);
            console.log(newAnimal);
          }}
        />
      )}
      {!newClick && (
        <>
          <button onClick={() => setNewClicked(true)}>Add Animal</button>
          <div className="animal-wrapper">
            {/* TODO: Add an id to uniquely identify each animal for using as key */}
            {animals.map((animal) => (
              <Animal
                key={animal.name}
                name={animal.name}
                breed={animal.breed}
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
