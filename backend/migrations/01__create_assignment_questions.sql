DROP TABLE assignment_questions;
CREATE TABLE
  assignment_questions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    assignment_id INTEGER NOT NULL REFERENCES assignments (id),
    title TEXT NOT NULL,
    choices TEXT, -- sqlite doesn't support arrays, so we'll store choices as a string of ';;'-separated values
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  );