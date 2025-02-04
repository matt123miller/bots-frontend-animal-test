import useAnimalStats from "./hooks/useAnimalStats";
import { AnimalType } from "./SharedTypes";

export type AnimalProps = AnimalType & {};

export const Animal = ({ name, breed, data }: AnimalProps) => {
  const { values, updateHunger, updateHappiness, updateSleepiness } =
    useAnimalStats(data);

  return (
    <div className="animal-container">
      <h1>{breed}</h1>
      <div className="animal-animal">
        <img
          src="./poodle.svg"
          alt={`${name}, a fine ${breed}`}
          className="animal-image"
        />
        <h2>{name}</h2>
      </div>
      <div className="animal-stats">
        <div className="stat">
          <strong>Hunger:</strong>
          <div className="meter">
            <div
              className="meter-fill"
              style={{ width: `${values.hunger}%` }}
            ></div>
          </div>
          <button className="action-button" onClick={() => updateHunger(10)}>
            Feed
          </button>
        </div>
        <div className="stat">
          <strong>Happiness:</strong>
          <div className="meter">
            <div
              className="meter-fill"
              style={{ width: `${values.happiness}%` }}
            ></div>
          </div>
          <button className="action-button" onClick={() => updateHappiness(10)}>
            Play
          </button>
        </div>
        <div className="stat">
          <strong>Sleep:</strong>
          <div className="meter">
            <div
              className="meter-fill"
              style={{ width: `${values.sleepiness}%` }}
            ></div>
          </div>
          <button
            className="action-button"
            onClick={() => updateSleepiness(10)}
          >
            Rest
          </button>
        </div>
      </div>
    </div>
  );
};
