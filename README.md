# Doctolib Test

## Instructions
This code provides an algorithm that checks the availabilities of an agenda depending of
the events attached to it. The main method has a start date for input and is looking for
the availabilities of the next 7 days.

They are two kinds of events:
 * `opening`, are the openings for a specific day and they can be recurring week by week.
 * `appointment`, times when the doctor is already booked.


At any moment, feel free to refactor or add unit tests. Please make a commit after each
step and return us a git bare repo.

Unfortunately, the code is broken. Here is your mission:
 * **Step 1**: Fix the tests.
 * **Step 2**: Optimize and refactor if needed.
 * **Step 3**: Allow the function to return availabilities on as many days as requested:
```js
function getAvailabilities(date, numberOfDays = 7) {}
```

## How to run
 * Install [node](https://nodejs.org/en/) and [yarn](https://yarnpkg.com/en/)
 * Run `yarn && yarn test`, focus on `src` folder, you are ready!
