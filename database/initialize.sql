CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL
);

INSERT INTO users (name, email) VALUES
('Alice Johnson', 'alice.johnson@example.com'),
('Bob Smith', 'bob.smith@example.com'),
('Carol Martinez', 'carol.martinez@example.com'),
('David Lee', 'david.lee@example.com'),
('Evelyn Brown', 'evelyn.brown@example.com'),
('Frank Wilson', 'frank.wilson@example.com'),
('Grace Kim', 'grace.kim@example.com'),
('Henry Clark', 'henry.clark@example.com'),
('Isabella Lopez', 'isabella.lopez@example.com'),
('Jack White', 'jack.white@example.com');