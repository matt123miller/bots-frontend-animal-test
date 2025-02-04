I had fun with this test, mostly. It's hosted on github pages if you'd like to have a play.

Here's a brief overview of my approach:

- State is maintained by each animal component rather than hoistin it up to the app level, which allows them to update independently.
- The new animal button exists alongside the existing animals, allowing you to create animals while the game continues. This avoided issues with state and having to pause the game, save the data somewhere, and reload it once creation was finished.
- The NewAnimal.tsx component uses a form, handles the creation on submit and uses the form data. This allowed for better accessibility, using HTMLs capabilities instead of handrolling my own solutions and avoids the unnecessary rerenders of using managed input components.
- The main logic takes place inside the custom hook useAnimalStats which uses useReducer for managing the state changes, another custom hook usePeriodicUpdate to rerun on a provided schedule and ticking the data via a useEffect that runs whenever the usePeriodicUpdate would run. Returning some functions from useAnimalStats provices a nice API for updating the state in other components without them needing to know how it works.

I had a few issues along the way, mostly due to the JS ecosystem.

- I initially tried to stick with bun which was great, it's so fast! However when I had to configure and use some testing libraries to test my components and hooks I ran into ecosystem issues. I ultimately settled on falling back to node using vitest and react testing library. I used pnpm but you could also use npm, it should work the same.
- I had some stumbles with react testing library but now I can confidently use it to do what I need.
- I misread the requirements, as you could see in some of my final commits, and was giving each dog breed different starting values and updating them at the same rate. It should have been reversed. But guided by the tests and how I set up the data and API it was trivial to flip this around and have each breed start with neutral values and rely on some new happinessRate, hungerRate and sleepinessRate values.

If I was to continue this I'd consider the following:

- Add some options for changing the difficulty which would alter the starting values and change rates for each dog breed. This could all be handled with a context provider that would contain the settings and each component could use them through there.
- Add more dog breeds
- Find images for each breed instead of using the poodle for each.
- Add more UI detail and refinement
- Add the ability to update and delete animals.
