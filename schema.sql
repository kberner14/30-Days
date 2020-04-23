-- Drops the blogger if it exists currently --
DROP DATABASE IF EXISTS thirty_day_db;
-- Creates the "blogger" database --
CREATE DATABASE IF NOT EXISTS thirty_day_db;

DROP TABLE IF EXISTS challenges;

CREATE TABLE challenges(
id INTEGER AUTO_INCREMENT NOT NULL,
name VARCHAR(255) NOT NULL,
task INTEGER NOT NULL,
increment INTEGER NOT NULL
);

task + (increment * (id-1)) linear expression
