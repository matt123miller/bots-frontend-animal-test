# Animals Sample App 🐩

> _What could be more fun than having a pet? Making your own!_

## Initial Thoughts

- Each animal can be a little object with a bundle of values and distinct hunger, happiness and sleep rates.
- Changing their values over time is a good fit for `useReducer`.
- Need to hook up a simple timer, maybe have the time rate editable in the UI for testing?
- Each animal can be a component. Maybe I can change the colour of the poodle svg to differentiate.
- The logic can go in a custom hook.
- Need a way of creating animals by opening a form to name them and select a type.
- Need to remind myself how to test react hooks over time.

## TODO

- [x] Get this onto github actions and pages to have CI/CD
- [] Create an animal component
- [] Create a form to create animals with a name and a type
- [] Create a timer

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
