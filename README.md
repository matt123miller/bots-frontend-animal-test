# Animals Sample App 🐩

> _What could be more fun than having a pet? Making your own!_

[View live on gh-pages](https://matt123miller.github.io/bots-frontend-animal-test)

## Initial Thoughts

- Each animal can be a little object with a bundle of values and distinct hunger, happiness and sleep rates.
- Changing their values over time is a good fit for `useReducer`.
- Need to hook up a simple timer, maybe have the time rate editable in the UI for testing?
- Each animal can be a component. Maybe I can change the colour of the poodle svg to differentiate.
- The logic can go in a custom hook.
- Need a way of creating animals by opening a form to name them and select a type.
- Need to remind myself how to test react hooks over time.

## Ongoing notes

- [x] Get this onto github actions and pages to have CI/CD
- [x] Create an animal component
- [x] Create a form to create animals with a name and a type
- [x] Create a timer

Now I'm this far and hooked up the timer I realise with my current code it will reset the timer each time you create a new animal, so fix that I guess.

- [x] rethink data or ui layout to allow existing animals to carry on updating while creating a new one
- [x] Create hook for animal stat change mechanics
- [x] Use the new hook in the UI

I've realised I misread the requirements. Each animal should start with "neutral" stats, presumably 50, and they should change at different rates depending on the breed.

## Next steps

- [] I could add game settings like speed or difficulty, wrap the whole app in a settings provider and use those values where appropriate
- [] Add periodic local storage game saving

---

# Initial README

## What is this?

Your job is to create your own digital pet platform using this codebase as a starting point - how you continue is up to you!

## Overview

1. Clone the project
2. Run `bun install`
3. Write some magic to make your pets come alive!
4. Push up to a brand new repo and send us a link

## The Brief

- Users should be able to name animals
- Users should be able to have multiple animals of different types
- Playing with animals makes them happy
- Feeding animals makes them less hungry
- Resting animals makes them less sleepy
- Animals start "neutral" on all metrics
- Happiness should decrease over time
- Hunger should increase over time
- Sleepiness should increase over time
- Happiness should decrease faster when sleep or hunger is full
- Each animal type should have metrics which increase/decrease at different rates

## The Technical Bit

- The main functionality and business logic should be tested
- Use of 3rd party libraries is permitted but should be kept to a minimum - we wan't to see what you are capable of!

---

Any questions, drop us a message!

Good Luck 🚀
