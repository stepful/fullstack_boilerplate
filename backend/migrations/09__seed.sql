-- Create some test usrs
INSERT INTO
  users (name, email)
VALUES
  ('John Doe', 'john@example.com'),
  ('Jane Smith', 'jane@example.com'),
  ('Alice Johnson', 'alice@example.com'),
  ('Bob Brown', 'bob@example.com');

-- Create test assignments
INSERT INTO
  assignments (title)
VALUES
  ('Basic Skeletal System Quiz'),
  ('Cardiovascular System Basics'),
  ('Digestive System Overview');

-- Create questions for Skeletal System Quiz
INSERT INTO assignment_questions (assignment_id, title, choices, answer, points)
SELECT
  (SELECT id FROM assignments WHERE title = 'Basic Skeletal System Quiz'),
  'Which bone is the longest in the human body?',
  'Femur;;Tibia;;Humerus;;Fibula',
  'Humerus',
  35
UNION ALL
SELECT
  (SELECT id FROM assignments WHERE title = 'Basic Skeletal System Quiz'),
  'How many bones are in the adult human body?',
  '206;;186;;226;;196',
  '206',
  10
UNION ALL
SELECT
  (SELECT id FROM assignments WHERE title = 'Basic Skeletal System Quiz'),
  'Which part of the skull protects the brain?',
  'Cranium;;Mandible;;Maxilla;;Hyoid',
  'Mandible',
  25
UNION ALL
SELECT
  (SELECT id FROM assignments WHERE title = 'Basic Skeletal System Quiz'),
  'What is the common name for the clavicle?',
  'Collarbone;;Wishbone;;Shoulderblade;;Neckbone',
  'Collarbone',
  20
UNION ALL
SELECT
  (SELECT id FROM assignments WHERE title = 'Basic Skeletal System Quiz'),
  'Explain the difference between compact and spongy bone tissue: is that one is spongy and the other is compact',
  'true;;false',
  'true',
  15;

-- Insert scores for 'Basic Skeletal System Quiz'
INSERT INTO scores (assignment_id, user_id, score)
VALUES
  (
    (SELECT id FROM assignments WHERE title = 'Digestive System Overview'),
    (SELECT id FROM users WHERE email = 'john@example.com'),
    70
  ),
  (
    (SELECT id FROM assignments WHERE title = 'Digestive System Overview'),
    (SELECT id FROM users WHERE email = 'jane@example.com'),
    75
  ),
  (
    (SELECT id FROM assignments WHERE title = 'Digestive System Overview'),
    (SELECT id FROM users WHERE email = 'alice@example.com'),
    80
  ),
  (
    (SELECT id FROM assignments WHERE title = 'Digestive System Overview'),
    (SELECT id FROM users WHERE email = 'bob@example.com'),
    100
  );