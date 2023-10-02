CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text NOT NULL,
    title text NOT NULL,
    url text NOT NULL,
    likes INT DEFAULT 0
);

insert into blogs (author, title, url) values ('Pratiksha','Relational databases rule the world', 'www.kathmandupost.com');
insert into blogs (author, title, url) values ('usha','MongoDB is webscale','onlinekhbr.com');

select * from blogs