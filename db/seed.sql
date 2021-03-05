CREATE TABLE helo_users (
     id SERIAL PRIMARY KEY,
     username VARCHAR(40) NOT NULL,
     password VARCHAR(300) NOT NULL,
     profile_pic TEXT
);

CREATE TABLE helo_posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(45) NOT NULL,
    content TEXT,
    img TEXT,
    author_id INT REFERENCES helo_users,
    date_created TIMESTAMP
);

INSERT INTO helo_users
(username, password, profile_pic)
VALUES
($1, $2, $3)
returning *;

SELECT * from helo_users
WHERE username = $1;