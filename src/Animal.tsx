import { AnimalType } from "./SharedTypes";

export type AnimalProps = AnimalType & {};

export const Animal = ({ name, type, data }: AnimalProps) => {
  return (
    <>
      <div className="animal-container">
        <h1>{type}</h1>
        <div className="animal-animal">
          <img src="./poodle.svg" alt="Your animal" className="animal-image" />
          <h2>{name}</h2>
        </div>
        <div className="animal-stats">
          <div className="stat">
            <strong>Hunger:</strong>
            <div className="meter">
              <div
                className="meter-fill"
                style={{ width: `${data.hunger}%` }}
              ></div>
            </div>
            <button className="action-button">Feed</button>
          </div>
          <div className="stat">
            <strong>Happiness:</strong>
            <div className="meter">
              <div
                className="meter-fill"
                style={{ width: `${data.happiness}%` }}
              ></div>
            </div>
            <button className="action-button">Play</button>
          </div>
          <div className="stat">
            <strong>Sleep:</strong>
            <div className="meter">
              <div
                className="meter-fill"
                style={{ width: `${data.sleepiness}%` }}
              ></div>
            </div>
            <button className="action-button">Rest</button>
          </div>
        </div>
      </div>
    </>
  );
};
