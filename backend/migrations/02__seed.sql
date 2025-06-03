-- Create some test usrs
INSERT INTO
  users (name, email)
VALUES
  ('John Doe', 'john@example.com'),
  ('Jane Smith', 'jane@example.com'),
  ('Alice Johnson', 'alice@example.com'),
  ('Bob Brown', 'bob@example.com');

Create test assignments
INSERT INTO
  assignments (title)
VALUES
  ('Basic Skeletal System Quiz'),
  ('Cardiovascular System Basics'),
  ('Digestive System Overview');

Create questions for Skeletal System Quiz
INSERT INTO
  assignment_questions (assignment_id,  question_content, choices)
SELECT
  (
    SELECT
      id
    FROM
      assignments
    WHERE
      title = 'Basic Skeletal System Quiz'
  ),
  question_content,
  choices
FROM (
  SELECT 'Which bone is the longest in the human body?' AS  question_content, 'Femur;;Tibia;;Humerus;;Fibula' AS choices
  UNION ALL
  SELECT 'How many bones are in the adult human body?', '206;;186;;226;;196'
  UNION ALL
  SELECT 'Which part of the skull protects the brain?', 'Cranium;;Mandible;;Maxilla;;Hyoid'
  UNION ALL
  SELECT 'What is the common name for the clavicle?', 'Collarbone;;Wishbone;;Shoulderblade;;Neckbone'
  UNION ALL
  SELECT 'Explain the difference between compact and spongy bone tissue:', NULL
);
-- -- Create questions for Cardiovascular Quiz
INSERT INTO
  assignment_questions (assignment_id, question_content, choices)
SELECT
  (
    SELECT
      id
    FROM
      assignments
    WHERE
      title = 'Cardiovascular System Basics'
  ),
  question_content,
  choices
FROM
  (
    SELECT
			'What is the main function of the cardiovascular system?' AS question_content,
      'Pump blood;;Transport nutrients;;Regulate body temperature;;Filter waste' AS choices
    UNION ALL
      SELECT 'Which chamber of the heart pumps blood to the body?' AS question_content,
			'Left ventricle;;Right ventricle;;Left atrium;;Right atrium' AS choices
    UNION ALL
      SELECT 'What is the primary function of the pulmonary circulation?' AS question_content,
			'Pump blood to the lungs;;Pump blood to the body;;Pump blood to the liver;;Pump blood to the kidneys' AS choices
    UNION ALL
      SELECT 'Which valve prevents backflow of blood in the heart?' AS question_content,
        'Left ventricle;;Right ventricle;;Left atrium;;Right atrium' AS choices
    UNION ALL
      SELECT 'What is the primary function of the pulmonary circulation?' AS question_content,
        'Pump blood to the lungs;;Pump blood to the body;;Pump blood to the liver;;Pump blood to the kidneys' AS choices	
			UNION ALL
			SELECT 'Describe the path of blood flow through the heart:' AS question_content,
				NULL AS choices
			UNION ALL
			SELECT 'What is the main function of red blood cells?' AS question_content,
				'Carry oxygen;;Fight infection;;Form blood clots;;Produce antibodies' AS choices
			UNION ALL
			SELECT 'Which blood vessel carries oxygenated blood?' AS question_content,
				'Arteries;;Veins;;Capillaries;;Venules' AS choices
			UNION ALL
			SELECT 'How many chambers are in the human heart?' AS question_content,
				'4;;2;;3;;6' AS choices
			UNION ALL
			SELECT 'Describe the path of blood flow through the heart:' AS question_content,
				NULL AS choices
	);


-- Create questions for Digestive System Quiz
INSERT INTO
  assignment_questions (assignment_id, question_content, choices)
SELECT
  (
    SELECT
      id
    FROM
      assignments
    WHERE
      title = 'Digestive System Overview'
  ),
  question_content,
  choices
FROM
  (
    SELECT 'Where does chemical digestion begin?' AS question_content,
        'Mouth;;Stomach;;Small intestine;;Esophagus' AS choices
    UNION ALL
      SELECT'Which organ produces bile?' AS question_content,
        'Liver;;Pancreas;;Gallbladder;;Stomach' AS choices
		UNION ALL
 			SELECT'What is the longest part of the digestive system?' AS question_content,
        'Small intestine;;Large intestine;;Esophagus;;Stomach' AS choices
		UNION ALL
			SELECT 'Which enzyme breaks down proteins in the stomach?' AS question_content,
			'Pepsin;;Amylase;;Lipase;;Trypsin'  AS choices
		UNION ALL
      SELECT 'Explain the role of villi in the small intestine:' AS question_content,
			NULL AS choices  
  );