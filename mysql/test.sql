use mydb;
create table users(
	fullname varchar(100),
    email varchar(100),
    pass varchar(100),
    confirmpass varchar(100),
    primary key (email)
);
create table test(
	email varchar(100),
    c1 int,
    c2 int,
    c3 int,
    c4 int,
    c5 int,
    foreign key (email) references users(email)
);