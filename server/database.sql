CREATE DATABASE todoapi;

CREATE TABLE todolist(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255)
);

CREATE TABLE todoitems(
  id SERIAL PRIMARY KEY,
  list_id INT,
  name VARCHAR(255),
  completed boolean
);