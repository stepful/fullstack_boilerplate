# Solution

By Chandler Charity / chandlercharity@proton.me

## Notes on implementation

_Please leave any details you think are worth sharing regarding your implementation._

### User Stories

1. Quiz Selection (Student)

- View a list of available quizzes to choose from
- Quizzes and their questions should be seeded in your database
  (See _backend/migrations/02\_\_seed.sql_ for an example)

  **Implementation Notes**

* refactored boilerplate seed typo in assignment questions: title vs. question content to seed
* refactored SQL queries in server routes to query correct tables
* refactored SQL queries in server routes to use correct column names and pull questions as well as quiz titles
* refactored SQL queries to use UNION ALL SQLits syntax to seed database

2. Quiz Attempt (Student)

- Take a quiz by answering multiple-choice questions
- Only one question is shown at a time

* Implemented state management to render the current question with corresponding multiple choice options
  - ensures one question render at a time
  - stops advancing when no more questions are available
  - questions are render based on the selected quiz ID
* Scaffolding for submission implmentation in future iteration
* started on error boundary before re-dedicating attention to the Quiz Attempt feature as it was not a core ask of the assignment
* Placeholder for state management of progress to implement progress bar --> Ideally progress qould be represented as a percentage rather than an integer

- Each question can be worth a different number of points
- Even if they leave their browser and come back, the student should resume from where they left off

## (If you didn't go with the boilerplate) Notes on design/architecture and rationale

_Please leave notes for what languages / frameworks you chose, and why._
_Please leave instructions for how to run your solution locally._

## Feedback for Stepful

_Please feel free to share feedback with us! What you liked or didn't like, how this take home compares to others you've taken in the past_
I loved the user stories and really appreciate the kick-off call to ask any questions. I wasn't sure if the refactoring of the boilerplate was part of the assessment or not, so some clarity around whether there were intentional errors in the boilerplate would have been helpful. All in all, a wonderful experience and I really enjoyed it!

## Anything else you'd like us to know?

Not required, but we love learning about what you're passionate about, so if you link us a personal blog or website, or anything else that you've written, we'd love to check them out!
