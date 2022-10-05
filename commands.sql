CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text ,
    url text NOT NULL,
    title text NOT NULL,
    likes int DEFAULT 0
);

insert into blogs (author, url, title, likes) values ('Keijo', 'www.fi','titteli', 12);
insert into blogs ( url, title ) values ('www..fi','Toinen titteli');
