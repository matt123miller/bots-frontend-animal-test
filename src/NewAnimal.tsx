export function NewAnimal() {
  return (
    <div className="centred-flex-layout">
      <h2>New Animal</h2>
      <form className="new-animal-form centred-flex-layout">
        <div className="new-animal-form-row">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" placeholder="Name" required />
        </div>
        <div className="new-animal-form-row">
          <label htmlFor="type">Type</label>
          <input type="text" name="type" placeholder="Type" required />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}
