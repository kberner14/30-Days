-- Drops the blogger if it exists currently --
DROP DATABASE IF EXISTS thirty_day_db;
-- Creates the "blogger" database --
CREATE DATABASE IF NOT EXISTS thirty_day_db;

DROP TABLE IF EXISTS challenges;

USE thirty_day_db;

CREATE TABLE challenges(
id INTEGER AUTO_INCREMENT NOT NULL,
name VARCHAR(255) NOT NULL,
task INTEGER NOT NULL,
increment INTEGER NOT NULL,
PRIMARY KEY (id)
);

INSERT INTO challenges (name, task, increment) VALUES ('Pushups', 40, 2);
INSERT INTO challenges (name, task, increment) VALUES ('Situps', 50, 5);
INSERT INTO challenges (name, task, increment) VALUES ('Lunges', 30, 2);