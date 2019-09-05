DROP TABLE IF EXISTS snippet;
CREATE TABLE snippet (
  id SERIAL PRIMARY KEY,
  code TEXT,
  title TEXT,
  description TEXT,
  favorites INT DEFAULT 0,
  author TEXT,
  language TEXT
);

-- Seed data
INSERT INTO
  snippet (code,title, description, language, author)
VALUE
  (
    'const america = 1776',
    'freedom',
    'I do declare a const',
    'JS',
    'Devon'
  ),
  (
    '4 * 4',
    'Multiplicaiton',
    'Multiplication is square',
    'Algebra',
    'Devon'
  );