CREATE DATABASE todoapi;

CREATE TABLE todolists(
  list_id SERIAL PRIMARY KEY,
  name VARCHAR(255)
);

CREATE TABLE todoitems(
  todo_id SERIAL PRIMARY KEY,
  list_id INT,
  name VARCHAR(255),
  done BIT(1)
);