CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) unique,
    first_name VARCHAR(200),
    last_name VARCHAR(200),
    password VARCHAR
);