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
INSERT INTO assignment_questions (assignment_id, title, choices)
SELECT
  (SELECT id FROM assignments WHERE title = 'Basic Skeletal System Quiz'),
  'Which bone is the longest in the human body?',
  'Femur;;Tibia;;Humerus;;Fibula'
UNION ALL
SELECT
  (SELECT id FROM assignments WHERE title = 'Basic Skeletal System Quiz'),
  'How many bones are in the adult human body?',
  '206;;186;;226;;196'
UNION ALL
SELECT
  (SELECT id FROM assignments WHERE title = 'Basic Skeletal System Quiz'),
  'Which part of the skull protects the brain?',
  'Cranium;;Mandible;;Maxilla;;Hyoid'
UNION ALL
SELECT
  (SELECT id FROM assignments WHERE title = 'Basic Skeletal System Quiz'),
  'What is the common name for the clavicle?',
  'Collarbone;;Wishbone;;Shoulderblade;;Neckbone'
UNION ALL
SELECT
  (SELECT id FROM assignments WHERE title = 'Basic Skeletal System Quiz'),
  'Explain the difference between compact and spongy bone tissue:',
  NULL;